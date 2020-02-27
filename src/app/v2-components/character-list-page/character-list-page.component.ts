import { Component, OnInit } from '@angular/core';
import { Character } from 'src/storyStructures';
import { ActionService } from 'src/app/services/action.service';
import { WorkspaceService } from 'src/app/services/workspace.service';

@Component({
  selector: 'character-list-page',
  templateUrl: './character-list-page.component.html',
  styleUrls: ['./character-list-page.component.scss']
})
export class CharacterListPageComponent implements OnInit {

  public characterListDataSource: Character[] = [];
  public characterListColumns = ['characterName'];

  constructor(private actionService: ActionService, private workspaceService: WorkspaceService) {

  }

  ngOnInit() {
  }

  getCharacterListDataSource(): Character[] {
    if (this.workspaceService.getCurrentStory().characters.size !== this.characterListDataSource.length) {
      this.characterListDataSource = [];
      this.workspaceService.getCurrentStory().characters.forEach(character => {
        this.characterListDataSource.push(character);
      });
    }

    
    return this.characterListDataSource;
  }

}
