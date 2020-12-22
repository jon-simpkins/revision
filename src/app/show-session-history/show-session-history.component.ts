import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {WorkspaceMetadataService} from '../workspace-metadata.service';
import {IWritingSession, WritingWorkspaceMetadata} from '../../protos';

@Component({
  selector: 'app-show-session-history',
  templateUrl: './show-session-history.component.html',
  styleUrls: ['./show-session-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowSessionHistoryComponent implements OnInit, OnDestroy {
  workspaceMetadata: WritingWorkspaceMetadata = WritingWorkspaceMetadata.create();
  metadataSubscription = '';

  constructor(private ref: ChangeDetectorRef, private workspaceMetadataService: WorkspaceMetadataService) { }

  ngOnInit(): void  {
    this.metadataSubscription = this.workspaceMetadataService.subscribeToWorkspaceMetadata(
      (workspaceMetadata: WritingWorkspaceMetadata) => {
      this.workspaceMetadata = workspaceMetadata;
      this.ref.markForCheck();
    });
  }

  ngOnDestroy(): void  {
    this.workspaceMetadataService.cancelSubscriptionToWorkspaceMetadata(this.metadataSubscription);
  }

  fetchRecentHistory(): IWritingSession[] {
    return this.workspaceMetadata.sessionHistory;
  }

  fetchHistoryLength(): number {
    return this.workspaceMetadata.sessionHistory.length;
  }

}
