import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Beat, Tag} from '../../protos';
import TagReference = Beat.TagReference;

@Component({
  selector: 'app-apply-tag-nav',
  templateUrl: './apply-tag-nav.component.html',
  styleUrls: ['./apply-tag-nav.component.scss']
})
export class ApplyTagNavComponent implements OnInit {

  @Input()
  tagMap: Map<string, Tag>|null = null;

  @Input()
  tagReferences: TagReference[] = [];

  @Output() updateTagUses = new EventEmitter<TagReference[]>();

  constructor() { }

  ngOnInit(): void {
  }

}
