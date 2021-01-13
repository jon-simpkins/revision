import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StructureTemplateListView} from '../structure-template.service';
import {StructureTemplate} from '../../protos';
import {getDurationStr} from '../duration-helpers';
import StructureTemplateBeat = StructureTemplate.StructureTemplateBeat;

// Nav for applying a structure template to a particular beat.
@Component({
  selector: 'app-apply-structure-nav',
  templateUrl: './apply-structure-nav.component.html',
  styleUrls: ['./apply-structure-nav.component.scss'],
})
export class ApplyStructureNavComponent implements OnInit {

  @Input()
  selectedTemplateId = '';

  @Input()
  structureTemplateListView: StructureTemplateListView[] = [];

  @Input()
  rescaledSelectedTemplate: StructureTemplate|null = null;

  @Output() selectTemplate = new EventEmitter<string>();

  @Output() applyTemplate = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  getBeats(): StructureTemplateBeat[] {
    if (!this.rescaledSelectedTemplate) {
      return [];
    }

    return (this.rescaledSelectedTemplate.beats as StructureTemplateBeat[]) || [];
  }

  formatDurationMs(value: number|null|undefined): string {
    if (!value) {
      return '';
    }

    return getDurationStr(value);
  }

}
