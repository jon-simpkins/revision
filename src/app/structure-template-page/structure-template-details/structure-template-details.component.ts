import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {StructureTemplate} from '../../../protos';
import {fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, tap} from 'rxjs/operators';

export interface StructureTemplateUpdate {
  structureTemplate: StructureTemplate;
  modifiesListView: boolean;
}

@Component({
  selector: 'app-structure-template-details',
  templateUrl: './structure-template-details.component.html',
  styleUrls: ['./structure-template-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StructureTemplateDetailsComponent {
  @Input()
  structureTemplate: StructureTemplate = StructureTemplate.create();

  @Output() templateUpdated = new EventEmitter<StructureTemplateUpdate>();

  onNameChange(value: string): void {
    this.structureTemplate.name = value;

    this.templateUpdated.emit({
      structureTemplate: this.structureTemplate,
      modifiesListView: true
    } as StructureTemplateUpdate);
  }

  onDescChange(value: string): void {
    this.structureTemplate.description = value;

    this.templateUpdated.emit({
      structureTemplate: this.structureTemplate,
      modifiesListView: false
    } as StructureTemplateUpdate);
  }
}
