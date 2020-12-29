import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TagListView} from '../../tag.service';

@Component({
  selector: 'app-tag-nav',
  templateUrl: './tag-nav.component.html',
  styleUrls: ['./tag-nav.component.scss']
})
export class TagNavComponent implements OnInit {

  @Input()
  selectedTagId = '';

  @Input()
  tagListView: TagListView[] = [];

  @Output() newTag = new EventEmitter<void>();

  @Output() selectTag = new EventEmitter<string>();

  @Output() deleteTag = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  createNewTemplate(): void {
    this.newTag.emit();
  }

  canDelete(): boolean {
    return this.selectedTagId.length > 0;
  }
}
