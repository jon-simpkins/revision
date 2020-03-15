import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from 'src/app/services/workspace.service';
import { ActionService } from 'src/app/services/action.service';
import { Character } from 'src/storyStructures';
import { ActionOption } from 'src/actions/action-option';
import { ANALYSIS_ACTIONS, SYNTHESIS_ACTIONS } from 'src/actions/actions';

@Component({
  selector: 'character-details-page',
  templateUrl: './character-details-page.component.html',
  styleUrls: ['./character-details-page.component.scss']
})
export class CharacterDetailsPageComponent implements OnInit {

  getViewAllCharactersAction: () => ActionOption;
  getEditSpecificCharacterAction: () => ActionOption;

  constructor(private workspaceService: WorkspaceService, private actionService: ActionService) {
    this.getViewAllCharactersAction = () => {
      return new ActionOption(ANALYSIS_ACTIONS.VIEW_CHARACTER_LIST);
    }
    this.getEditSpecificCharacterAction = () => {
      return new ActionOption(
        SYNTHESIS_ACTIONS.CHARACTER_CHARACTERISTICS,
        null,
        this.workspaceService.getCurrentStoryId(),
        this.workspaceService.getCurrentViewEntityId()
      );
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

  getCharacterType(): string {
    if (this.getCurrentCharacter().type) {
      return this.getCurrentCharacter().type;
    }

    return 'None Specified';
  }

}
