import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {StructureTemplate} from '../../../protos';

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
  structureTemplate: StructureTemplate|null = null;

  @Output() templateUpdated = new EventEmitter<StructureTemplateUpdate>();

  isEmpty(): boolean {
    return this.structureTemplate == null;
  }

  onNameChange(value: string): void {
    if (this.isEmpty()) {
      return;
    }
    const structureTemplate = this.structureTemplate as StructureTemplate;
    structureTemplate.name = value;

    this.templateUpdated.emit({
      structureTemplate,
      modifiesListView: true
    } as StructureTemplateUpdate);
  }

  onDescChange(value: string): void {
    if (this.structureTemplate == null) {
      return;
    }
    const structureTemplate = this.structureTemplate as StructureTemplate;
    structureTemplate.description = value;

    this.templateUpdated.emit({
      structureTemplate,
      modifiesListView: false
    } as StructureTemplateUpdate);
  }
}
