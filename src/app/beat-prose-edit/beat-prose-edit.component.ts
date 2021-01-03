import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Beat} from '../../protos';

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

  constructor() { }

  ngOnInit(): void {
  }

  isEmpty(): boolean {
    return this.beat == null;
  }

  onSynopsisInput(event: any): void {
    const beat = this.beat as Beat;

    beat.synopsis = event.target.value;

    this.onBeatUpdated.emit({
      beat,
      modifiesListView: true,
    } as BeatUpdate);
  }

  onProseChanged(event: any): void {
    const beat = this.beat as Beat;

    beat.prose = event.text;

    this.onBeatUpdated.emit({
      beat,
      modifiesListView: false,
    } as BeatUpdate);
  }
}
