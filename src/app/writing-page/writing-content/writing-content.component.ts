import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-writing-content',
  templateUrl: './writing-content.component.html',
  styleUrls: ['./writing-content.component.scss']
})
export class WritingContentComponent implements OnInit {

  @Input()
  showCard = true;

  @Output() hideCard = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  dismissCard(): void {
    this.hideCard.emit();
  }
}
