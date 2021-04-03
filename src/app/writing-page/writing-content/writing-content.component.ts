import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Beat} from '../../../protos';

@Component({
  selector: 'app-writing-content',
  templateUrl: './writing-content.component.html',
  styleUrls: ['./writing-content.component.scss']
})
export class WritingContentComponent implements OnInit {

  @Input()
  referenceBeat: Beat|null = null;

  @Input()
  editorText = '';

  @Output() hideCard = new EventEmitter<void>();

  @Output() editorTextChanged = new EventEmitter<string>();

  @Output() goToReference = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  showCard(): boolean {
    return this.referenceBeat != null;
  }

  dismissCard(): void {
    this.hideCard.emit();
  }

  editorTextChange(newText: string): void {
    this.editorTextChanged.emit(newText);
  }

  referenceSynopsis(): string {
    return this.referenceBeat?.synopsis || '';
  }

  referenceProse(): string {
    return this.referenceBeat?.prose || '';
  }
}
