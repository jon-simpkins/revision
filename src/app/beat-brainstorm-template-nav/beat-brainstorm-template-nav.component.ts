import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BrainstormTemplateListView} from '../brainstorm-template.service';
import {BrainstormTemplate} from '../../protos';

@Component({
  selector: 'app-beat-brainstorm-template-nav',
  templateUrl: './beat-brainstorm-template-nav.component.html',
  styleUrls: ['./beat-brainstorm-template-nav.component.scss']
})
export class BeatBrainstormTemplateNavComponent implements OnInit {

  @Input()
  selectedTemplateId = '';

  @Input()
  brainstormTemplateListView: BrainstormTemplateListView[] = [];

  @Input()
  selectedBrainstormTemplate: BrainstormTemplate|null = null;

  @Output() selectTemplate = new EventEmitter<string>();

  @Output() applyTemplate = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

}
