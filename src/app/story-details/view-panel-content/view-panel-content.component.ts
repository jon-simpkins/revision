import { Component, Input } from '@angular/core';
import ViewContentBlock, {ViewContentBlockType} from './ViewContentBlock';

@Component({
  selector: 'view-panel-content',
  templateUrl: './view-panel-content.component.html',
  styleUrls: ['./view-panel-content.component.scss']
})
export class ViewPanelContentComponent {

  // Make enum visible to the component
  viewContentBlockTypes = ViewContentBlockType;

  @Input() viewContentBlocks: ViewContentBlock[];

}
