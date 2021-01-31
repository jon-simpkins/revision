import {Component, EventEmitter, AfterViewInit, Input, Output, OnInit, OnChanges} from '@angular/core';
import {getDurationStr} from '../duration-helpers';
import {Beat, Tag} from '../../protos';
import Completeness = Beat.Completeness;
import TagReference = Beat.TagReference;

export interface TimelineBlock {
  id: string;
  startSec: number;
  endSec: number;
  label: string;
  depth: number;
  completeness: Completeness;
  tagReferences: TagReference[];
}

interface PreppedTimelineBlock {
  id: string;
  width: number;
  left: number;
  color: string;
  label: string;
}

interface TimelineMarker {
  left: number;
  label: string;
}

@Component({
  selector: 'app-timeline-chart',
  templateUrl: './timeline-chart.component.html',
  styleUrls: ['./timeline-chart.component.scss']
})
export class TimelineChartComponent implements OnInit, OnChanges {

  @Input()
  timelineBlocks: TimelineBlock[] = [];

  @Input()
  relevantTags: Tag[] = [];

  @Output() selectBeat = new EventEmitter<string>();

  zoomLevel = 100;

  preppedTimelineBlockRows: PreppedTimelineBlock[][] = [];
  preppedTimelineMarkers: TimelineMarker[] = [];
  minTimeSec = 0;
  maxTimeSec = 0;

  selectedTagId = '';
  selectedTag: Tag|null = null;

  constructor() {}

  ngOnInit(): void {
    this.rebuildTimeline();
  }

  ngOnChanges(): void {
    this.rebuildTimeline();
  }

  rebuildTimeline(): void {
    if (!this.timelineBlocks.length) {
      return;
    }

    this.minTimeSec = this.timelineBlocks[0].startSec;
    this.maxTimeSec = this.timelineBlocks[0].endSec;

    this.timelineBlocks.forEach((block) => {
      this.minTimeSec = Math.min(block.startSec, this.minTimeSec);
      this.maxTimeSec = Math.max(block.endSec, this.maxTimeSec);
    });

    const depthMap = new Map<number, PreppedTimelineBlock[]>();

    this.timelineBlocks.forEach((block) => {
      if (!depthMap.has(block.depth)) {
        depthMap.set(block.depth, []);
      }

      const width = (block.endSec - block.startSec) / (this.maxTimeSec - this.minTimeSec) * 100;
      const left = (block.startSec - this.minTimeSec)  / (this.maxTimeSec - this.minTimeSec) * 100;

      const relevantTagRef = block.tagReferences
        .filter((reference) => reference.tagId === this.selectedTagId)[0] || null;

      let color = '#ccc';
      if (!this.selectedTag) {
        switch (block.completeness) {
          case Beat.Completeness.FINAL:
            color = 'rgb(0, 128, 0)';
            break;
          case Beat.Completeness.POLISHED:
            color = 'rgb(173, 255, 47)';
            break;
          case Beat.Completeness.INITIAL_DRAFT:
            color = 'rgb(255, 255, 0)';
            break;
          case Beat.Completeness.BRAINSTORM:
            color = 'rgb(255, 128, 0)';
            break;
          case Beat.Completeness.NOT_STARTED:
            color = 'rgb(255, 0, 0)';
            break;
        }
      } else {
        if (!!relevantTagRef) {
          color = '#ff0000';
        }
      }

      let label = block.label;
      if (!!relevantTagRef && (relevantTagRef.numericValue || relevantTagRef?.enumValue)) {
        if (relevantTagRef.numericValue) {
          label += ' (' + relevantTagRef.numericValue + ')';
        }
        if (relevantTagRef.enumValue) {
          label += ' (' + (this.selectedTag as Tag).enumValues[relevantTagRef.enumValue - 1].label + ')';
        }
      }


      depthMap.get(block.depth)?.push({
        id: block.id,
        width,
        left,
        color,
        label
      } as PreppedTimelineBlock);
    });

    const newRows: PreppedTimelineBlock[][] = [];

    const allDepths = Array.from(depthMap.keys()).sort();
    allDepths.forEach((depth) => {
      newRows.push(depthMap.get(depth) as PreppedTimelineBlock[]);
    });

    this.preppedTimelineBlockRows = newRows;

    this.rebuildTimelineMarkers();
  }

  rebuildTimelineMarkers(): void {
    const numMarkers = Math.round(this.zoomLevel / 25);
    this.preppedTimelineMarkers = [];
    for (let i = 0; i < numMarkers; i++) {
      const time = (i / numMarkers) * 0.9 * (this.maxTimeSec - this.minTimeSec) + this.minTimeSec;
      const left = 100 * (i / numMarkers);
      this.preppedTimelineMarkers.push({
        left,
        label: getDurationStr(time * 1000),
      } as TimelineMarker);
    }
  }

  zoomOut(): void {
    this.zoomLevel = Math.max(100, this.zoomLevel / 2);
    this.rebuildTimelineMarkers();
  }

  zoomIn(): void {
    this.zoomLevel = 2.0 * this.zoomLevel;
    this.rebuildTimelineMarkers();
  }

  formatPercentString(value: number): string {
    return '' + value + '%';
  }

  tagSelectionChange(value: string): void {
    this.selectedTagId = value;
    this.selectedTag = this.relevantTags.filter((tag) => tag.id === value)[0] || null;
    this.rebuildTimeline();
  }
}
