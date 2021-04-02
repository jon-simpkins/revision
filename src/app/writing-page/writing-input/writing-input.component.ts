import { Component, OnInit } from '@angular/core';

import {debounce} from 'debounce';

@Component({
  selector: 'app-writing-input',
  templateUrl: './writing-input.component.html',
  styleUrls: ['./writing-input.component.scss']
})
export class WritingInputComponent implements OnInit {

  constructor() { }

  initialEditorText = 'this is some\n\n\nstuff!';

  currentEditorText = '';

  isFocused = false;

  emitProseChange = debounce((newText: string) => {
    console.log('would have emitted');
    console.log(newText);
  }, 200);

  ngOnInit(): void {
    this.currentEditorText = this.initialEditorText;
  }

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
