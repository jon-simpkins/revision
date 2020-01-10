import { Injectable } from '@angular/core';

import { ROUTES } from '../v2-router/routes'; // todo: make this an enum of routes?
import { WorkspaceService } from './workspace.service';
import { RoutingService } from './routing.service';
import { HistoryEntry, Story } from 'src/storyStructures';
import { getLoginEmail } from 'src/docsApi/docsApiHelpers';

export class ActionOption {
  constructor(public actionRoute: ROUTES, public storyId?: string) { }

  getLabel(): string {
    if (this.actionRoute === ROUTES.DETAIL_SIMILAR_MOVIES) {
      return 'Edit a List of Reference Movies';
    }
    if (this.actionRoute === ROUTES.CREATE_NEW_STORY) {
      return 'Create New Story';
    }
    if (this.actionRoute === ROUTES.REVISION_HISTORY) {
      return 'Review Revision History';
    }
    if (this.actionRoute === ROUTES.ASSIGN_SIMILAR_MOVIES) {
      return `Assign Similar Movies (${this.storyId})`
    }

    return '-';
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

    const options = [ // Initialize to ones that are always options
      new ActionOption(ROUTES.DETAIL_SIMILAR_MOVIES),
      new ActionOption(ROUTES.CREATE_NEW_STORY),
      new ActionOption(ROUTES.REVISION_HISTORY),
    ];

    this.workspaceService.currentWorkspace.stories.forEach((story: Story, storyId: string) => {
      options.push(
        new ActionOption(ROUTES.ASSIGN_SIMILAR_MOVIES, storyId)
      );
    });

    return Promise.resolve(options);
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
