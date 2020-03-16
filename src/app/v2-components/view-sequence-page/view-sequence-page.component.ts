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
  getParentSequenceAction: () => ActionOption;
  getTimelineAction: () => ActionOption;
  getCharacterAction: () => ActionOption;

  constructor(private workspaceSerivce: WorkspaceService, private actionService: ActionService) { }

  ngOnInit() {
    this.getSummaryEditAction = () => new ActionOption(SYNTHESIS_ACTIONS.SUMMARIZE_SEQUENCE, null, null, this.getSequenceId());
    this.getBeatEditAction = () => new ActionOption(SYNTHESIS_ACTIONS.SPEC_SUBSTRUCTURE, null, null, this.getSequenceId());
    this.getParentSequenceAction = () => {
      return new ActionOption(ANALYSIS_ACTIONS.VIEW_SEQUENCE_PAGE, null, this.workspaceSerivce.getCurrentStory().structureElements.get(this.getSequenceId()).parentId)
    }
    this.getTimelineAction = () => new ActionOption(ANALYSIS_ACTIONS.VIEW_FULL_TIMELINE);
    this.getCharacterAction = () => new ActionOption(SYNTHESIS_ACTIONS.IDENTIFY_CHARACTERS_IN_SEQUENCE, null, null, this.getSequenceId());
  }

  getSummary(): string {
    return this.workspaceSerivce.getCurrentViewSequence().summaryRawText;
  }

  getSequenceId(): string {
    return this.workspaceSerivce.getCurrentViewEntityId();
  }

  getRuntime(): string {
    let runtimeMin = this.workspaceSerivce.getCurrentViewSequence().durationMin;

    return formatMinutesString(runtimeMin);
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

  hasParent(): boolean {
    return !!this.workspaceSerivce.getCurrentViewSequence().parentId;
  }

  isMasterSequence(): boolean {
    return this.workspaceSerivce.getCurrentStory().plotElementId === this.getSequenceId();
  }

  getOneLinerLines(): string[] {
    return (this.workspaceSerivce.getCurrentViewSequence().oneLiner || '').split('\n');
  }

  getCharacterIds(): string[] {
    return this.workspaceSerivce.getCurrentViewSequence().characterAppearances || [];
  }

  getCharacterName(characterId: string): string {
    return this.workspaceSerivce.getCurrentStory().characters.get(characterId).getName();
  }
}