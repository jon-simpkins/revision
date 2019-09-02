import { Component, Input } from '@angular/core';
import {ContentEditService} from '../../content-edit.service';
import UserEdit from '../../../types/UserEdit';
import EditContext, {EditType} from '../../../types/EditContext';
import {TextLineContent, ThreeLineContent} from '../../../types/Scrap';

@Component({
  selector: 'edit-panel-content',
  templateUrl: './edit-panel-content.component.html',
  styleUrls: ['./edit-panel-content.component.scss']
})
export class EditPanelContentComponent {

  @Input() editContent: TextLineContent | ThreeLineContent;
  @Input() editContext: EditContext;

  editTypes = EditType; // Allow the template to see the enum

  constructor(private contentEditService: ContentEditService) { }

  sendPlaintextEdit(update: string) {
    this.contentEditService.receiveEdit(new UserEdit(update, null));
  }

  sendIndexedTextEdit(update: string, idx: number) {
    this.contentEditService.receiveEdit(new UserEdit(update, idx));
  }
}
