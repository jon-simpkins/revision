import { Component, OnInit } from '@angular/core';
import { WorkspaceOption, WorkspaceService } from '../services/workspace.service';
import { Router } from '@angular/router';

import { ROUTES } from '../v2-router/routes';

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

  private options: WorkspaceOption[];
  public creatingWorkspace = false;

  constructor(private workspaceService: WorkspaceService, private router: Router) { }

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
      console.log('navigating!');
      this.router.navigate(
        [`/v2/${ROUTES.ACTION_MENU}`],
        { queryParams: { workspace: this.workspaceService.getCurrentWorkspaceId() } }
      );
    });

  }

}
