import { Component, Input } from '@angular/core';
import ViewContentBlock, {ViewContentBlockType} from './ViewContentBlock';
import ViewOption from '../../../types/ViewOption';
import {StoryService} from '../../story.service';
import {ContentEditService} from '../../content-edit.service';
import EditOption from '../../../types/EditOption';
import {ScreenService} from '../../screen.service';

@Component({
  selector: 'view-panel-content',
  templateUrl: './view-panel-content.component.html',
  styleUrls: ['./view-panel-content.component.scss']
})
export class ViewPanelContentComponent {

  // Make enum visible to the component
  viewContentBlockTypes = ViewContentBlockType;

  @Input() viewContentBlocks: ViewContentBlock[];

  constructor(private screenService: ScreenService, private storyService: StoryService, private contentEditService: ContentEditService) { }

  showViewPanelBtn(): boolean {
    return !this.screenService.showViewNav;
  }

  openViewNav() {
    this.screenService.showViewNav = true;
  }

  showPrevViewBtn(): boolean {
    return this.storyService.canNavigateViewBack();
  }

  navigateBack() {
    this.storyService.navigateViewBack();
  }

  navigateForward() {
    this.storyService.navigateViewForward();
  }

  showNextViewBtn(): boolean {
    return this.storyService.canNavigateViewForward();
  }

  updateViewContent(viewOption: ViewOption) {
    this.storyService.setViewContent(viewOption);
  }

  initiateEdit(editOption: EditOption) {
    this.contentEditService.startEdit(editOption.scrapId, editOption.prototype, editOption.refId);
  }

}
