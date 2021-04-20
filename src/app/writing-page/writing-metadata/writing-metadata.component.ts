import {ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Beat} from '../../../protos';
import {getDurationStr} from '../../duration-helpers';
import Completeness = Beat.Completeness;

interface CompletenessOption {
  value: number;
  label: string;
}

export interface BeatMetadataUpdate {
  updatedBeat: Beat;
  modifiesListView: boolean;
}

@Component({
  selector: 'app-writing-metadata',
  templateUrl: './writing-metadata.component.html',
  styleUrls: ['./writing-metadata.component.scss']
})
export class WritingMetadataComponent implements OnInit, OnChanges {

  @Input()
  editingBeat: Beat = new Beat();

  @Output() beatMeatadataUpdates = new EventEmitter<BeatMetadataUpdate>();

  duratationStrErrorStage = true;
  durationStr = '';

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

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    const currentParsedDurationMs = this.determineDurationValue(this.durationStr);
    if (this.editingBeat.intendedDurationMs !== currentParsedDurationMs) {
      this.durationStr = this.getBeatDurationStr();
      this.duratationStrErrorStage = false;
      this.ref.markForCheck();
    }
  }

  onSynopsisChange(event: any): void {
    const newSynopsis = event.target.value;

    const updatedBeat = this.editingBeat;
    updatedBeat.synopsis = newSynopsis;

    this.beatMeatadataUpdates.emit({
      updatedBeat,
      modifiesListView: true,
    } as BeatMetadataUpdate);
  }

  onDurationChange(event: any): void {
    const durationStr = event.target.value as string;

    const newDurationMs = this.determineDurationValue(durationStr);

    if (isNaN(newDurationMs)) {
      this.duratationStrErrorStage = true;
      this.ref.markForCheck();
      return;
    } else {
      this.duratationStrErrorStage = false;
    }

    const updatedBeat = this.editingBeat;
    updatedBeat.intendedDurationMs = newDurationMs;

    this.beatMeatadataUpdates.emit({
      updatedBeat,
      modifiesListView: true,
    } as BeatMetadataUpdate);

    this.ref.markForCheck();
  }

  determineDurationValue(durationStr: string): number {
    let parseDurationSec;

    const splitDurationStr = durationStr.split(':');
    if (splitDurationStr.length === 1) {
      parseDurationSec = parseInt(splitDurationStr[0], 10) * 60;
    } else {
      parseDurationSec = parseFloat(splitDurationStr[1]) + 60 * parseInt(splitDurationStr[0], 10);
    }

    if (isNaN(parseDurationSec) || splitDurationStr.length > 2) {
      return NaN;
    }

    return 1000 * parseDurationSec;
  }

  onDurationBlur(): void {
    this.durationStr = this.getBeatDurationStr();
    this.duratationStrErrorStage = false;
    this.ref.markForCheck();
  }

  getBeatDurationStr(): string {
    return getDurationStr(this.editingBeat.intendedDurationMs);
  }

  onCompletenessChange(event: any): void {
    const updatedBeat = this.editingBeat;
    updatedBeat.completeness = parseInt(event.target.value, 10);

    this.beatMeatadataUpdates.emit({
      updatedBeat,
      modifiesListView: true,
    } as BeatMetadataUpdate);

    this.ref.markForCheck();
  }
}
