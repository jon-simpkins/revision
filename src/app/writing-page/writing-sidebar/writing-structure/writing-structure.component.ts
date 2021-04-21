import {ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {BeatMapView, BeatsService} from '../../../beats.service';
import {getDurationStr} from '../../../duration-helpers';
import {Beat} from '../../../../protos';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {BeatSubList} from '../../../beat-related-beat-nav/beat-related-beat-nav.component';

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

  constructor(private beatsService: BeatsService,
              private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.beatMapViewSubscription = this.beatsService.subscribeToBeatMapView(async (newValue) => {
      this.beatMapView = newValue;

      await this.buildRelatedListViews();

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

  async drop(event: CdkDragDrop<BeatMapView[]>): Promise<void> {
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
      throw Error(`Unknown target list ${sourceList}`);
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

}
