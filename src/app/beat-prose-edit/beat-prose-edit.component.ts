import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Beat} from '../../protos';

import {debounce} from 'debounce';
import {getDurationStr} from '../duration-helpers';
import Completeness = Beat.Completeness;

export interface BeatUpdate {
  beat: Beat;
  modifiesListView: boolean;
}

interface CompletenessOption {
  value: number;
  label: string;
}

@Component({
  selector: 'app-beat-prose-edit',
  templateUrl: './beat-prose-edit.component.html',
  styleUrls: ['./beat-prose-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BeatProseEditComponent implements OnInit {

  constructor() { }

  @Input()
  beat: Beat|null = null;

  @Input()
  childSumDuration = 0;

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

  onDurationInput = debounce((event: any) => {
    const beat = this.beat as Beat;

    const durationStr = event.target.value as string;
    let parseDurationSec;

    const splitDurationStr = durationStr.split(':');
    if (splitDurationStr.length === 1) {
      parseDurationSec = parseInt(splitDurationStr[0], 10) * 60;
    } else {
      parseDurationSec = parseFloat(splitDurationStr[1]) + 60 * parseInt(splitDurationStr[0], 10);
    }

    if (isNaN(parseDurationSec) || splitDurationStr.length > 2) {
      return;
    }

    beat.intendedDurationMs = 1000 * parseDurationSec;

    this.onBeatUpdated.emit({
      beat,
      modifiesListView: true
    } as BeatUpdate);
  }, 200);

  completenessOptions: CompletenessOption[] = [
      {
        value: Completeness.NOT_STARTED,
        label: 'Not Started'
      },
      {
        value: Completeness.BRAINSTORM,
        label: 'Brainstorm'
      },
      {
        value: Completeness.INITIAL_DRAFT,
        label: 'Initial Draft'
      },
      {
        value: Completeness.POLISHED,
        label: 'Polished'
      },
      {
        value: Completeness.FINAL,
        label: 'Final'
      }
    ] as CompletenessOption[];

  ngOnInit(): void {
  }

  isEmpty(): boolean {
    return this.beat == null;
  }

  getBeatDurationStr(): string {
    const beat = this.beat as Beat;

    return getDurationStr(beat.intendedDurationMs);
  }

  shouldShowChildSumDuration(): boolean {
    return this.childSumDuration > 0;
  }

  getChildSumDurationStr(): string {
    return '(' + getDurationStr(this.childSumDuration) + ') from children';
  }

  onCompletenessChange(newValue: any): void {
    const beat = this.beat as Beat;
    beat.completeness = newValue;
    this.onBeatUpdated.emit({
      beat,
      modifiesListView: true
    } as BeatUpdate);
  }
}
