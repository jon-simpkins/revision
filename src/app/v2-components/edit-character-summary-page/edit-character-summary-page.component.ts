import { Component, OnInit } from '@angular/core';
import { ActionOption } from 'src/actions/action-option';
import { ANALYSIS_ACTIONS } from 'src/actions/actions';
import { WorkspaceService } from '../../services/workspace.service';
import { ActionService } from '../../services/action.service';
import { Character } from 'src/storyStructures';

@Component({
  selector: 'edit-character-summary-page',
  templateUrl: './edit-character-summary-page.component.html',
  styleUrls: ['./edit-character-summary-page.component.scss']
})
export class EditCharacterSummaryPageComponent implements OnInit {

  getCharacterViewAction: () => ActionOption;
  summary: string;
  summaryEdited: (newSummary: string) => void;

  constructor(private workspaceService: WorkspaceService, private actionService: ActionService) {

    this.getCharacterViewAction = () => {
      return new ActionOption(
        ANALYSIS_ACTIONS.VIEW_CHARACTER_DETAILS,
        null,
        null,
        this.workspaceService.getCurrentEditEntityId()
      );
    }
    this.summaryEdited = (newSummary: string) => {
      this.getCurrentCharacter().summary = newSummary;
    }
  }

  ngOnInit() {
    this.summary = this.getCurrentCharacter().summary || '';
  }

  getCurrentCharacter(): Character {
    return this.workspaceService.getCurrentStory().characters.get(
      this.workspaceService.getCurrentEditEntityId()
    );
  }
}
