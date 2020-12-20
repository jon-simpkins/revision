import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {WorkspaceMetadataService} from '../workspace-metadata.service';

@Component({
  selector: 'app-header-timer',
  templateUrl: './header-timer.component.html',
  styleUrls: ['./header-timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderTimerComponent implements OnInit {

  sessionTimeStr = '00:00';

  constructor(private workspaceMetadataService: WorkspaceMetadataService, private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    setInterval(async () => {
      await this.updateHeartbeat();
    }, 500);
  }

  async updateHeartbeat(): Promise<void> {
    const currentSession = await this.workspaceMetadataService.updateSessionHeartbeat();

    let sessionSecs = currentSession.duration?.seconds as number;
    const activeSecs = currentSession.activeDuration?.seconds as number;

    const activePercent = Math.round(activeSecs / sessionSecs * 100);

    const sessionHrs = Math.floor(sessionSecs / 3600);
    sessionSecs -= (3600 * sessionHrs);

    const sessionMins = Math.floor(sessionSecs / 60);
    sessionSecs -= (60 * sessionMins);

    let stringValue = '';
    if (sessionHrs) {
      stringValue = sessionHrs.toString() + ':';
    }

    stringValue += this.getNumberStr(sessionMins) + ':' + this.getNumberStr(sessionSecs);

    if (activeSecs > 0) {
      stringValue += ' (' + activePercent + '% active)';
    }

    this.sessionTimeStr = stringValue;

    this.ref.markForCheck();
  }

  getNumberStr(value: number): string {
    let output = '';
    if (value < 10) {
      output = '0';
    }
    return output + value.toString();
  }

}
