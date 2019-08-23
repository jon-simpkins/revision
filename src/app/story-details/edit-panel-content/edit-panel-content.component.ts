import { Component, Input } from '@angular/core';

@Component({
  selector: 'edit-panel-content',
  templateUrl: './edit-panel-content.component.html',
  styleUrls: ['./edit-panel-content.component.scss']
})
export class EditPanelContentComponent {

  @Input() editContent: any;

  constructor() { }

  receiveEdit(updatedValue, context) {
    console.log(context + ':' + updatedValue);
  }

}
