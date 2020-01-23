import { Injectable } from '@angular/core';

import { ROUTES } from '../v2-components/v2-router/routes'; // todo: make this an enum of routes?
import { WorkspaceService } from './workspace.service';
import { RoutingService } from './routing.service';
import { HistoryEntry, Story, SimilarMovie } from '../../storyStructures';
import { getLoginEmail } from 'src/docsApi/docsApiHelpers';

import { ActionOption } from '../../actions/action-option';
import { SYNTHESIS_ACTIONS, ANALYSIS_ACTIONS } from '../../actions/actions';
import { debug } from 'util';

/**
 * A service to determine the list of actions available,
 * help facilitate the beginning of an action,
 * and track the current state of an action
 */
@Injectable({
  providedIn: 'root'
})
export class ActionService {

  private currentViewOption?: ActionOption = null;
  private currentEditOption?: ActionOption = null;

  // The epoch ms when the session started, zero indicates no current session
  private currentSessionStarted: number = 0;

  constructor(private workspaceService: WorkspaceService, private routingService: RoutingService) { }

  getCurrentSessionStarted(): number {
    return this.currentSessionStarted;
  }

  getCurrentViewOption(): ActionOption {
    return this.currentViewOption;
  }

  getCurrentEditOption(): ActionOption {
    return this.currentEditOption;
  }

  getAllActionOptions(): Promise<ActionOption[]> {
    if (!this.workspaceService.currentWorkspace) {
      // Still loading...
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(this.getAllActionOptions());
        }, 250);
      });
    }

    let similarMoviesHaveAllDetails = true;
    this.workspaceService.currentWorkspace.similarMovies.forEach((similarMovie: SimilarMovie) => {
      if (similarMovie.getNeedsCompletion()) {
        similarMoviesHaveAllDetails = false;
      }
    })

    const options = [ // Initialize to ones that are always options
      new ActionOption(ANALYSIS_ACTIONS.DETAIL_SIMILAR_MOVIES, !similarMoviesHaveAllDetails),
      new ActionOption(SYNTHESIS_ACTIONS.CREATE_NEW_STORY, true),
      new ActionOption(ANALYSIS_ACTIONS.REVISION_HISTORY, false),
    ];

    this.workspaceService.currentWorkspace.stories.forEach((story: Story, storyId: string) => {
      options.push(
        new ActionOption(ANALYSIS_ACTIONS.STORY_VIEW_PAGE, !story.hasContentToShow(), storyId)
      );

      options.push(
        new ActionOption(SYNTHESIS_ACTIONS.ASSIGN_SIMILAR_MOVIES, !story.similarMovieIds.length, storyId)
      );

      options.push(
        new ActionOption(SYNTHESIS_ACTIONS.LOGLINE_EDIT_PAGE, !story.logLine, storyId)
      )
    });

    return Promise.resolve(options);
  }

  /**
   * Generate the list of story options for the story-selector dropdown
   */
  getAllStoryOptions() {
    const allStoryOptions = [{
      label: 'Any',
      value: 'any'
    }];

    this.workspaceService.currentWorkspace.stories.forEach((story: Story, storyId: string) => {
      allStoryOptions.push({
        label: storyId,
        value: storyId
      });
    });

    return allStoryOptions;
  }

  startAction(option: ActionOption) {
    if (!this.currentSessionStarted) {
      this.currentSessionStarted = Date.now();
    }

    if (option.storyId) {
      this.workspaceService.setCurrentStoryId(option.storyId);
    }

    if (option.getIsSynthesis()) {
      this.currentEditOption = option;
    } else {
      this.currentViewOption = option;
    }

    this.routingService.navigateToUrl(ROUTES.WRITING, option.storyId);
  }

  completeAction() {
    const newHistoryEntry = new HistoryEntry();
    newHistoryEntry.userEmail = getLoginEmail();
    newHistoryEntry.editStartEpochMs = this.currentSessionStarted;
    newHistoryEntry.editEndEpochMs = Date.now();

    this.workspaceService.saveAdditionalSerialization(newHistoryEntry)
      .then(() => {
        this.resetAction();
      });
  }

  abandonCurrentAction() {
    this.workspaceService.abandonWorkspaceChanges();
    this.resetAction();
  }

  resetAction() {
    this.currentSessionStarted = 0;
    this.currentViewOption = null;
    this.currentEditOption = null;
    this.routingService.navigateToUrl(ROUTES.ACTION_MENU);
  }

}
