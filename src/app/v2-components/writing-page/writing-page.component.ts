import { Component, OnInit } from '@angular/core';
import { ActionService } from 'src/app/services/action.service';

import { SYNTHESIS_ACTIONS, ANALYSIS_ACTIONS } from '../../../actions/actions';

@Component({
  selector: 'writing-page',
  templateUrl: './writing-page.component.html',
  styleUrls: ['./writing-page.component.scss']
})
export class WritingPageComponent implements OnInit {

  public analysisActions = ANALYSIS_ACTIONS;
  public synthesisActions = SYNTHESIS_ACTIONS;

  constructor(private actionService: ActionService) { }

  ngOnInit() {
  }

  hasViewAction(): boolean {
    return !!this.actionService.getCurrentViewOption();
  }

  getViewAction(): string {
    return this.hasViewAction() ? this.actionService.getCurrentViewOption().action : '';
  }

  hasEditAction(): boolean {
    return !!this.actionService.getCurrentEditOption();
  }

  getEditAction(): string {
    return this.hasEditAction() ? this.actionService.getCurrentEditOption().action : '';
  }

}
