import { Component, OnInit } from '@angular/core';
import TimelineBlock from 'src/types/TimelineBlock';
import { ActionOption } from 'src/actions/action-option';
import { ANALYSIS_ACTIONS } from 'src/actions/actions';
import { WorkspaceService } from 'src/app/services/workspace.service';
import { PlotStructureElement } from 'src/storyStructures';

@Component({
  selector: 'timeline-page',
  templateUrl: './timeline-page.component.html',
  styleUrls: ['./timeline-page.component.scss']
})
export class TimelinePageComponent implements OnInit {

  timelineBlocks: TimelineBlock[];
  hasTimeline: boolean;

  constructor(private workspaceService: WorkspaceService) {
    this.timelineBlocks = [];

    if (workspaceService.getCurrentStory().plotElementId) {
      this.hasTimeline = true;

      this.parsePlotElement(workspaceService.getCurrentStory().plotElementId, 0, 0);

      this.timelineBlocks = this.sortTimelineBlocksAndAppendDepth(this.timelineBlocks);
    } else {
      this.hasTimeline = false;
    }
  }

  parsePlotElement(beatId: string, startSec: number, depth: number) {
    if (!beatId) {
      return;
    }
    
    const beat = this.workspaceService.getCurrentStory().structureElements.get(beatId);
    this.timelineBlocks.push(TimelineBlock.buildNew(
      'Plot',
      '',
      startSec,
      startSec + (beat.durationMin * 60),
      new ActionOption(ANALYSIS_ACTIONS.VIEW_SEQUENCE_PAGE, null, null, beatId),
      depth,
      true
    ));

    if (!beat.templateId) {
      return;
    }

    const template = this.workspaceService.currentWorkspace.structureTemplates.get(beat.templateId);
    const scaleFactor = beat.durationMin / template.getTotalDurationMin();

    let startOffsetSec = 0;
    beat.subStructureElements.forEach((subBeatId, idx) => {
      this.parsePlotElement(subBeatId, startSec + startOffsetSec, depth + 1);
      startOffsetSec += (template.getBeatDurationMin(idx) * scaleFactor) * 60;
    });
  }

  sortTimelineBlocksAndAppendDepth(timelineBlocks: TimelineBlock[]): TimelineBlock[] {

    // Only for blocks where depth is appended, make sure larger depths are later in the array
    timelineBlocks = timelineBlocks.sort((a, b) => {
      if (a.appendDepthToLabel && b.appendDepthToLabel) {
        return a.depth - b.depth;
      } else {
        return 1;
      }
    });

    timelineBlocks = timelineBlocks.map((block: TimelineBlock) => {
      if (block.appendDepthToLabel) {
        block.rowLabel = `${block.rowLabel}: Depth ${block.depth}`;
        block.blockLabel = block.rowLabel;
      }
      return block;
    });

    return timelineBlocks;
  }


  ngOnInit() {
  }

}
