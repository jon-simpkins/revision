import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {TimelineBlock} from '../../timeline-chart/timeline-chart.component';
import {Tag} from '../../../protos';

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

  metadataStatus = '';
  metadataIcon = '';
  timelineStatus = '';
  timelineIcon = '';

  @Input()
  timelineView: TimelineBlock[] = [];

  @Input()
  relevantTags: Tag[] = [];

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.selectMetadata();
  }

  updateButtons(): void {
    this.metadataStatus = this.isMetadata() ? 'info' : '';
    this.metadataIcon = this.isMetadata() ? 'file-text' : 'file-text-outline';
    this.timelineStatus = this.isTimeline() ? 'info' : '';
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
    console.log('user selected ' + selectedBeatId);
  }

}
