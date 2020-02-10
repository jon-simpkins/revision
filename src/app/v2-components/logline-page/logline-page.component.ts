import { Component } from '@angular/core';
import { WorkspaceService } from 'src/app/services/workspace.service';
import { ActionOption } from 'src/actions/action-option';
import { ANALYSIS_ACTIONS } from 'src/actions/actions';

@Component({
  selector: 'logline-page',
  templateUrl: './logline-page.component.html',
  styleUrls: ['./logline-page.component.scss']
})
export class LoglinePageComponent {

  logline: string;
  loglineEdited: (newLogline: string) => void;
  getStoryViewAction: () => ActionOption;

  constructor(private workspaceService: WorkspaceService) {
    this.logline = this.workspaceService.getCurrentStory().logLine || '';
    this.loglineEdited = (newLogline: string) => {
      this.workspaceService.getCurrentStory().logLine = newLogline;
    }

    this.getStoryViewAction = () => new ActionOption(ANALYSIS_ACTIONS.STORY_VIEW_PAGE);
  }

  getStoryId(): string {
    return this.workspaceService.getCurrentStoryId();
  }

}
