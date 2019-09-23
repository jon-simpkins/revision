import {Component, Input, OnInit} from '@angular/core';
import {StructureSpecContent} from '../../../../types/ScrapTypes/StructureSpecContent';
import EditContext from '../../../../types/EditContext';
import {StoryStructure, StructureBlock} from '../../../../types/StoryStructure/StoryStructure';
import {StructureTemplateService} from '../../../structure-template.service';

@Component({
  selector: 'structure-edit-panel',
  templateUrl: './structure-edit-panel.component.html',
  styleUrls: ['./structure-edit-panel.component.scss']
})
export class StructureEditPanelComponent implements OnInit {

  @Input() editContent: StructureSpecContent;
  @Input() editContext: EditContext;

  referenceViewOpen = true;

  referenceTemplateId: string;
  referenceTemplate: StoryStructure;

  constructor(public structureTemplateService: StructureTemplateService) { }

  ngOnInit() {
    this.updateReferenceTemplate(this.structureTemplateService.knownStructures[0].id);
  }

  formatDurationSec(secValue: number): string {
    return StructureBlock.convertSecToStr(secValue);
  }

  updateReferenceTemplate(newValue) {
    this.referenceTemplateId = newValue;
    this.refreshReferenceTemplate();
  }

  refreshReferenceTemplate() {
    this.referenceTemplate = this.structureTemplateService.getStructureById(this.referenceTemplateId);
    this.referenceTemplate.rescaleToDuraction(this.editContext.constraints.durationSec);
  }

  copyFromTemplate() {
    this.editContent.storyStructure = this.referenceTemplate.duplicate();
  }

  showReferenceView() {
    this.referenceViewOpen = true;
  }

  hideReferenceView() {
    this.referenceViewOpen = false;
  }

}
