import { Injectable } from '@angular/core';
import { Router, ParamMap } from '@angular/router';

import { ROUTES } from '../v2-components/v2-router/routes';
import { WorkspaceService } from './workspace.service';

/**
 * Convenience wrapper around the Angular router, to deal with things specific to our routes (like adding implicit query params explicitly)
 */
@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(private router: Router, private workspaceService: WorkspaceService) { }

  navigateToUrl(route: ROUTES, storyId?: string, viewEntityId?: string, editEntityId?: string) {
    // Why the timeout? To avoid some stupid race condition related to changing the route
    // while still reacting to the old one
    
    const queryParamMap = new Map<string,string>()
    queryParamMap.set('workspace', this.workspaceService.getCurrentWorkspaceId());
    queryParamMap.set('storyId', storyId || this.workspaceService.getCurrentStoryId());
    queryParamMap.set('viewEntityId', viewEntityId || this.workspaceService.getCurrentViewEntityId());
    queryParamMap.set('editEntityId', editEntityId || this.workspaceService.getCurrentEditEntityId());

    this.paramMapHandler(queryParamMap);

    setTimeout(() => {
      this.router.navigate(
        [`/v2/${route}`],
        { queryParams: this.convertMapToObj(queryParamMap) }
      );
    }, 250);
  }

  convertMapToObj(map: Map<string, string>): Object {
    const obj = {};
    map.forEach((value: string, key: string) => {
      obj[key] = value;
    });

    return obj;
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
    this.workspaceService.setCurrentViewEntityId(map.get('viewEntityId'));
    this.workspaceService.setCurrentEditEntityId(map.get('editEntityId'));

  }
}
