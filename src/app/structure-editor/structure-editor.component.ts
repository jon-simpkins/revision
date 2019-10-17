import {ApplicationRef, Component, OnInit} from '@angular/core';
import {StoryStructure, StructureBlock} from '../../types/StoryStructure/StoryStructure';

import 'hammerjs';
import {StructureTemplateService} from '../structure-template.service';
import {ScreenService} from '../screen.service';

@Component({
  selector: 'structure-editor',
  templateUrl: './structure-editor.component.html',
  styleUrls: ['./structure-editor.component.scss']
})
export class StructureEditorComponent implements OnInit {

  editingStructure: StoryStructure;
  referenceTemplateId: string;
  referenceTemplate: StoryStructure;

  sliderSec: number; // Time in sec for the timeline slider

  constructor(public structureTemplateService: StructureTemplateService, public screenService: ScreenService) {
    this.sliderSec = 0;
  }

  ngOnInit() {
    this.editingStructure = new StoryStructure();
    this.updateReferenceTemplate(this.structureTemplateService.knownStructures[0].id);
  }

  updateReferenceTemplate(newValue) {
    this.referenceTemplateId = newValue;
    this.refreshReferenceTemplate();
  }

  refreshReferenceTemplate() {
    this.referenceTemplate = this.structureTemplateService.getStructureById(this.referenceTemplateId);
    this.referenceTemplate.rescaleToDuraction(this.editingStructure.totalDurationSec);
  }

  nameUpdate(newName) {
    this.editingStructure.name = newName;
  }

  durationUpdate(newValue) {
    this.editingStructure.updateDurationStr(newValue);
    this.refreshReferenceTemplate();
    this.onUpdateTimelineSlider(Math.min(1.0, this.sliderSec / this.editingStructure.totalDurationSec)); // Pin the timeline to the duration at most
  }

  onUpdateTimelineSlider(newFractionValue) {
    this.sliderSec = newFractionValue * this.editingStructure.totalDurationSec;
  }

  getTimelineSliderFrac() {
    return this.sliderSec / this.editingStructure.totalDurationSec;
  }

  getTimelineSliderStr() {
    return StructureBlock.convertSecToStr(this.sliderSec);
  }

  copyFromTemplate() {
    this.editingStructure = this.referenceTemplate.duplicate();
  }

  saveTemplate() {
    this.structureTemplateService.addOption(this.editingStructure);
    this.editingStructure = new StoryStructure();
    this.sliderSec = 0;
  }

  deleteTemplate() {
    this.structureTemplateService.deleteTemplate(this.referenceTemplateId);
    this.updateReferenceTemplate(this.structureTemplateService.knownStructures[0].id);
  }

  backToStoryList() {
    this.screenService.updateShowStructureTemplateEditor(false);
  }
}
