import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {WorkspaceMetadataService} from '../workspace-metadata.service';
import {IWritingSession, WritingWorkspaceMetadata} from '../../protos';

@Component({
  selector: 'app-show-session-history',
  templateUrl: './show-session-history.component.html',
  styleUrls: ['./show-session-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowSessionHistoryComponent implements OnInit {

  workspaceMetadata: WritingWorkspaceMetadata = WritingWorkspaceMetadata.create();

  constructor(private ref: ChangeDetectorRef, private workspaceMetadataService: WorkspaceMetadataService) { }

  async ngOnInit(): Promise<void> {
    this.workspaceMetadata = await this.workspaceMetadataService.getWorkspaceMetadata(false);
    this.ref.markForCheck();
  }

  fetchRecentHistory(): IWritingSession[] {
    return this.workspaceMetadata.sessionHistory;
  }

  fetchHistoryLength(): number {
    return this.workspaceMetadata.sessionHistory.length;
  }

}
