import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TimelineBlock} from '../../timeline-chart/timeline-chart.component';
import {Beat, Tag} from '../../../protos';
import {BeatMetadataUpdate} from '../writing-metadata/writing-metadata.component';

const collapsedMode = 'collapsedMode';
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

  isCollapsed = false;
  metadataSelected = false;
  timelineSelected = false;

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
    this.timelineSelected = this.isTimeline();

    this.ref.markForCheck();
  }

  isMetadata(): boolean {
    return this.currentMode === metadataMode;
  }

  isTimeline(): boolean {
    return this.currentMode === timelineMode;
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  selectMetadata(): void {
    this.currentMode = metadataMode;
    this.updateButtons();
  }

  selectTimeline(): void {
    this.currentMode = timelineMode;
    this.updateButtons();
  }

  selectBeat(selectedBeatId: string): void {
    this.showPreview.emit(selectedBeatId);
  }

}
