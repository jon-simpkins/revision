import {ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {BeatMapView, BeatsService} from '../../../beats.service';
import {getDurationStr} from '../../../duration-helpers';
import {Beat, StructureTemplate} from '../../../../protos';
import {StructureTemplateListView, StructureTemplateService} from '../../../structure-template.service';
import StructureTemplateBeat = StructureTemplate.StructureTemplateBeat;

@Component({
  selector: 'app-writing-structure',
  templateUrl: './writing-structure.component.html',
  styleUrls: ['./writing-structure.component.scss']
})
export class WritingStructureComponent implements OnInit, OnChanges {

  @Input()
  editingBeatId = '';

  @Input()
  previewBeatId = '';

  @Output() showPreview = new EventEmitter<string>();

  beatMapView: Map<string, BeatMapView> = new Map();
  beatMapViewSubscription = '';

  brainstormListView: BeatMapView[] = [];
  structureListView: BeatMapView[] = [];

  brainstormAddView = false;
  structureAddView = false;

  structureTemplateListView: StructureTemplateListView[] = [];
  structureTemplateListViewSubscription = '';
  currentlySelectedStructureTemplate = '';
  rescaledSelectedStructureTemplate: StructureTemplate|null = null;

  constructor(private beatsService: BeatsService,
              private structureTemplateService: StructureTemplateService,
              private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.beatMapViewSubscription = this.beatsService.subscribeToBeatMapView(async (newValue) => {
      this.beatMapView = newValue;

      await this.buildRelatedListViews();

      this.ref.markForCheck();
    });

    this.structureTemplateListViewSubscription = this.structureTemplateService.subscribeToTemplateListView((newValue) => {
      this.structureTemplateListView = newValue;
      this.ref.markForCheck();
    });
  }

  async ngOnChanges(): Promise<void> {
    await this.buildRelatedListViews();

    this.ref.markForCheck();
  }

  formatDurationMs(value: number): string {
    return getDurationStr(value);
  }

  formatCompleteness(value: Beat.Completeness): string {
    switch (value) {
      case Beat.Completeness.NOT_STARTED:
        return 'Not Started';
      case Beat.Completeness.BRAINSTORM:
        return 'Brainstorm';
      case Beat.Completeness.INITIAL_DRAFT:
        return 'Initial Draft';
      case Beat.Completeness.POLISHED:
        return 'Polished';
      case Beat.Completeness.FINAL:
        return 'Final';
    }
    return 'Unknown';
  }

  selectBeat(id: string): void {
    this.showPreview.emit(id);
  }

  async removeBeat(id: string, list: string): Promise<void> {
    const selectedBeat = await this.beatsService.getBeat(this.editingBeatId);

    if (!selectedBeat) {
      throw Error(`Unable to find beat ${selectedBeat}`);
    }

    if (list === 'brainstorm') {
      selectedBeat.brainstorm = selectedBeat.brainstorm.filter((brainstormId) => brainstormId !== id);
    } else if (list === 'structure') {
      selectedBeat.structure = selectedBeat.structure.filter((structureId) => structureId !== id);
    } else {
      throw Error(`Unknown list type: ${list}`);
    }

    await this.beatsService.setBeat(
      selectedBeat,
      true,
      true
    );

    this.selectBeat('');

    this.ref.markForCheck();
  }

  async deleteBeat(id: string): Promise<void> {
    await this.beatsService.deleteBeat(id);

    this.selectBeat('');

    this.ref.markForCheck();
  }

  // TODO: make this not dead code
  async drop(event: any): Promise<void> {
    const targetList = event.container.id;
    const sourceList = event.previousContainer.id;

    const targetIndex = event.currentIndex;
    const sourceIndex = event.previousIndex;

    const selectedBeat = await this.beatsService.getBeat(this.editingBeatId);

    if (!selectedBeat) {
      throw Error(`Unable to find beat ${selectedBeat}`);
    }

    let uuidToMove: string;
    if (sourceList === 'structure') {
      uuidToMove = selectedBeat.structure.splice(sourceIndex, 1)[0];
    } else if (sourceList === 'brainstorm') {
      uuidToMove = selectedBeat.brainstorm.splice(sourceIndex, 1)[0];
    } else {
      throw Error(`Unknown source list ${sourceList}`);
    }

    if (targetList === 'structure') {
      selectedBeat.structure.splice(targetIndex, 0, uuidToMove);
    } else if (targetList === 'brainstorm') {
      selectedBeat.brainstorm.splice(targetIndex, 0, uuidToMove);
    } else {
      throw Error(`Unknown target list ${targetList}`);
    }

    await this.beatsService.setBeat(
      selectedBeat,
      true,
      true
    );

    this.ref.markForCheck();
  }

  // From the beatMapView, build up the brainstorm / structure list views
  async buildRelatedListViews(): Promise<void> {
    if ((this.editingBeatId?.length || 0) === 0) {
      this.brainstormListView = [];
      this.structureListView = [];
    } else {

      const selectedBeat = await this.beatsService.getBeat(this.editingBeatId);

      if (!selectedBeat) {
        throw Error(`Beat ${this.editingBeatId} was not found`);
      }

      this.brainstormListView = (selectedBeat.brainstorm || [])
        .map((id) => this.beatMapView.get(id) as BeatMapView)
        .filter(Boolean);
      this.structureListView = (selectedBeat.structure || [])
        .map((id) => this.beatMapView.get(id) as BeatMapView)
        .filter(Boolean);
    }
  }

  toggleStructureAddView(): void {
    this.structureAddView = !this.structureAddView;
  }

  toggleBrainstormAddView(): void {
    this.brainstormAddView = !this.brainstormAddView;
  }

  async addNewBeatToList(targetList: string): Promise<void> {

    const newBeatId = await this.beatsService.createNewBeat();

    const selectedBeat = await this.beatsService.getBeat(this.editingBeatId);

    if (!selectedBeat) {
      throw Error(`Beat ${this.editingBeatId} was not found`);
    }

    if (targetList === 'structure') {
      selectedBeat.structure.push(newBeatId);
      this.toggleStructureAddView();
    } else if (targetList === 'brainstorm') {
      selectedBeat.brainstorm.push(newBeatId);
      this.toggleBrainstormAddView();
    } else {
      throw Error(`Unknown target list ${targetList}`);
    }

    await this.beatsService.setBeat(
      selectedBeat,
      true,
      true
    );

    this.ref.markForCheck();
  }

  async selectStructureTemplate(newId: string): Promise<void> {
    if (newId === this.currentlySelectedStructureTemplate || newId === '') {
      // Deselect
      this.currentlySelectedStructureTemplate = '';
      this.rescaledSelectedStructureTemplate = null;
    } else {
      this.currentlySelectedStructureTemplate = newId;

      this.rescaledSelectedStructureTemplate = await this.getRescaledStructureTemplate();
    }

    this.ref.markForCheck();
  }

  async applyStructureTemplate(event: Event): Promise<void> {
    event.stopPropagation();

    const editingBeat = await this.beatsService.getBeat(this.editingBeatId);

    const rescaledTemplate = await this.getRescaledStructureTemplate();

    // Move everything from structure -> brainstorm
    editingBeat.brainstorm = editingBeat.brainstorm.concat(editingBeat.structure);
    editingBeat.structure = [];

    // Create all relevant beats
    const templateBeats = rescaledTemplate?.beats as StructureTemplateBeat[];
    for (const templateBeat of templateBeats) {
      const newUuid = await this.beatsService.createNewBeat();

      editingBeat.structure.push(newUuid);

      const childBeat = await this.beatsService.getBeat(newUuid) as Beat;
      childBeat.synopsis = templateBeat.description;
      childBeat.intendedDurationMs = templateBeat.intendedDurationMs;

      await this.beatsService.setBeat(childBeat, true);
    }

    await this.beatsService.setBeat(editingBeat, true);

    await this.selectStructureTemplate('');

    this.toggleStructureAddView();
  }

  async getRescaledStructureTemplate(): Promise<StructureTemplate> {
    const template = await this.structureTemplateService.getStructureTemplate(this.currentlySelectedStructureTemplate);

    const editingBeat = await this.beatsService.getBeat(this.editingBeatId);

    const currentIntendedDuration = editingBeat.intendedDurationMs;
    let templateSumDuration = 0;
    (template?.beats || []).forEach(beat => {
      templateSumDuration += (beat.intendedDurationMs as number);
    });

    if (!templateSumDuration || !currentIntendedDuration) {
      return template;
    }

    const scale = currentIntendedDuration / templateSumDuration;
    (template?.beats || []).forEach(beat => {
      if (!!beat) {
        const originalDuration = beat?.intendedDurationMs as number;
        beat.intendedDurationMs = Math.floor(originalDuration * scale);
      }
    });

    return template;
  }
}
