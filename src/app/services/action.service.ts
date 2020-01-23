import { Injectable } from '@angular/core';

import { ROUTES, ROUTE_TYPE, getRouteType } from '../v2-components/v2-router/routes'; // todo: make this an enum of routes?
import { WorkspaceService } from './workspace.service';
import { RoutingService } from './routing.service';
import { HistoryEntry, Story, SimilarMovie } from '../../storyStructures';
import { getLoginEmail } from 'src/docsApi/docsApiHelpers';
import { Action } from 'rxjs/internal/scheduler/Action';

export class ActionOption {
  constructor(public actionRoute: ROUTES, public needsCompletion?: boolean, public storyId?: string) { }

  getLabel(): string {
    switch (this.actionRoute as ROUTES) {
      case ROUTES.DETAIL_SIMILAR_MOVIES:
        return 'Edit a List of Reference Movies';
      case ROUTES.CREATE_NEW_STORY:
        return 'Create New Story';
      case ROUTES.REVISION_HISTORY:
        return 'Review Revision History';
      case ROUTES.ASSIGN_SIMILAR_MOVIES:
        return 'Assign Similar Movies';
      case ROUTES.STORY_VIEW_PAGE:
        return 'View Story';
      case ROUTES.LOGLINE_EDIT_PAGE:
        return 'Edit Logline';
      default:
        return '-';
    }
  }

  getActionType(): ROUTE_TYPE {
    return getRouteType(this.actionRoute);
  }

  getCompletionIcon(): string {
    if (this.needsCompletion) {
      return 'priority_high';
    }
    return 'done';
  }

  getActionTypeIcon(): string {
    if (this.getActionType() === ROUTE_TYPE.ANALYSIS) {
      return 'menu_book';
    }
    return 'edit';
  }
}

/**
 * A service to determine the list of actions available,
 * help facilitate the beginning of an action,
 * and track the current state of an action
 */
@Injectable({
  providedIn: 'root'
})
export class ActionService {

  public currentOption?: ActionOption = null;
  public currentEpochStarted?: number;

  constructor(private workspaceService: WorkspaceService, private routingService: RoutingService) { }

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
      new ActionOption(ROUTES.DETAIL_SIMILAR_MOVIES, !similarMoviesHaveAllDetails),
      new ActionOption(ROUTES.CREATE_NEW_STORY, true),
      new ActionOption(ROUTES.REVISION_HISTORY, false),
    ];

    this.workspaceService.currentWorkspace.stories.forEach((story: Story, storyId: string) => {
      options.push(
        new ActionOption(ROUTES.STORY_VIEW_PAGE, story.hasContentToShow(), storyId)
      );

      options.push(
        new ActionOption(ROUTES.ASSIGN_SIMILAR_MOVIES, !story.similarMovieIds.length, storyId)
      );

      options.push(
        new ActionOption(ROUTES.LOGLINE_EDIT_PAGE, !story.logLine, storyId)
      )
    });

    return Promise.resolve(options);
  }

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
    if (!this.currentOption) {
      this.currentOption = option;
      this.currentEpochStarted = Date.now();
    }

    this.routingService.navigateToUrl(option.actionRoute, option.storyId);
  }

  completeAction() {
    const newHistoryEntry = new HistoryEntry();
    newHistoryEntry.userEmail = getLoginEmail();
    newHistoryEntry.editStartEpochMs = this.currentEpochStarted;
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
    this.currentEpochStarted = null;
    this.currentOption = null;
    this.routingService.navigateToUrl(ROUTES.ACTION_MENU);
  }

}
