import { Component } from '@angular/core';
import {StoryService} from '../story.service';
import {ScreenService} from '../screen.service';

@Component({
  selector: 'story-details',
  templateUrl: './story-details.component.html',
  styleUrls: ['./story-details.component.scss']
})
export class StoryDetailsComponent {



  constructor(
    public storyService: StoryService,
    public screenService: ScreenService
  ) { }

  // Take the user back to the story list view
  backToList() {
    // Close the nav views, to avoid weirdness
    this.screenService.showEditNav = false;
    this.screenService.showViewNav = false;
    this.screenService.updateShowStoryDetails(false);
  }



  openViewTree() {

  }

}
