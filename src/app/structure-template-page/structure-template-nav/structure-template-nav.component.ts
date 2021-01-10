import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {StructureTemplateListView} from '../../structure-template.service';

@Component({
  selector: 'app-structure-template-nav',
  templateUrl: './structure-template-nav.component.html',
  styleUrls: ['./structure-template-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StructureTemplateNavComponent {
  @Input()
  selectedTemplateId = '';

  @Input()
  structureTemplateListView: StructureTemplateListView[] = [];

  @Output() newTemplate = new EventEmitter<void>();

  @Output() selectTemplate = new EventEmitter<string>();

  @Output() deleteTemplate = new EventEmitter<void>();

  createNewTemplate(): void {
    this.newTemplate.emit();
  }

  canDelete(): boolean {
    return (this.selectedTemplateId || '').length > 0;
  }
}
