import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from '../../services/workspace.service';
import { SimilarMovie, Story } from 'src/storyStructures';
import { ROUTES } from '../../v2-components/v2-router/routes';
import { ActionOption } from '../../services/action.service';

@Component({
  selector: 'assign-similar-movies',
  templateUrl: './assign-similar-movies.component.html',
  styleUrls: ['./assign-similar-movies.component.scss']
})
export class AssignSimilarMoviesComponent implements OnInit {

  lastLoadedStoryId?: string = null;
  public availableSimilarMovies: SimilarMovie[]; // Similar movies which have not already been selected
  public selectedSimilarMovies: SimilarMovie[];
  private currentStory: Story;
  public currentNewMovieTitle = '';

  public storyViewAction: ActionOption;

  public deleteMovieCallback = (storyId: string) => {
    this.delete(storyId);
  }

  constructor(private workspaceService: WorkspaceService) {
    this.currentStory = this.workspaceService.getCurrentStory();
    this.buildOptionList();
    this.storyViewAction = new ActionOption(ROUTES.STORY_VIEW_PAGE);
  }

  ngOnInit() {
  }

  buildOptionList() {
    this.availableSimilarMovies = [];
    this.selectedSimilarMovies = [];
    this.workspaceService.currentWorkspace.similarMovies.forEach((movie: SimilarMovie) => {
      if (this.currentStory.similarMovieIds.includes(movie.id)) {
        this.selectedSimilarMovies.push(movie);
      } else {
        this.availableSimilarMovies.push(movie);
      }
    });
  }

  // Event handler for adding a specific movieId as similar
  select(movieId: string) {
    this.currentStory.similarMovieIds.push(movieId);
    this.buildOptionList();
  }

  // Event handler for removing a specific movieId as similar
  delete(movieId: string) {
    this.currentStory.similarMovieIds = this.currentStory.similarMovieIds.filter(id => {
      return id !== movieId;
    });
    this.buildOptionList();
  }

  // Select a random movie as similar
  selectRandom() {
    const availableIds = [];
    this.workspaceService.currentWorkspace.similarMovies.forEach((movie: SimilarMovie) => {
      if (!this.currentStory.similarMovieIds.includes(movie.id)) {
        availableIds.push(movie.id);
      }
    });

    const randomMovieId = availableIds[Math.floor(Math.random() * availableIds.length)];
    this.select(randomMovieId);
  }

  titleInput(e) {
    this.currentNewMovieTitle = e.target.value;
  }

  addSimilarMovie() {
    const newSimilarMovieId = this.workspaceService.currentWorkspace.buildNewSimilarMovie();
    this.workspaceService.currentWorkspace.similarMovies.get(newSimilarMovieId).title = this.currentNewMovieTitle;

    this.currentNewMovieTitle = '';
    this.currentStory.similarMovieIds.push(newSimilarMovieId);
    this.buildOptionList();
  }


}
