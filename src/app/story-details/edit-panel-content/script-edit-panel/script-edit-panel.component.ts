import {Component, Input, OnInit} from '@angular/core';
import EditContext from '../../../../types/EditContext';
import {ScriptContent} from '../../../../types/ScrapTypes/ScriptContent';

@Component({
  selector: 'script-edit-panel',
  templateUrl: './script-edit-panel.component.html',
  styleUrls: ['./script-edit-panel.component.scss']
})
export class ScriptEditPanelComponent implements OnInit {

  @Input() editContent: ScriptContent;
  @Input() editContext: EditContext;
  quillModules = {
    toolbar: []
  };

  wordCount = 0;

  constructor() {}

  ngOnInit() {
    this.updateWordCount();
  }

  onQuillContentChanged(change) {
    // console.log(change);
    this.editContent.script.rawText = change.text;
    this.updateWordCount();
  }

  setFocus(editor) {
    editor.focus();
  }

  updateWordCount() {
    this.wordCount = this.editContent.script.rawText.split(/\w+/).length - 1;
  }

}
