import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MonolithicDataService} from '../monolithic-data.service';
import {WorkspaceMetadataService} from '../workspace-metadata.service';
import {WritingWorkspaceMetadata} from '../../protos';

// Static landing page component.
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent implements OnInit {
  workspaceName = '';
  workspaceMetadata: WritingWorkspaceMetadata = WritingWorkspaceMetadata.create();

  constructor(private monolithicDataService: MonolithicDataService, private ref: ChangeDetectorRef, private workspaceMetadataService: WorkspaceMetadataService) { }

  async ngOnInit(): Promise<void> {
    await this.updateWorkspaceName();

    this.workspaceMetadata = await this.workspaceMetadataService.getWorkspaceMetadata(false);
    this.ref.markForCheck();
    console.log(this.workspaceMetadata);
  }

  async updateWorkspaceName(): Promise<void> {
    this.workspaceName = await this.monolithicDataService.getWorkspaceName();
    this.ref.markForCheck();
  }

  async newWorkspace(): Promise<void> {
    const newWorkspaceName = prompt('What\'s the new workspace name?');

    if (!newWorkspaceName) {
      return;
    }

    await this.monolithicDataService.newWorkspace(newWorkspaceName);
    await this.updateWorkspaceName();
  }
}
