import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TimelineBlock} from '../../timeline-chart/timeline-chart.component';
import {Beat, Tag} from '../../../protos';
import {BeatMetadataUpdate} from '../writing-metadata/writing-metadata.component';

const metadataMode = 'metadataMode';
const timelineMode = 'timelineMode';

@Component({
  selector: 'app-writing-subheader',
  templateUrl: './writing-subheader.component.html',
  styleUrls: ['./writing-subheader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WritingSubheaderComponent implements OnInit {

  currentMode = '';

  metadataSelected = false;
  metadataIcon = '';
  timelineSelected = false;
  timelineIcon = '';

  @Input()
  editingBeat: Beat = new Beat();

  @Input()
  timelineView: TimelineBlock[] = [];

  @Input()
  relevantTags: Tag[] = [];

  @Output() showPreview = new EventEmitter<string>();

  @Output() beatMeatadataUpdates = new EventEmitter<BeatMetadataUpdate>();

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.selectMetadata();
  }

  updateButtons(): void {
    this.metadataSelected = this.isMetadata();
    this.metadataIcon = this.isMetadata() ? 'file-text' : 'file-text-outline';
    this.timelineSelected = this.isTimeline();
    this.timelineIcon = this.isTimeline() ? 'map' : 'map-outline';

    this.ref.markForCheck();
  }

  isMetadata(): boolean {
    return this.currentMode === metadataMode;
  }

  isTimeline(): boolean {
    return this.currentMode === timelineMode;
  }

  selectMetadata(): void {
    this.currentMode = metadataMode;
    this.updateButtons();
  }

  async selectTimeline(): Promise<void> {
    this.currentMode = timelineMode;
    this.updateButtons();
  }

  selectBeat(selectedBeatId: string): void {
    this.showPreview.emit(selectedBeatId);
  }

}
