import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from 'src/app/services/workspace.service';
import { ActionService } from 'src/app/services/action.service';
import { Character, CHARACTER_TYPE } from 'src/storyStructures';
import { ActionOption } from 'src/actions/action-option';
import { ANALYSIS_ACTIONS } from 'src/actions/actions';

@Component({
  selector: 'edit-character-characteristics-page',
  templateUrl: './edit-character-characteristics-page.component.html',
  styleUrls: ['./edit-character-characteristics-page.component.scss']
})
export class EditCharacterCharacteristicsPageComponent implements OnInit {

  typeOptions: Object[];
  typeDescriptions: Object;

  getViewCharacterAction: () => ActionOption;

  constructor(private workspaceService: WorkspaceService, private actionService: ActionService) {
    this.typeOptions = [
      CHARACTER_TYPE.PRIMARY,
      CHARACTER_TYPE.SECONDARY,
      CHARACTER_TYPE.TERTIARY,
    ];

    this.typeDescriptions = {
      [CHARACTER_TYPE.PRIMARY]: 'Can have changing motivations and changing relationships over the course of the story. Would be on the poster, and would do interviews for the movie.',
      [CHARACTER_TYPE.SECONDARY]: 'Is more likely to have static motivations and relationships. Might appear in the trailer for the movie.',
      [CHARACTER_TYPE.TERTIARY]: 'Likely doesn\'t have motivations or relationships outside of their role (e.g. "Waiter #2").'
    }

    this.getViewCharacterAction = () => {
      return new ActionOption(ANALYSIS_ACTIONS.VIEW_CHARACTER_DETAILS, null, null, this.workspaceService.getCurrentEditEntityId());
    }
  }

  ngOnInit() {
  }

  getCurrentCharacter(): Character {
    return this.workspaceService.getCurrentStory().characters.get(
      this.workspaceService.getCurrentEditEntityId()
    );
  }

  getCharacterId(): string {
    return this.getCurrentCharacter().id;
  }

  getCharacterName(): string {
    return this.getCurrentCharacter().getName();
  }

  nameInput(e) {
    const newName = e.target.value;
    this.getCurrentCharacter().name = newName;
  }

  getTypeOptions() {
    return this.typeOptions;
  }

  getCharacterType(): string {
    return this.getCurrentCharacter().type;
  }

  changeCharacterType(e) {
    this.getCurrentCharacter().type = e as CHARACTER_TYPE;
  }

  getCharacterTypeDescription(): string {
    if (this.typeDescriptions[this.getCharacterType()]) {
      return this.typeDescriptions[this.getCharacterType()];
    }

    return '';
  }

}
