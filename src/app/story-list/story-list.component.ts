import { Component, OnInit } from '@angular/core';

import {StoryService} from '../services/story.service';
import {Router} from '@angular/router';
import {StructureBlock} from '../../types/StoryStructure/StoryStructure';

@Component({
  selector: 'story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.scss']
})
export class StoryListComponent implements OnInit {

  constructor(public storyService: StoryService, private router: Router) { }

  createStory() {
    this.storyService.createStory();
  }

  seeDetails(documentId: string) {
    this.router.navigate(['/writing'], {queryParams: {storyId: documentId}});
  }

  ngOnInit() {
  }

  convertSecToStr(sec: number): string {
    return StructureBlock.convertSecToStr(sec);
  }

  selectRandom() {
    this.seeDetails(
      this.storyService.selectRandomId()
    );
  }

}
