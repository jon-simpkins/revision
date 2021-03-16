import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';

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

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.selectMetadata();
  }

  updateButtons(): void {
    console.log(this.currentMode);
    console.log(this.metadataStatus);

    this.metadataStatus = (this.currentMode === metadataMode) ? 'info' : '';
    this.metadataIcon = (this.currentMode === metadataMode) ? 'file-text' : 'file-text-outline';
    this.timelineStatus = (this.currentMode === timelineMode) ? 'info' : '';
    this.timelineIcon = (this.currentMode === timelineMode) ? 'map' : 'map-outline';

    this.ref.markForCheck();
  }

  selectMetadata(): void {
    this.currentMode = metadataMode;
    this.updateButtons();
  }

  selectTimeline(): void {
    this.currentMode = timelineMode;
    this.updateButtons();
  }
}
