import { Component, Input } from '@angular/core';
import ViewContentBlock, {ViewContentBlockType} from './ViewContentBlock';
import ViewOption from '../../../types/ViewOption';
import {ScreenService} from '../../screen.service';
import {StoryService} from '../../story.service';

@Component({
  selector: 'view-panel-content',
  templateUrl: './view-panel-content.component.html',
  styleUrls: ['./view-panel-content.component.scss']
})
export class ViewPanelContentComponent {

  // Make enum visible to the component
  viewContentBlockTypes = ViewContentBlockType;

  @Input() viewContentBlocks: ViewContentBlock[];

  constructor(private storyService: StoryService) { }

  updateViewContent(viewOption: ViewOption) {
    console.log(viewOption);
    this.storyService.setViewContent(viewOption)
  }

}
