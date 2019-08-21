import { Component, OnInit } from '@angular/core';

import {StoryService} from '../story.service';
import {ScreenService} from '../screen.service';

@Component({
  selector: 'story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.scss']
})
export class StoryListComponent implements OnInit {

  constructor(public storyService: StoryService, private screenService: ScreenService) { }

  createStory() {
    this.storyService.createStory();
  }

  seeDetails(documentId: string) {
    this.storyService.fetchStory(documentId);
    this.screenService.updateShowStoryDetails(true);
  }

  ngOnInit() {
  }

}
