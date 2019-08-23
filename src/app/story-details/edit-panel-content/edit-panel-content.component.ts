import { Component, Input } from '@angular/core';
import {ContentEditService} from '../../content-edit.service';

@Component({
  selector: 'edit-panel-content',
  templateUrl: './edit-panel-content.component.html',
  styleUrls: ['./edit-panel-content.component.scss']
})
export class EditPanelContentComponent {

  @Input() editContent: any;
  @Input() editContext: any;
  @Input() editType: string;

  constructor(public contentEditService: ContentEditService) { }

}
