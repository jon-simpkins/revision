import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from 'src/app/services/workspace.service';
import { ActionOption } from 'src/actions/action-option';
import { SYNTHESIS_ACTIONS, ANALYSIS_ACTIONS } from 'src/actions/actions';
import { formatMinutesString } from 'src/storyStructures/utils';
import { ActionService } from 'src/app/services/action.service';
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'view-sequence-page',
  templateUrl: './view-sequence-page.component.html',
  styleUrls: ['./view-sequence-page.component.scss']
})
export class ViewSequencePageComponent implements OnInit {

  getSummaryEditAction: () => ActionOption;
  getBeatEditAction: () => ActionOption;

  constructor(private workspaceSerivce: WorkspaceService, private actionService: ActionService) { }

  ngOnInit() {
    this.getSummaryEditAction = () => new ActionOption(SYNTHESIS_ACTIONS.SUMMARIZE_SEQUENCE, null, null, null, this.getSequenceId());
    this.getBeatEditAction = () => new ActionOption(SYNTHESIS_ACTIONS.SPEC_SUBSTRUCTURE, null, null, null, this.getSequenceId());
  }

  getSummary(): string {
    return this.workspaceSerivce.getCurrentViewSequence().summaryRawText;
  }

  getSequenceId(): string {
    return this.workspaceSerivce.getCurrentViewSequenceId();
  }

  getRuntime(): string {
    let runtimeMin = this.workspaceSerivce.getCurrentViewSequence().durationMin;

    return `${runtimeMin} min`;
  }

  getBeatIds(): string[] {
    return this.workspaceSerivce.getCurrentViewSequence().subStructureElements;
  }

  getBeatDurationString(idx: number): string {
    const template = this.workspaceSerivce.currentWorkspace.structureTemplates.get(
      this.workspaceSerivce.getCurrentViewSequence().templateId
    );

    const originalDuration = template.getBeatDurationMin(idx);
    const scaleFactor = this.workspaceSerivce.getCurrentViewSequence().durationMin / template.getTotalDurationMin();
    return formatMinutesString(originalDuration * scaleFactor);
  }

  getBeatOnelinerLines(beatId: string): string[] {
    if (!beatId) {
      return ['Unspecified Beat'];
    }
    return (this.workspaceSerivce.getCurrentStory().structureElements.get(beatId).oneLiner || '').split('\n');
  }

  navigateToSequence(beatId: string) {
    this.actionService.startAction(
      new ActionOption(ANALYSIS_ACTIONS.VIEW_SEQUENCE_PAGE, null, null, beatId)
    );
  }

}
