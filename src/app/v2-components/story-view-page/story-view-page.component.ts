import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from '../../services/workspace.service';
import { SimilarMovie } from 'src/storyStructures';
import { ActionOption } from '../../services/action.service';
import { ROUTES } from '../v2-router/routes';

@Component({
  selector: 'story-view-page',
  templateUrl: './story-view-page.component.html',
  styleUrls: ['./story-view-page.component.scss']
})
export class StoryViewPageComponent implements OnInit {

  similarMovies: SimilarMovie[];

  public similarMovieEditAction: ActionOption;

  constructor(private workspaceService: WorkspaceService) {
    this.similarMovies = this.workspaceService.getCurrentStory().similarMovieIds.map(similarMovieId => {
      return this.workspaceService.currentWorkspace.similarMovies.get(similarMovieId);
    });
    this.similarMovieEditAction = new ActionOption(ROUTES.ASSIGN_SIMILAR_MOVIES);
  }

  getStoryId() {
    return this.workspaceService.getCurrentStoryId();
  }

  ngOnInit() {
  }

}
