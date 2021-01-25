import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BrainstormTemplate} from '../../../protos';

import {debounce} from 'debounce';

export interface BrainstormTemplateUpdate {
  brainstormTemplate: BrainstormTemplate;
  modifiesListView: boolean;
}

@Component({
  selector: 'app-brainstorm-template-details',
  templateUrl: './brainstorm-template-details.component.html',
  styleUrls: ['./brainstorm-template-details.component.scss']
})
export class BrainstormTemplateDetailsComponent {

  constructor() { }

  @Input()
  brainstormTemplate: BrainstormTemplate|null = null;

  @Output() brainstormTemplateUpdated = new EventEmitter<BrainstormTemplateUpdate>();

  onLabelInput = debounce((event: any) => {
    const brainstormTemplate = this.brainstormTemplate as BrainstormTemplate;

    brainstormTemplate.label = event.target.value;

    this.brainstormTemplateUpdated.emit({
      brainstormTemplate,
      modifiesListView: true,
    } as BrainstormTemplateUpdate);
  }, 200);

  onTemplateInput = debounce((event: any) => {
    const brainstormTemplate = this.brainstormTemplate as BrainstormTemplate;

    brainstormTemplate.template = event.target.value;

    this.brainstormTemplateUpdated.emit({
      brainstormTemplate,
      modifiesListView: false,
    } as BrainstormTemplateUpdate);
  }, 200);

  isEmpty(): boolean {
    return this.brainstormTemplate == null;
  }

}
