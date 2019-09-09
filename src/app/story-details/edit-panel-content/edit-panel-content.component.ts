import { Component, Input } from '@angular/core';
import {ContentEditService} from '../../content-edit.service';
import UserEdit from '../../../types/UserEdit';
import EditContext, {EditType} from '../../../types/EditContext';
import {TextLineContent} from '../../../types/Scrap';
import ViewOption from '../../../types/ViewOption';
import {StoryService} from '../../story.service';
import {NLineContent} from '../../../types/ScrapTypes/NLineContent';

@Component({
  selector: 'edit-panel-content',
  templateUrl: './edit-panel-content.component.html',
  styleUrls: ['./edit-panel-content.component.scss']
})
export class EditPanelContentComponent {

  @Input() editContent: TextLineContent | NLineContent;
  @Input() editContext: EditContext;

  editTypes = EditType; // Allow the template to see the enum

  constructor(private contentEditService: ContentEditService, private storyService: StoryService) { }

  sendPlaintextEdit(update: string) {
    this.contentEditService.receiveEdit(new UserEdit(update, null));
  }

  sendIndexedTextEdit(update: string, idx: number) {
    this.contentEditService.receiveEdit(new UserEdit(update, idx));
  }

  sendToggle(newToggleVal, idx: number) {
    this.contentEditService.receiveEdit(new UserEdit(null, idx, newToggleVal));
  }

  getDesc(value: string) {
    let desc = '';

    this.editContext.multiOptions.forEach(option => {
      if (option.value === value) {
        desc = option.desc;
      }
    });

    return desc;
  }

  requestView(viewOption: ViewOption) {
    this.storyService.setViewContent(viewOption);
  }
}
