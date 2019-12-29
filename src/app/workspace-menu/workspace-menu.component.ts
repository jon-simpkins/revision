import { Component, OnInit } from '@angular/core';
import { WorkspaceOption, WorkspaceService } from '../services/workspace.service';

import { ROUTES } from '../v2-router/routes';
import { RoutingService } from '../services/routing.service';

/**
 * Component for selecting a known workspace
 * or for starting a new one.
 * 
 * This would be the entry point for new users
 */

@Component({
  selector: 'workspace-menu',
  templateUrl: './workspace-menu.component.html',
  styleUrls: ['./workspace-menu.component.scss']
})
export class WorkspaceMenuComponent implements OnInit {

  public options: WorkspaceOption[];
  public creatingWorkspace = false;

  constructor(private workspaceService: WorkspaceService, private routingService: RoutingService) { }

  ngOnInit() {
    this.options = this.workspaceService.getRecentWorkspaceOptions();
  }

  createWorkspace() {
    const workspaceName = window.prompt('What name would you like for this workspace?');
    if (!workspaceName) {
      return;
    }

    this.creatingWorkspace = true;
    this.workspaceService.createWorkspace(workspaceName).then((newId) => {
      this.creatingWorkspace = false;
      this.openWorkspace(newId);
    });
  }

  renderDate(epoch: number): string {
    return new Date(epoch).toLocaleString();
  }

  openWorkspace(id: string) {
    this.workspaceService.openWorkspace(id).then(() => {
      this.routingService.navigateToUrl(ROUTES.ACTION_MENU);
    });
  }

}
