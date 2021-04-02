import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-writing-content',
  templateUrl: './writing-content.component.html',
  styleUrls: ['./writing-content.component.scss']
})
export class WritingContentComponent implements OnInit {

  @Input()
  showCard = true;

  @Input()
  editorText = '';

  @Output() hideCard = new EventEmitter<void>();

  @Output() editorTextChanged = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  dismissCard(): void {
    this.hideCard.emit();
  }

  editorTextChange(newText: string): void {
    this.editorTextChanged.emit(newText);
  }
}
