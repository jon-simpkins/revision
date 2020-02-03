import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from 'src/app/services/workspace.service';
import { ActionOption } from 'src/actions/action-option';
import { SYNTHESIS_ACTIONS } from 'src/actions/actions';

@Component({
  selector: 'view-sequence-page',
  templateUrl: './view-sequence-page.component.html',
  styleUrls: ['./view-sequence-page.component.scss']
})
export class ViewSequencePageComponent implements OnInit {

  summaryEditAction: ActionOption;

  constructor(private workspaceSerivce: WorkspaceService) { }

  ngOnInit() {
    this.summaryEditAction = new ActionOption(SYNTHESIS_ACTIONS.SUMMARIZE_SEQUENCE, null, null, null, this.getSequenceId());


  }

  getSummary(): string {
    return this.workspaceSerivce.getCurrentViewSequence().summaryRawText;
  }

  getSequenceId(): string {
    return this.workspaceSerivce.getCurrentViewSequenceId();
  }

}
