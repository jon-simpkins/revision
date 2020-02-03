import { Component, Input, AfterViewInit, ViewEncapsulation } from '@angular/core';

import * as uuid from 'uuid/v4';
import * as Quill from 'quill';
import Delta from 'quill-delta/dist/Delta';
import { FountainElements } from 'src/app/story-details/edit-panel-content/script-edit-panel/FountainElements';

@Component({
  selector: 'quill-editor',
  templateUrl: './quill-editor.component.html',
  styleUrls: ['./quill-editor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QuillEditorComponent implements AfterViewInit {

  @Input() initialRawText: string;
  @Input() changeCallback: (newRawText: string) => void;
  @Input() readOnlyMode: boolean;

  editor: Quill;
  editorId = 'quill' + uuid().replace('-', '');

  rawText: string;
  formattedContent = [];

  constructor() { }

  ngOnChanges() {
    if (this.readOnlyMode) {
      this.rawText = this.initialRawText || '';
      this.updatePageCountAndFormatText();
    }
  }

  ngAfterViewInit() {

    this.rawText = this.initialRawText || '';

    this.editor = new Quill(`#${this.editorId}`, {
      theme: 'snow',
      readOnly: !!this.readOnlyMode,
      modules: {
        toolbar: '', // Set this to the id of the toolbar to use

      }
    });

    this.updatePageCountAndFormatText();
    this.editor.focus();

    this.editor.on('text-change', (delta: Delta, oldDelta: Delta, source) => {
      if (source === 'user') {
        let startIndex = 0;
        if (delta.ops[0] && delta.ops[0].retain) {
          startIndex = delta.ops[0].retain;
        }
        if (delta.ops.length === 1 && delta.ops[0].insert && typeof (delta.ops[0].insert) === 'string') {
          startIndex = delta.ops[0].insert.length;
        }
        if (delta.ops[1] && delta.ops[1].insert && typeof (delta.ops[1].insert) === 'string') {
          startIndex += delta.ops[1].insert.length;
        }

        const completeDelta = oldDelta.compose(delta);

        this.rawText = completeDelta.map((lineDelta) => {
          return lineDelta.insert;
        }).join('');
        this.changeCallback(this.rawText);

        // Allow Quill to complete whatever synchronous stuff it's doing
        setTimeout(() => {
          this.updatePageCountAndFormatText();
          this.editor.update('silent');
          this.editor.setSelection(startIndex, 0, 'silent');
        }, 1);
      }
    });
  }

  updatePageCountAndFormatText() {
    const parsedScript = FountainElements.fromFullText(
      this.rawText
        .replace(/\n$/, ''), // Remove the mandatory trailing newline (we'll add it back))
    );

    //this.pageCount = parsedScript.getEstimatedPageCount();
    this.formattedContent = parsedScript.getQuillDeltas(
      new Map<string, object>(),
      new Map<string, object>()
    );

    this.editor.setContents(this.formattedContent);
  }

}
