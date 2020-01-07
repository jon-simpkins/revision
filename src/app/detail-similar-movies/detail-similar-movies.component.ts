import { Component, OnInit } from '@angular/core';

import { SimilarMovie } from '../../storyStructures';
import { WorkspaceService } from '../services/workspace.service';

@Component({
  selector: 'detail-similar-movies',
  templateUrl: './detail-similar-movies.component.html',
  styleUrls: ['./detail-similar-movies.component.scss']
})
export class DetailSimilarMoviesComponent implements OnInit {

  public similarMovies: SimilarMovie[];
  public currentDetailId: string;
  public currentDetailMovie: SimilarMovie;

  constructor(private workspaceService: WorkspaceService) {
    this.getSimilarMovieList();
  }

  ngOnInit() {
  }

  getSimilarMovieList() {
    this.similarMovies = [];
    this.workspaceService.currentWorkspace.similarMovies.forEach((movie: SimilarMovie) => {
      this.similarMovies.push(movie);
    });
  }

  addNew() {
    let newId = this.workspaceService.currentWorkspace.buildNewSimilarMovie();
    this.getSimilarMovieList();
    this.seeDetails(newId);
  }

  seeDetails(id: string) {
    this.currentDetailId = id;
    if (!!id) {
      this.currentDetailMovie = this.workspaceService.currentWorkspace.similarMovies.get(id) as SimilarMovie;
    } else {
      this.currentDetailMovie = null;
    }
  }

  titleInput(e) {
    const newTitle = e.target.value;
    this.currentDetailMovie.title = newTitle;
  }

  deleteDetail() {
    this.workspaceService.currentWorkspace.similarMovies.delete(this.currentDetailId);
    this.seeDetails(null);
    this.getSimilarMovieList();
  }

  getTmbdSearchUrl() {
    let searchTitle = '';
    if (this.currentDetailMovie && this.currentDetailMovie.title) {
      searchTitle = this.currentDetailMovie.title;
    }

    return `https://www.themoviedb.org/search?query=${encodeURIComponent(searchTitle)}`
  }

  tmbdUrlInput(e) {
    const newUrl = e.target.value;
    this.currentDetailMovie.tmbdUrl = newUrl;
  }

  runtimeMinInput(e) {
    let newRuntime = e.target.value;
    
    if (!Number.isNaN(Number.parseInt(newRuntime, 10))) {
      if (newRuntime < 1) {
        newRuntime = 1;
      }
      if (newRuntime > 240) {
        newRuntime = 240;
      }
      if (Math.floor(newRuntime) != newRuntime) {
        newRuntime = Math.floor(newRuntime);
      }
    } else {
      newRuntime = null;
    }

    e.target.value = newRuntime;
    
    this.currentDetailMovie.runtimeMin = newRuntime;
  }
}
