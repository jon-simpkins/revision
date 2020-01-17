import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES, storySpecificRoutes } from '../v2-components/v2-router/routes';
import { WorkspaceService } from './workspace.service';

/**
 * Convenience wrapper around the Angular router, to deal with things specific to our routes (like adding implicit query params explicitly)
 */
@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(private router: Router, private workspaceService: WorkspaceService) { }

  navigateToUrl(route: ROUTES, storyId?: string) {
    // Why the timeout? To avoid some stupid race condition related to changing the route
    // while still reacting to the old one
    setTimeout(() => {
      this.router.navigate(
        [`/v2/${route}`],
        { queryParams: {
          workspace: this.workspaceService.getCurrentWorkspaceId(),
          storyId: storyId || this.workspaceService.getCurrentStoryId(),
        } }
      );
    }, 250);
  }

  gateStorySpecificPages(currentRoute: ROUTES) {
    if (!storySpecificRoutes.has(currentRoute)) {
      return;
    }

    const storyId = this.workspaceService.getCurrentStoryId();
    if (!storyId || !this.workspaceService.currentWorkspace.stories.has(storyId)) {
      // No valid story to load!
      console.log('Gating story-specific page: ' + currentRoute);
      this.navigateToUrl(ROUTES.ACTION_MENU);
    }
  }
}
