import { Injectable } from '@angular/core';

import { ROUTES } from '../v2-router/routes'; // todo: make this an enum of routes?
import { WorkspaceService } from './workspace.service';
import { RoutingService } from './routing.service';
import { HistoryEntry } from 'src/storyStructures';
import { getLoginEmail } from 'src/docsApi/docsApiHelpers';

export const ACTION_ROUTE_LABEL = new Map<string, string>(); // Map from route -> label for action

export class ActionOption {
  constructor(public actionRoute: ROUTES) { }

  getLabel(): string {
    if (this.actionRoute === ROUTES.DETAIL_SIMILAR_MOVIES) {
      return 'Edit a List of Reference Movies';
    }
    if (this.actionRoute === ROUTES.CREATE_NEW_STORY) {
      return 'Create New Story';
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

  getAllActionOptions(): ActionOption[] {
    const options = [ // Initialize to ones that are always options
      new ActionOption(ROUTES.DETAIL_SIMILAR_MOVIES),
      new ActionOption(ROUTES.CREATE_NEW_STORY),
    ];

    return options;
  }

  startAction(option: ActionOption) {
    if (!this.currentOption) {
      this.currentOption = option;
      this.currentEpochStarted = Date.now();
    }
    this.routingService.navigateToUrl(option.actionRoute);
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
