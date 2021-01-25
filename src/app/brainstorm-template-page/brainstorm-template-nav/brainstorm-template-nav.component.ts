import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BrainstormTemplateListView} from '../../brainstorm-template.service';

@Component({
  selector: 'app-brainstorm-template-nav',
  templateUrl: './brainstorm-template-nav.component.html',
  styleUrls: ['./brainstorm-template-nav.component.scss']
})
export class BrainstormTemplateNavComponent implements OnInit {

  @Input()
  selectedTemplateId = '';

  @Input()
  brainstormTemplateListView: BrainstormTemplateListView[] = [];

  @Output() newTemplate = new EventEmitter<void>();

  @Output() selectTemplate = new EventEmitter<string>();

  @Output() deleteTemplate = new EventEmitter<void>();

  @Output() generateStandardTemplates = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  createNewTemplate(): void {
    this.newTemplate.emit();
  }

  canDelete(): boolean {
    return (this.selectedTemplateId || '').length > 0;
  }
}
