import {Component, EventEmitter, OnInit, Input, Output} from '@angular/core';

@Component({
  selector: 'app-beat-action-nav',
  templateUrl: './beat-action-nav.component.html',
  styleUrls: ['./beat-action-nav.component.scss']
})
export class BeatActionNavComponent implements OnInit {

  @Input()
  selectedTabIndex = 0;

  @Output() tabIndexChange = new EventEmitter<number>();

  collapsed = false;

  constructor() { }

  ngOnInit(): void {
  }

  onInputChange(event: any): void {
    this.tabIndexChange.emit(event as number);
  }

}
