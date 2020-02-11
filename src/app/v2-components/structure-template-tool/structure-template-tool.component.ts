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
    console.log(this.workspaceService.currentWorkspace.structureTemplates.get(this.currentDetailId).toString())
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

  addExamples() {
    const bohemianRhapsodyTemplate = PlotTemplate.parseFromString(`{"startOffset":0,"beats":[
      {"durationMin":0.81,"oneLiner":"Intro","description":"Introduce just a few elements"},
      {"durationMin":1.8,"oneLiner":"Ballad","description":"New elements, swell and build with what was there"},
      {"durationMin":0.46,"oneLiner":"Guitar Solo","description":"Build in intensity, original elements now gone"},
      {"durationMin":1.03,"oneLiner":"Opera","description":"Original elements now transformed, build to breaking point"},
      {"durationMin":0.81,"oneLiner":"Hard rock","description":"Have fun, tear loose"},
      {"durationMin":1.01,"oneLiner":"Outro","description":"Come back down with only original elements remaining"}],"id":"2c15a5c23b9d4a83a23a7b194dfdecb2","oneLiner":"Bohemian Rhapsody"}`);
    this.workspaceService.currentWorkspace.structureTemplates.set(
      bohemianRhapsodyTemplate.id,
      bohemianRhapsodyTemplate
    );

    const threeActClassic = PlotTemplate.parseFromString(`{"startOffset":0,"beats":[
      {"durationMin":30,"oneLiner":"Act 1","description":"Lay out the world as it was at the beginning"},
      {"durationMin":30,"oneLiner":"Act 2a","description":"Start to change!"},
      {"durationMin":30,"oneLiner":"Act 2b","description":"Ruh roh, change is bad"},
      {"durationMin":30,"oneLiner":"Act 3","description":"Transformation is good!"}],"id":"48a321978f294f2795987e8662031777","oneLiner":"Three Act Structure (Classic)"}`);

    this.workspaceService.currentWorkspace.structureTemplates.set(
      threeActClassic.id,
      threeActClassic
    );

    const storyWheel = PlotTemplate.parseFromString(`{"startOffset":0,"beats":[
      {"durationMin":15,"oneLiner":"Beat 1","description":"Hero is in a zone of comfort"},
      {"durationMin":15,"oneLiner":"Beat 2","description":"But they want something"},
      {"durationMin":15,"oneLiner":"Beat 3","description":"They enter an unfamiliar situation"},
      {"durationMin":15,"oneLiner":"Beat 4","description":"Adapt to it"},
      {"durationMin":15,"oneLiner":"Beat 5","description":"Get what they wanted"},
      {"durationMin":15,"oneLiner":"Beat 6","description":"Pay a heavy price for it"},
      {"durationMin":15,"oneLiner":"Beat 7","description":"Then return to their familiar situation"},
      {"durationMin":15,"oneLiner":"Beat 8","description":"Having changed"}],"id":"88f91f4d8e4b4d13ae070b8ca7873996","oneLiner":"Dan Harmon Story Wheel"}`);

    this.workspaceService.currentWorkspace.structureTemplates.set(
      storyWheel.id,
      storyWheel
    );
  }
}
