import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';

import {debounce} from 'debounce';

@Component({
  selector: 'app-writing-input',
  templateUrl: './writing-input.component.html',
  styleUrls: ['./writing-input.component.scss']
})
export class WritingInputComponent implements OnInit {

  constructor() { }

  @Input()
  currentEditorText = '';

  @Output() editorTextChanged = new EventEmitter<string>();

  isFocused = false;

  emitProseChange = debounce((newText: string) => {
    this.editorTextChanged.emit(newText);
  }, 200);

  ngOnInit(): void {}

  onProseChanged(event: any): void {
    this.currentEditorText = event.target.value as string;
    this.emitProseChange(this.currentEditorText);
  }

  onKeyDown(event: KeyboardEvent): boolean {
    if (event.key === 'Tab') {
      document.execCommand('insertText', false, '\t');
      return false;
    }

    return true;
  }

  onFocus(): void {
    this.isFocused = true;
  }

  onBlur(): void {
    this.isFocused = false;
    this.emitProseChange(this.currentEditorText);
  }
}
