import { Component, OnInit } from '@angular/core';
import { ActionOption } from 'src/actions/action-option';
import { ANALYSIS_ACTIONS } from 'src/actions/actions';
import { WorkspaceService } from 'src/app/services/workspace.service';
import { PlotStructureElement, PlotTemplateBeat, PlotTemplate } from 'src/storyStructures';

@Component({
  selector: 'spec-substructure-page',
  templateUrl: './spec-substructure-page.component.html',
  styleUrls: ['./spec-substructure-page.component.scss']
})
export class SpecSubstructurePageComponent implements OnInit {
  getStoryViewAction: () => ActionOption;
  getViewSequenceAction: () => ActionOption;
  getUpdateTemplateAction: () => ActionOption;

  currentSelectedTemplateId: string; // Which structure template ID is currently selected

  constructor(private workspaceService: WorkspaceService) { }

  ngOnInit() {
    this.getStoryViewAction = () => new ActionOption(ANALYSIS_ACTIONS.STORY_VIEW_PAGE);
    this.getViewSequenceAction = () => new ActionOption(ANALYSIS_ACTIONS.VIEW_SEQUENCE_PAGE,
      null,
      null,
      this.getSequenceId()
    );
    this.getUpdateTemplateAction = () => new ActionOption(ANALYSIS_ACTIONS.STRUCTURE_ANALYSIS);

    this.currentSelectedTemplateId = this.getSequence().templateId;
  }

  getSequenceId(): string {
    return this.workspaceService.getCurrentEditSequenceId();
  }

  getSequence(): PlotStructureElement {
    return this.workspaceService.getCurrentStory().structureElements.get(this.getSequenceId());
  }

  changeSelectedTemplate(e) {
    this.currentSelectedTemplateId = e;
  }

  getTemplateMap() {
    return this.workspaceService.currentWorkspace.structureTemplates;
  }

  getTemplate(): PlotTemplate {
    return this.getTemplateMap().get(this.getSequence().templateId);
  }

  getCurrentTemplateStr(): string {
    if (!!this.getSequence().templateId && this.getTemplateMap().has(this.getSequence().templateId)) {
      return this.getTemplateMap().get(this.getSequence().templateId).oneLiner;
    }

    return 'none';
  }

  getTemplateBeats(): PlotTemplateBeat[] {
    if (!!this.getSequence().templateId) {
      return this.getTemplateMap().get(this.getSequence().templateId).beats;
    }

    return [];
  }

  applyTemplate() {
    const template = this.getTemplateMap().get(this.currentSelectedTemplateId);

    this.getSequence().subStructureElements.forEach((beatId, idx) => {
      this.getDeleteSubsequenceCallback(idx)();
    })

    this.getSequence().subStructureElements = [];
    template.beats.forEach(beat => {
      // Add beat with no assignment
      this.getSequence().subStructureElements.push(null);
    });

    this.getSequence().templateId = this.currentSelectedTemplateId;
  }

  getTemplateBeatDurationMin(idx: number): number {
    const originalDuration = this.getTemplate().getBeatDurationMin(idx);
    const scaleFactor = this.getSequence().durationMin / this.getTemplate().getTotalDurationMin();
    return originalDuration * scaleFactor;
  }

  getAttachSubsequenceCallback(idx: number): (newSequenceId: string) => void {
    return (newSequenceId: string) => {
      this.workspaceService.getCurrentStory().structureElements.get(newSequenceId).parentId = this.getSequenceId();
      this.workspaceService.getCurrentStory().structureElements.get(newSequenceId).durationMin = this.getTemplateBeatDurationMin(idx);
      this.getSequence().subStructureElements[idx] = newSequenceId;
    }
  }

  getDeleteSubsequenceCallback(idx: number): () => void {
    const idToDelete = this.getSequence().subStructureElements[idx];
    if (!idToDelete) {
      return () => { }; // Beat may have been empty
    }

    return () => {
      // Mark this beat as un-owned by a parent
      this.workspaceService.getCurrentStory().structureElements.get(idToDelete).parentId = null;
      this.getSequence().subStructureElements[idx] = null;
    }
  }

  getSubsequenceId(idx: number): string {
    return this.getSequence().subStructureElements[idx];
  }

  hasAnyTemplates(): boolean {
    return !!this.workspaceService.currentWorkspace.structureTemplates.size;
  }

}
