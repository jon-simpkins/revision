import { Component, OnInit } from '@angular/core';
import { ActionOption } from 'src/actions/action-option';
import { WorkspaceService } from '../../services/workspace.service';
import { ANALYSIS_ACTIONS } from 'src/actions/actions';

@Component({
  selector: 'character-sequence-assignment-page',
  templateUrl: './character-sequence-assignment-page.component.html',
  styleUrls: ['./character-sequence-assignment-page.component.scss']
})
export class CharacterSequenceAssignmentPageComponent implements OnInit {

  getStoryViewAction: () => ActionOption;
  getViewSequenceAction: () => ActionOption;
  getListCharacterAction: () => ActionOption;
  currentNewCharacterName = '';
  availableCharacterIds: string[] = [];

  constructor(private workspaceSerivce: WorkspaceService) {
    this.getStoryViewAction = () => new ActionOption(ANALYSIS_ACTIONS.STORY_VIEW_PAGE);
    this.getViewSequenceAction = () => new ActionOption(ANALYSIS_ACTIONS.VIEW_SEQUENCE_PAGE,
      null,
      null,
      this.getSequenceId()
    );
    this.getListCharacterAction = () => new ActionOption(ANALYSIS_ACTIONS.VIEW_CHARACTER_LIST);
  }

  ngOnInit() { }

  getSequenceId(): string {
    return this.workspaceSerivce.getCurrentEditEntityId();
  }

  getSelectedCharacterIds(): string[] {
    return this.workspaceSerivce.getCurrentEditSequence().characterAppearances || [];
  }

  getAvailableCharacterIds(): string[] {
    if (this.workspaceSerivce.getCurrentStory().characters.size - this.getSelectedCharacterIds().length !== this.availableCharacterIds.length) {
      // Time to recompute
      this.availableCharacterIds = [];
      this.workspaceSerivce.getCurrentStory().characters.forEach(character => {
        if (!this.getSelectedCharacterIds().includes(character.id)) {
          this.availableCharacterIds.push(character.id);
        }
      });
    }

    return this.availableCharacterIds;
  }

  hasAnyCharacters(): boolean {
    return this.workspaceSerivce.getCurrentStory().characters.size > 0;
  }

  addCharacter(formSubmitEvent?: Event): void {
    if (formSubmitEvent) {
      formSubmitEvent.preventDefault();
    }

    if (!this.currentNewCharacterName) {
      return;
    }

    const charId = this.workspaceSerivce.getCurrentStory().buildNewCharacter();
    this.workspaceSerivce.getCurrentStory().characters.get(charId).name = this.currentNewCharacterName;

    this.workspaceSerivce.getCurrentEditSequence().characterAppearances.push(charId);

    this.currentNewCharacterName = '';
  }

  characterNameInput(e): void {
    this.currentNewCharacterName = e.target.value;
  }

  getName(characterId): string {
    return this.workspaceSerivce.getCurrentStory().characters.get(characterId).getName();
  }

  selectRandom(): void {
    const randomIdx = Math.floor(Math.random() * this.getAvailableCharacterIds().length);
    this.select(this.getAvailableCharacterIds()[randomIdx]);
  }

  select(characterId: string): void {
    this.workspaceSerivce.getCurrentEditSequence().characterAppearances.push(characterId);
  }

  delete(characterId): void {
    this.workspaceSerivce.getCurrentEditSequence().characterAppearances = this.workspaceSerivce.getCurrentEditSequence().characterAppearances.filter(id => {
      return id !== characterId;
    });
  }

}
