import { Component, Input, NgZone, ViewChild } from '@angular/core';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {take} from 'rxjs/operators';

import {ContentEditService} from '../../content-edit.service';
import UserEdit from '../../../types/UserEdit';
import EditContext, {EditType} from '../../../types/EditContext';
import ViewOption from '../../../types/ViewOption';
import {StoryService} from '../../story.service';
import {NLineContent} from '../../../types/ScrapTypes/NLineContent';
import {TextLineContent} from '../../../types/ScrapTypes/TextLineContent';
import {StructureSpecContent} from '../../../types/ScrapTypes/StructureSpecContent';

@Component({
  selector: 'edit-panel-content',
  templateUrl: './edit-panel-content.component.html',
  styleUrls: ['./edit-panel-content.component.scss']
})
export class EditPanelContentComponent {

  @Input() editContent: TextLineContent | NLineContent | StructureSpecContent;
  @Input() editContext: EditContext;

  editTypes = EditType; // Allow the template to see the enum

  constructor(private _ngZone: NgZone, private contentEditService: ContentEditService, private storyService: StoryService) { }

  // Resize content from: https://material.angular.io/components/input/examples
  @ViewChild('autosize', {static: false}) autosize: CdkTextareaAutosize;
  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

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
