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

  constructor() {}

  ngOnInit() {
  }

  onQuillContentChanged(change) {
    // console.log(change);
    this.editContent.script.rawText = change.text;
  }
}
