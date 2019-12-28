import { Component, OnInit } from '@angular/core';

import { ROUTES } from './routes';

import { ActivatedRoute, ParamMap, Router, UrlSegment } from '@angular/router';
import { WorkspaceService } from '../services/workspace.service';

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

  constructor(private router: Router, private route: ActivatedRoute, private workspaceService: WorkspaceService) { }

  pagePath: string;
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
          this.navigateToUrl(this.routes.ACTION_MENU);
        } else {
          this.navigateToUrl(this.routes.WORKSPACE_MENU);
        }
      }
    });
  }

  urlHandler(url: UrlSegment[]) {
    this.pagePath = '';
    if (url[1]) {
      this.pagePath = url[1].path;
    }
  }

  navigateToUrl(route: string) {
    // Why the timeout? To avoid some stupid race condition related to changing the route
    // while still reacting to the old one
    setTimeout(() => {
      this.router.navigate(
        [`/v2/${route}`],
        { queryParams: { workspace: this.workspaceService.getCurrentWorkspaceId() } }
      );
    }, 250);
  }

}
