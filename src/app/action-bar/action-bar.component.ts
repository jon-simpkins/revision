import { Component, OnInit } from '@angular/core';
import { ActionService } from '../services/action.service';

/**
 * Full-width status bar to show running timer
 */
@Component({
  selector: 'action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss']
})
export class ActionBarComponent implements OnInit {

  constructor(private actionService: ActionService) { }

  ngOnInit() {
  }

  hasCurrentAction(): boolean {
    return !!this.actionService.currentOption;
  }

  getTimerText(): string {
    let secElapsed = Math.floor(0.001 * (
      Date.now() - this.actionService.currentEpochStarted)
    );

    const minElapsed = Math.floor(secElapsed / 60);
    secElapsed -= (60 * minElapsed);

    let outputStr = '';
    if (minElapsed < 10) {
      outputStr += '0';
    }
    outputStr += minElapsed + ':';

    if (secElapsed < 10) {
      outputStr += '0';
    }
    outputStr += secElapsed;

    return outputStr;
  }

  completeAction() {
    this.actionService.completeAction();
  }

  abandonAction() {
    this.actionService.abandonCurrentAction();
  }

}
