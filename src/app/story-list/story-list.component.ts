import { Component, OnInit } from '@angular/core';

import {StoryService} from '../story.service';

@Component({
  selector: 'story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.scss']
})
export class StoryListComponent implements OnInit {

  constructor(public storyService: StoryService) { }

  createStory() {
    this.storyService.createStory();
  }

  ngOnInit() {
  }

}
