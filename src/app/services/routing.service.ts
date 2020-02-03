import { Injectable } from '@angular/core';
import { Router, ParamMap } from '@angular/router';

import { ROUTES } from '../v2-components/v2-router/routes';
import { WorkspaceService } from './workspace.service';
import { query } from '@angular/animations';

/**
 * Convenience wrapper around the Angular router, to deal with things specific to our routes (like adding implicit query params explicitly)
 */
@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(private router: Router, private workspaceService: WorkspaceService) { }

  navigateToUrl(route: ROUTES, storyId?: string, viewSequenceId?: string, editSequenceId?: string) {
    // Why the timeout? To avoid some stupid race condition related to changing the route
    // while still reacting to the old one
    
    const queryParamMap = new Map<string,string>()
    queryParamMap.set('workspace', this.workspaceService.getCurrentWorkspaceId());
    queryParamMap.set('storyId', storyId || this.workspaceService.getCurrentStoryId());
    queryParamMap.set('viewSequenceId', viewSequenceId || this.workspaceService.getCurrentViewSequenceId());
    queryParamMap.set('editSequenceId', editSequenceId || this.workspaceService.getCurrentEditSequenceId());

    this.paramMapHandler(queryParamMap);

    setTimeout(() => {
      this.router.navigate(
        [`/v2/${route}`],
        { queryParams: queryParamMap }
      );
    }, 250);
  }

  paramMapHandler(map: Map<string,string> | ParamMap) {
    const workspaceId = map.get('workspace');

    this.workspaceService.openWorkspace(workspaceId).then(wasChanged => {
      if (wasChanged) {
        if (!!workspaceId) {
          this.navigateToUrl(ROUTES.ACTION_MENU);
        } else {
          this.navigateToUrl(ROUTES.WORKSPACE_MENU);
        }
      }
    });

    this.workspaceService.setCurrentStoryId(map.get('storyId'));
    this.workspaceService.setCurrentViewSequenceId(map.get('viewSequenceId'));
    this.workspaceService.setCurrentEditSequenceId(map.get('editSequenceId'));

  }
}
