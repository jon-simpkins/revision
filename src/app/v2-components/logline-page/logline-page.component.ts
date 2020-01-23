import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from 'src/app/services/workspace.service';
import { ActionOption } from 'src/app/services/action.service';
import { ROUTES } from '../v2-router/routes';

@Component({
  selector: 'logline-page',
  templateUrl: './logline-page.component.html',
  styleUrls: ['./logline-page.component.scss']
})
export class LoglinePageComponent {

  logline: string;
  loglineEdited: (newLogline: string) => void;
  storyViewAction: ActionOption;

  constructor(private workspaceService: WorkspaceService) {
    this.logline = this.workspaceService.getCurrentStory().logLine || '';
    this.loglineEdited = (newLogline: string) => {
      this.workspaceService.getCurrentStory().logLine = newLogline;
    }

    this.storyViewAction = new ActionOption(ROUTES.STORY_VIEW_PAGE);
  }

  getStoryId(): string {
    return this.workspaceService.getCurrentStoryId();
  }

}
