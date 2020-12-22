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
  canDelete: boolean = false;

  @Input()
  structureTemplateListView: StructureTemplateListView[] = [];

  @Output() newTemplate = new EventEmitter<void>();

  @Output() selectTemplate = new EventEmitter<string>();

  createNewTemplate(): void {
    this.newTemplate.emit();
  }
}
