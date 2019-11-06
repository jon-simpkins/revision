import {Component, Input, OnInit} from '@angular/core';
import {StructureSpecContent} from '../../../../types/ScrapTypes/StructureSpecContent';
import EditContext from '../../../../types/EditContext';
import {StoryStructure, StructureBlock} from '../../../../types/StoryStructure/StoryStructure';
import {StructureTemplateService} from '../../../services/structure-template.service';
import {MatSnackBar} from '@angular/material/snack-bar';

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

  sliderSec = 0; // Time in sec for the timeline slider

  constructor(public structureTemplateService: StructureTemplateService, private snackBar: MatSnackBar) { }

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
    this.referenceTemplate.rescaleToDuraction(this.getSequenceDuration());
  }

  getSequenceDuration() {
    return this.editContext.constraints.durationSec;
  }

  onUpdateTimelineSlider(newFractionValue) {
    this.sliderSec = newFractionValue * this.getSequenceDuration();
  }

  getTimelineSliderFrac() {
    return this.sliderSec / this.getSequenceDuration();
  }

  getTimelineSliderStr() {
    return StructureBlock.convertSecToStr(this.sliderSec);
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

  saveTemplate() {
    const templateName = window.prompt('What name should the template be stored as?');
    if (templateName) {
      const newOption = this.editContent.storyStructure.duplicate();
      newOption.name = templateName;
      this.structureTemplateService.addOption(newOption);
      this.snackBar.open('Added template', null, {
        duration: 2000
      });
    }
  }

}
