import {Component, Input, OnInit, AfterViewInit, ViewEncapsulation} from '@angular/core';
import EditContext from '../../../../types/EditContext';
import {ScriptContent} from '../../../../types/ScrapTypes/ScriptContent';

import * as Quill from 'quill';
import Delta from 'quill-delta/dist/Delta';

import {FountainElements} from './FountainElements';
import CharacterBlot from './CharacterBlot';

@Component({
  selector: 'script-edit-panel',
  templateUrl: './script-edit-panel.component.html',
  styleUrls: ['./script-edit-panel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ScriptEditPanelComponent implements OnInit, AfterViewInit {

  @Input() editContent: ScriptContent;
  @Input() editContext: EditContext;

  wordCount = 0;
  pageCount = 0;

  formattedContent = [];
  editor: Quill;

  editorId = 'editorId' + Date.now();

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.editor = new Quill(`#${this.editorId}`, {
      theme: 'snow',
      modules: {
        toolbar: `#${this.editorId}-toolbar`
      }
    });

    Quill.register({'formats/character': CharacterBlot}, true);

    this.updateWordCount();
    this.updatePageCountAndFormatText();
    this.editor.setContents(this.formattedContent);
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

        this.editContent.script.rawText = completeDelta.map((lineDelta) => {
          return lineDelta.insert;
        }).join('');
        this.updateWordCount();
        this.updatePageCountAndFormatText();

        // Allow Quill to complete whatever synchronous stuff it's doing
        setTimeout(() => {
          this.editor.setContents(this.formattedContent);
          this.editor.update('silent');
          this.editor.setSelection(startIndex, 0, 'silent');
        }, 1);
      }
    });
  }

  updateWordCount() {
    this.wordCount = this.editContent.script.rawText.split(/\w+/).length - 1;
  }

  updatePageCountAndFormatText() {
    const parsedScript = FountainElements.fromFullText(
      this.editContent.script.rawText
        .replace(/\n$/, ''), // Remove the mandatory trailing newline (we'll add it back))
      this.editContext.characterMap
    );

    this.pageCount = parsedScript.getEstimatedPageCount();
    this.formattedContent = parsedScript.getQuillDeltas();
  }
}
