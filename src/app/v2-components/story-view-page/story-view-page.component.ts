import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from '../../services/workspace.service';
import { SimilarMovie } from 'src/storyStructures';
import { ActionOption } from 'src/actions/action-option';
import { SYNTHESIS_ACTIONS, ANALYSIS_ACTIONS } from 'src/actions/actions';

@Component({
  selector: 'story-view-page',
  templateUrl: './story-view-page.component.html',
  styleUrls: ['./story-view-page.component.scss']
})
export class StoryViewPageComponent implements OnInit {

  public getSimilarMovieEditAction: () => ActionOption;
  public getLoglineEditAction: () => ActionOption;
  public getRuntimeEditAction: () => ActionOption;
  public getPlotSequenceViewEditAction: () => ActionOption;

  constructor(private workspaceService: WorkspaceService) {
    this.getSimilarMovieEditAction = () => new ActionOption(SYNTHESIS_ACTIONS.ASSIGN_SIMILAR_MOVIES);

    this.getLoglineEditAction = () => new ActionOption(SYNTHESIS_ACTIONS.LOGLINE_EDIT_PAGE);
    this.getRuntimeEditAction = () => new ActionOption(SYNTHESIS_ACTIONS.RUNTIME_EDIT);

    this.getPlotSequenceViewEditAction = () => {
      if (!!this.workspaceService.getCurrentStory().plotElementId) {
        return new ActionOption(ANALYSIS_ACTIONS.VIEW_SEQUENCE_PAGE, null, null, this.workspaceService.getCurrentStory().plotElementId);
      }

      return new ActionOption(SYNTHESIS_ACTIONS.ADD_SEQUENCE);
    }
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

  getRuntimeMin(): number {
    return this.workspaceService.getCurrentStory().runtimeMin || 0;
  }

  getPlotSequenceViewEditIcon() {
    if (!!this.workspaceService.getCurrentStory().plotElementId) {
      return 'details';
    }

    return 'edit';
  }

  ngOnInit() {
  }

}
