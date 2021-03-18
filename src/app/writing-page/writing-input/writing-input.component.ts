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

  emitProseChange = debounce((newText: string) => {
    console.log('would have emitted');
    console.log(newText);
  }, 200);

  ngOnInit(): void {
  }

  onProseChanged(event: any): void {
    this.currentEditorText = event.text as string;
    this.emitProseChange(this.currentEditorText);
  }

  onSelectionChanged(event: any): void {
    const wasBlur = event.range === null;

    if (wasBlur) {
      this.emitProseChange(this.currentEditorText);
    }
  }
}
