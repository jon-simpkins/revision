import { Component, Input } from '@angular/core';

@Component({
  selector: 'view-panel-content',
  templateUrl: './view-panel-content.component.html',
  styleUrls: ['./view-panel-content.component.scss']
})
export class ViewPanelContentComponent {

  @Input() viewContent: any;

  constructor() { }

}
