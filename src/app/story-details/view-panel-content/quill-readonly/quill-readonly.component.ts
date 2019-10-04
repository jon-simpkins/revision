import {Component, Input, OnInit, OnChanges, AfterViewInit} from '@angular/core';

import * as uuid from 'uuid/v4';
import * as Quill from 'quill';

@Component({
  selector: 'quill-readonly',
  templateUrl: './quill-readonly.component.html',
  styleUrls: ['./quill-readonly.component.scss']
})
export class QuillReadonlyComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() plaintext: string;

  contentToShow;

  editor: Quill;

  editorId = 'editorId' + uuid().replace('-', '');

  constructor() { }

  buildContentToShow() {
    this.contentToShow = [{
      insert: this.plaintext
    }]; // TODO: parse script formatting appropriately
  }

  ngOnInit() {
    this.buildContentToShow();
  }

  ngOnChanges() {
    this.buildContentToShow();
    if (this.editor) {
      this.editor.setContents(this.contentToShow);
    }
  }

  ngAfterViewInit() {
    this.editor = new Quill(`#${this.editorId}`, {
      theme: 'snow',
      readOnly: true,
      modules: {
        toolbar: false
      }
    });

    this.editor.setContents(this.contentToShow);
  }

}
