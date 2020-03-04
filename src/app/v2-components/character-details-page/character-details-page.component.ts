import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from 'src/app/services/workspace.service';
import { ActionService } from 'src/app/services/action.service';
import { Character } from 'src/storyStructures';
import { ActionOption } from 'src/actions/action-option';
import { ANALYSIS_ACTIONS } from 'src/actions/actions';

@Component({
  selector: 'character-details-page',
  templateUrl: './character-details-page.component.html',
  styleUrls: ['./character-details-page.component.scss']
})
export class CharacterDetailsPageComponent implements OnInit {

  getViewAllCharactersAction: () => ActionOption;

  constructor(private workspaceService: WorkspaceService, private actionService: ActionService) {
    this.getViewAllCharactersAction = () => {
      return new ActionOption(ANALYSIS_ACTIONS.VIEW_CHARACTER_LIST);
    }
  }

  ngOnInit() {
  }

  getCurrentCharacter(): Character {
    return this.workspaceService.getCurrentStory().characters.get(
      this.workspaceService.getCurrentViewEntityId()
    );
  }

  getCharacterName(): string {
    return this.getCurrentCharacter().getName();
  }

}
