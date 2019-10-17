import * as uuid from 'uuid/v4';

import {Component} from '@angular/core';
import {StoryService} from '../services/story.service';
import {ScreenService} from '../services/screen.service';
import {ContentEditService} from '../services/content-edit.service';
import EditOption from '../../types/EditOption';
import {ScrapPrototype} from '../../types/Scrap';


@Component({
  selector: 'story-details',
  templateUrl: './story-details.component.html',
  styleUrls: ['./story-details.component.scss']
})
export class StoryDetailsComponent {

  constructor(
    public storyService: StoryService,
    public screenService: ScreenService,
    public contentEditService: ContentEditService
  ) { }

  // Take the user back to the story list view
  backToList() {
    // Close the nav views, to avoid weirdness
    this.screenService.showEditNav = false;
    this.screenService.showViewNav = false;
    this.screenService.updateShowStoryDetails(false);
  }

  chooseRandomEdit(preferredPrototype?: ScrapPrototype) {
    const option = EditOption.selectRandom(this.screenService.editOptions, preferredPrototype);

    this.contentEditService.startEdit(option.scrapId, option.prototype, option.refId);
  }

  startRandomScript() {
    this.contentEditService.startEdit(null, ScrapPrototype.SCRIPT, uuid());
  }
}
