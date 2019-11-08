import * as uuid from 'uuid/v4';

import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {StoryService} from '../services/story.service';
import {ScreenService} from '../services/screen.service';
import {ContentEditService} from '../services/content-edit.service';
import EditOption from '../../types/EditOption';
import ScrapPrototype from '../../types/ScrapPrototype';

@Component({
  selector: 'story-details',
  templateUrl: './story-details.component.html',
  styleUrls: ['./story-details.component.scss']
})
export class StoryDetailsComponent implements OnInit, OnChanges {

  @Input() storyId: string;

  constructor(
    public storyService: StoryService,
    public screenService: ScreenService,
    public contentEditService: ContentEditService
  ) { }

  ngOnInit(): void {
    this.storyService.fetchStory(this.storyId);
  }

  ngOnChanges(): void {
    this.storyService.fetchStory(this.storyId);
  }

  chooseRandomEdit(preferredPrototype?: ScrapPrototype) {
    const option = EditOption.selectRandom(this.screenService.editOptions, preferredPrototype);

    this.contentEditService.startEdit(option.scrapId, option.prototype, option.refId);
  }

  startRandomScript() {
    this.contentEditService.startEdit(null, ScrapPrototype.SCRIPT, uuid());
  }
}
