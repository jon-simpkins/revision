import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Beat} from '../../protos';

import {debounce} from 'debounce';

export interface BeatUpdate {
  beat: Beat;
  modifiesListView: boolean;
}

@Component({
  selector: 'app-beat-prose-edit',
  templateUrl: './beat-prose-edit.component.html',
  styleUrls: ['./beat-prose-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BeatProseEditComponent implements OnInit {

  @Input()
  beat: Beat|null = null;

  @Output() onBeatUpdated = new EventEmitter<BeatUpdate>();

  onSynopsisInput = debounce((event: any) => {
    const beat = this.beat as Beat;

    beat.synopsis = event.target.value;

    this.onBeatUpdated.emit({
      beat,
      modifiesListView: true,
    } as BeatUpdate);
  }, 200);

  onProseChanged = debounce((event: any) => {
    const beat = this.beat as Beat;

    beat.prose = event.text;

    this.onBeatUpdated.emit({
      beat,
      modifiesListView: false,
    } as BeatUpdate);
  }, 200);

  constructor() { }

  ngOnInit(): void {
  }

  isEmpty(): boolean {
    return this.beat == null;
  }

}
