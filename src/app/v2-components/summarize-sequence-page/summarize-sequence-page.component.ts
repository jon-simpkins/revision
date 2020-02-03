import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from 'src/app/services/workspace.service';
import { ActionOption } from 'src/actions/action-option';
import { ANALYSIS_ACTIONS } from 'src/actions/actions';

@Component({
  selector: 'summarize-sequence-page',
  templateUrl: './summarize-sequence-page.component.html',
  styleUrls: ['./summarize-sequence-page.component.scss']
})
export class SummarizeSequencePageComponent implements OnInit {

  summary: string;
  summaryEdited: (newSummary: string) => void;

  constructor(private workspaceSerivce: WorkspaceService) {
    this.summaryEdited = (newSummary: string) => {
      this.workspaceSerivce.getCurrentStory().structureElements.get(this.getSequenceId()).summaryRawText = newSummary;
    }
  }

  storyViewAction: ActionOption;
  viewSequenceAction: ActionOption;

  ngOnInit() {
    this.summary = this.workspaceSerivce.getCurrentStory().structureElements.get(this.getSequenceId()).summaryRawText;

    this.storyViewAction = new ActionOption(ANALYSIS_ACTIONS.STORY_VIEW_PAGE);
    this.viewSequenceAction = new ActionOption(ANALYSIS_ACTIONS.VIEW_SEQUENCE_PAGE,
      null,
      null,
      this.getSequenceId()
    ); // todo: add more content
  }

  getSequenceId(): string {
    return this.workspaceSerivce.getCurrentEditSequenceId();
  }

}
