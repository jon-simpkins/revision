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

  constructor() { }

  ngOnInit() {
  }

  sendPlaintextEdit(newText) {
    this.editContent.script.rawText = newText;
  }
}
