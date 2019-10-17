import { Component } from '@angular/core';

import {ScreenService} from '../../services/screen.service';
import {StoryService} from '../../services/story.service';

@Component({
  selector: 'view-nav',
  templateUrl: './view-nav.component.html',
  styleUrls: ['./view-nav.component.scss']
})
export class ViewNavComponent {

  constructor(public screenService: ScreenService, public storyService: StoryService) { }

  closeViewNav() {
    this.screenService.showViewNav = false;
  }

}
