import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from '../../services/workspace.service';
import { SimilarMovie } from 'src/storyStructures';
import { ActionOption } from 'src/actions/action-option';
import { SYNTHESIS_ACTIONS } from 'src/actions/actions';

@Component({
  selector: 'story-view-page',
  templateUrl: './story-view-page.component.html',
  styleUrls: ['./story-view-page.component.scss']
})
export class StoryViewPageComponent implements OnInit {

  public similarMovieEditAction: ActionOption;
  public loglineEditAction: ActionOption;

  constructor(private workspaceService: WorkspaceService) {
    this.similarMovieEditAction = new ActionOption(SYNTHESIS_ACTIONS.ASSIGN_SIMILAR_MOVIES);

    this.loglineEditAction = new ActionOption(SYNTHESIS_ACTIONS.LOGLINE_EDIT_PAGE);
  }

  getStoryId(): string {
    return this.workspaceService.getCurrentStoryId();
  }

  getLogline(): string {
    return this.workspaceService.getCurrentStory().logLine;
  }

  getSimilarMovies(): SimilarMovie[] {
    return this.workspaceService.getCurrentStory().similarMovieIds.map(similarMovieId => {
      return this.workspaceService.currentWorkspace.similarMovies.get(similarMovieId);
    });
  }

  ngOnInit() {
  }

}
