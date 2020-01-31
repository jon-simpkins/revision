import { Component, OnInit } from '@angular/core';
import { PlotTemplate, PlotTemplateBeat } from 'src/storyStructures';
import { WorkspaceService } from 'src/app/services/workspace.service';

@Component({
  selector: 'structure-template-tool',
  templateUrl: './structure-template-tool.component.html',
  styleUrls: ['./structure-template-tool.component.scss']
})
export class StructureTemplateToolComponent implements OnInit {

  public currentDetailId: string = '';
  public currentDetailStructure: PlotTemplate;

  constructor(private workspaceService: WorkspaceService) { }

  ngOnInit() {
  }

  addNew() {
    const newStructureId = this.workspaceService.currentWorkspace.buildNewStructureTemplate();
    this.seeDetails(newStructureId);
  }

  getStructureTemplates(): PlotTemplate[] {
    const listOfTemplates = [];
    this.workspaceService.currentWorkspace.structureTemplates.forEach((structureTemplate: PlotTemplate) => {
      listOfTemplates.push(structureTemplate);
    })
    return listOfTemplates;
  }

  seeDetails(id: string) {
    this.currentDetailId = id;
    this.currentDetailStructure = this.workspaceService.currentWorkspace.structureTemplates.get(this.currentDetailId);
  }

  oneLinerInput(e) {
    const newOneLiner = e.target.value;
    this.currentDetailStructure.oneLiner = newOneLiner;
  }

  beatInput(e, index) {
    const beatOneliner = e.target.value;
    this.currentDetailStructure.beats[index].oneLiner = beatOneliner;
  }

  addBeat() {
    const newBeat = new PlotTemplateBeat();
    newBeat.durationMin = 1;
    this.currentDetailStructure.beats.push(
      newBeat
    );
  }

  deleteCurrentDetailStructure() {
    this.workspaceService.currentWorkspace.structureTemplates.delete(
      this.currentDetailId
    );
    this.currentDetailId = null;
    this.currentDetailStructure = null;
  }


}
