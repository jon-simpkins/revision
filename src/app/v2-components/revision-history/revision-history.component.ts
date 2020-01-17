import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from '../../services/workspace.service';
import { HistoryEntry } from 'src/storyStructures';
import { min } from 'rxjs/operators';

@Component({
  selector: 'revision-history',
  templateUrl: './revision-history.component.html',
  styleUrls: ['./revision-history.component.scss']
})
export class RevisionHistoryComponent implements OnInit {

  public readonly history: HistoryEntry[];

  public summaryColumns = ['window', 'duration'];
  public summaryDataSource: any[];

  public detailColumns = ['user', 'duration', 'when'];
  public detailDataSource: any[];

  constructor(private workspaceService: WorkspaceService) {
    this.history = this.workspaceService.currentWorkspace.history;

    this.summaryDataSource = [
      { window: 'Last 24 Hrs', duration: this.getLast24Hrs() },
      { window: 'Last 7 Days', duration: this.getLast7Days() },
      { window: 'Last 30 Days', duration: this.getLast30Days() },
      { window: 'All Time', duration: this.getAllTime() }
    ];

    this.detailDataSource = this.history.sort((a, b) => {
      return b.editEndEpochMs - a.editEndEpochMs;
    }).map(historyEntry => {
      return {
        user: historyEntry.userEmail,
        duration: this.getPlaintextDuration(historyEntry),
        when: new Date(historyEntry.editEndEpochMs).toLocaleString()
      }
    });
  }

  ngOnInit() { }

  getHeadline(historyEntry: HistoryEntry): string {
    return `${new Date(historyEntry.editEndEpochMs).toLocaleString()} (${this.getPlaintextDuration(historyEntry)})`;
  }

  getPlaintextDuration(historyEntry: HistoryEntry): string {
    const msSpent = historyEntry.editEndEpochMs - historyEntry.editStartEpochMs;
    const minSpent = Math.floor(msSpent / (60 * 1000));
    const secSpent = Math.floor((msSpent - (60*1000*minSpent)) / 1000);
    return `${minSpent} min ${secSpent} sec`;
  }

  getSummary(historyEntry: HistoryEntry): string {
    return `${historyEntry.userEmail}`;
  }

  getLast24Hrs(): string {
    return this.getWorkAfterCutoff(Date.now() - (24 * 3600 * 1000));
  }

  getLast7Days(): string {
    return this.getWorkAfterCutoff(Date.now() - (7 * 24 * 3600 * 1000));
  }

  getLast30Days(): string {
    return this.getWorkAfterCutoff(Date.now() - (30 * 24 * 3600 * 1000));
  }

  getAllTime(): string {
    return this.getWorkAfterCutoff(0);
  }

  getWorkAfterCutoff(cutoffMs: number): string {
    let totalMs = 0;
    this.history.forEach((entry: HistoryEntry) => {
      if (entry.editEndEpochMs < cutoffMs) {
        return;
      }

      totalMs += (entry.editEndEpochMs - entry.editStartEpochMs);
    });

    const numMinutes = Math.floor(totalMs / (60 * 1000));

    return `${numMinutes} minutes`;
  }

}
