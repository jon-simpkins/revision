import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES } from '../v2-router/routes';
import { WorkspaceService } from './workspace.service';

/**
 * Convenience wrapper around the Angular router, to deal with things specific to our routes (like adding implicit query params explicitly)
 */
@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(private router: Router, private workspaceService: WorkspaceService) { }

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
