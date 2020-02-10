import { Component, OnInit, Input } from '@angular/core';
import { PlotTemplateBeat } from 'src/storyStructures';
import { formatMinutesString } from 'src/storyStructures/utils';
import { WorkspaceService } from 'src/app/services/workspace.service';

@Component({
  selector: 'sequence-beat-card',
  templateUrl: './sequence-beat-card.component.html',
  styleUrls: ['./sequence-beat-card.component.scss']
})
export class SequenceBeatCardComponent implements OnInit {

  @Input() beatSequenceId: string;
  @Input() templateBeat: PlotTemplateBeat;
  @Input() beatDurationMin: number;
  @Input() attachCallback: (newId: string) => void;
  @Input() detachCallback: () => void;

  showUnassignedTable = false;

  unassignedOptionDataSource = []
  unassignedOptionColumns = ['oneLiner', 'durationMinStr', 'id'];

  constructor(private workspaceService: WorkspaceService) { }

  ngOnInit() {
  }

  getTemplateOneLiner(): string {
    return this.templateBeat.oneLiner || '';
  }

  getTemplateDescription(): string {
    return this.templateBeat.description || '';
  }

  getDurationString(): string {
    return formatMinutesString(this.beatDurationMin);
  }

  getBeatOneliner(): string {
    return this.workspaceService.getCurrentStory().structureElements.get(this.beatSequenceId).oneLiner || '';
  }

  oneLinerInput(e) {
    this.workspaceService.getCurrentStory().structureElements.get(this.beatSequenceId).oneLiner = e.target.value;
  }

  getAnyUnassigned(): boolean {
    let anyUnassigned = false;
    this.workspaceService.getCurrentStory().structureElements.forEach(sequence => {
      if (!sequence.parentId && this.workspaceService.getCurrentStory().plotElementId !== sequence.id) {
        anyUnassigned = true;
      }
    });

    return anyUnassigned;
  }

  detach() {
    this.detachCallback();
  }

  addNew(): void {
    const newStructureElementId = this.workspaceService.getCurrentStory().buildNewStructureElement();
    this.handleAssignment(newStructureElementId);
  }

  handleAssignment(newStructureElementId: string): void {
    this.attachCallback(newStructureElementId);
    this.showUnassignedTable = false;
  }

  showHideUnassignedTable() {
    this.showUnassignedTable = !this.showUnassignedTable;

    if (this.showUnassignedTable) {
      // todo: actually build out the options at this point
      this.unassignedOptionDataSource = [];
      this.workspaceService.getCurrentStory().structureElements.forEach(sequence => {
        if (!sequence.parentId && this.workspaceService.getCurrentStory().plotElementId !== sequence.id) {
          this.unassignedOptionDataSource.push({
            oneLiner: sequence.oneLiner,
            durationMinStr: formatMinutesString(sequence.durationMin || 1),
            id: sequence.id
          });
        }
      });
    }
  }
}
