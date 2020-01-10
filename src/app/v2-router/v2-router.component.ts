import { Component, OnInit } from '@angular/core';

import { ROUTES } from './routes';

import { ActivatedRoute, ParamMap, UrlSegment } from '@angular/router';
import { WorkspaceService } from '../services/workspace.service';
import { RoutingService } from '../services/routing.service';

/**
 * Router Wrapper for all V2 Pages
 * 
 * The goal of this component is to be responsible for all logic around things like
 * "redirect to workspace menu if not logged into a workspace"
 * 
 * Child pages should be able to be more or less isolated from each other if this works
 */

@Component({
  selector: 'v2-router',
  templateUrl: './v2-router.component.html',
  styleUrls: ['./v2-router.component.scss']
})
export class V2RouterComponent implements OnInit {

  constructor(private route: ActivatedRoute, private workspaceService: WorkspaceService, private routingService: RoutingService) { }

  pagePath?: ROUTES;
  routes = ROUTES;

  ngOnInit() {
    this.route.queryParamMap.subscribe(map => this.paramMapHandler(map));
    this.route.url.subscribe(url => this.urlHandler(url));
  }

  paramMapHandler(map: ParamMap) {
    const workspaceId = map.get('workspace');

    this.workspaceService.openWorkspace(workspaceId).then(wasChanged => {
      if (wasChanged) {
        if (!!workspaceId) {
          this.routingService.navigateToUrl(this.routes.ACTION_MENU);
        } else {
          this.routingService.navigateToUrl(this.routes.WORKSPACE_MENU);
        }
      }
    });

    const storyId = map.get('storyId');
    const storyIdChanged = this.workspaceService.setCurrentStoryId(storyId);
    if (storyIdChanged) {
      this.routingService.gateStorySpecificPages(this.pagePath);
    }
  }

  urlHandler(url: UrlSegment[]) {
    this.pagePath = null;
    if (url[1]) {
      this.pagePath = url[1].path as ROUTES;
    }

    this.routingService.gateStorySpecificPages(this.pagePath);
  }
}
