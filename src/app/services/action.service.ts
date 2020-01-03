import { Injectable } from '@angular/core';

import {ROUTES} from '../v2-router/routes'; // todo: make this an enum of routes?
import { WorkspaceService } from './workspace.service';

export const ACTION_ROUTE_LABEL = new Map<string, string>(); // Map from route -> label for action

export class ActionOption {
  constructor(public actionRoute: ROUTES) {}

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

  constructor(private workspaceService: WorkspaceService) { }

  getAllActionOptions(): ActionOption[] {
    const options = [ // Initialize to ones that are always options
      new ActionOption(ROUTES.DETAIL_SIMILAR_MOVIES),
      new ActionOption(ROUTES.CREATE_NEW_STORY),
    ];

    return options;
  }

}
