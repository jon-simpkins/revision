import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {BeatMapView, BeatsService} from '../beats.service';
import {Beat, StructureTemplate} from '../../protos';
import {BeatUpdate} from '../beat-prose-edit/beat-prose-edit.component';
import {BeatDropEvent, BeatSubList} from '../beat-related-beat-nav/beat-related-beat-nav.component';
import {ActivatedRoute, Router} from '@angular/router';
import {StructureTemplateListView, StructureTemplateService} from '../structure-template.service';

@Component({
  selector: 'app-beat-page',
  templateUrl: './beat-page.component.html',
  styleUrls: ['./beat-page.component.scss']
})
export class BeatPageComponent implements OnInit, OnDestroy {

  beatMapView: Map<string, BeatMapView> = new Map();
  beatListView: BeatMapView[] = [];
  beatMapViewSubscription = '';

  selectedBeatId = '';

  parentListView: BeatMapView[] = [];

  selectedBeat: Beat|null = null;
  selectedBeatSubscription = '';

  brainstormListView: BeatMapView[] = [];
  structureListView: BeatMapView[] = [];

  selectedChildBeatId = '';

  selectedChildBeat: Beat|null = null;
  selectedChildBeatSubscription = '';

  /** Structure templates */
  selectedTemplateUuid = '';

  selectedTemplate: StructureTemplate|null = null;
  selectedTemplateSubscription = '';

  structureTemplateListView: StructureTemplateListView[] = [];
  structureTemplateListViewSubscription = '';

  constructor(
    private beatsService: BeatsService,
    private ref: ChangeDetectorRef,
    private structureTemplateService: StructureTemplateService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // Read the selected beat ID from the route
    this.route.params.subscribe(async (value) => {
      const selectedId = value.id as string;
      if (this.selectedBeatId !== selectedId && !!selectedId) {
        await this.selectBeat(selectedId);
      }
    });

    this.beatMapViewSubscription = this.beatsService.subscribeToBeatMapView((newValue) => {
      this.beatMapView = newValue;

      this.beatListView = Array.from(newValue.values())
        .filter(entry => entry.parentBeats.length === 0) // Only retain top-level beats
        .sort((a, b) => {
        return b.lastUpdated - a.lastUpdated;
      });

      this.buildRelatedListViews();

      this.ref.markForCheck();
    });

    this.structureTemplateListViewSubscription = this.structureTemplateService.subscribeToTemplateListView((newValue) => {
      this.structureTemplateListView = newValue;
      this.ref.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.beatsService.cancelSubscription(this.beatMapViewSubscription);
    this.beatsService.cancelSubscription(this.selectedBeatSubscription);
    this.beatsService.cancelSubscription(this.selectedChildBeatSubscription);
    this.structureTemplateService.cancelSubscription(this.selectedTemplateSubscription);
    this.structureTemplateService.cancelSubscription(this.structureTemplateListViewSubscription);
  }

  private buildRelatedListViews(): void {
    if (this.selectedBeat == null) {
      this.brainstormListView = [];
      this.structureListView = [];
      this.parentListView = [];
    } else {
      this.brainstormListView = (this.selectedBeat.brainstorm || [])
        .map((id) => this.beatMapView.get(id) as BeatMapView)
        .filter(Boolean);
      this.structureListView = (this.selectedBeat.structure || [])
        .map((id) => this.beatMapView.get(id) as BeatMapView)
        .filter(Boolean);
      this.parentListView = (this.beatMapView.get(this.selectedBeatId)?.parentBeats || [])
        .map((id) => this.beatMapView.get(id) as BeatMapView)
        .filter(Boolean);
    }
  }

  async newBeat(): Promise<void> {
    const newUuid = await this.beatsService.createNewBeat();
    await this.selectBeat(newUuid);
  }

  async selectBeat(newUuid: string): Promise<void> {
    await this.selectChildBeat('');

    this.selectedBeatId = newUuid;
    this.selectedBeat = null;

    this.beatsService.cancelSubscription(this.selectedBeatSubscription);
    if (!!newUuid.length) {
      this.selectedBeatSubscription = this.beatsService.subscribeToBeat(newUuid, (newValue) => {
        this.selectedBeat = newValue;
        this.buildRelatedListViews();
        this.ref.markForCheck();
      });
      this.selectedBeat = await this.beatsService.getBeat(newUuid);
    }

    await this.router.navigate(['/beats', { id: newUuid }]);

    this.ref.markForCheck();
  }

  async deleteBeat(): Promise<void> {
    await this.beatsService.deleteBeat(
      this.selectedBeatId
    );
    await this.selectBeat('');
  }

  async onBeatUpdated(updatedBeat: BeatUpdate): Promise<void> {
    await this.beatsService.setBeat(
      updatedBeat.beat,
      updatedBeat.modifiesListView,
      true);
  }

  async newChildBeat(whichList: BeatSubList): Promise<void> {
    const newUuid = await this.beatsService.createNewBeat();

    const beat = this.selectedBeat as Beat;

    if (whichList === BeatSubList.Structure) {
      const structure = beat.structure || [];
      structure.unshift(newUuid);
      beat.structure = structure;
    } else {
      const brainstorm = beat.brainstorm || [];
      brainstorm.unshift(newUuid);
      beat.brainstorm = brainstorm;
    }

    await this.beatsService.setBeat(
      beat,
      true,
      true
    );

    await this.selectChildBeat(newUuid);
  }

  async selectChildBeat(selectedChildId: string): Promise<void> {
    this.selectedChildBeat = null;
    this.beatsService.cancelSubscription(this.selectedChildBeatSubscription);

    if (selectedChildId === this.selectedChildBeatId) {
      this.selectedChildBeatId = ''; // Treat as deselecting
    } else {
      this.selectedChildBeatId = selectedChildId;
    }

    if (!!this.selectedChildBeatId.length) {
      this.selectedChildBeatSubscription = this.beatsService.subscribeToBeat(this.selectedChildBeatId, (newValue) => {
        this.selectedChildBeat = newValue;
        this.buildRelatedListViews();
        this.ref.markForCheck();
      });
      this.selectedChildBeat = await this.beatsService.getBeat(this.selectedChildBeatId);
    }

    this.ref.markForCheck();
  }

  async moveChildBeat(moveEvent: BeatDropEvent): Promise<void> {
    const beat = this.selectedBeat as Beat;

    let uuidToMove: string;
    if (moveEvent.sourceList === BeatSubList.Structure) {
      uuidToMove = beat.structure.splice(moveEvent.sourceIndex, 1)[0];
    } else {
      uuidToMove = beat.brainstorm.splice(moveEvent.sourceIndex, 1)[0];
    }

    if (moveEvent.targetList === BeatSubList.Structure) {
      beat.structure.splice(moveEvent.targetIndex, 0, uuidToMove);
    } else {
      beat.brainstorm.splice(moveEvent.targetIndex, 0, uuidToMove);
    }

    await this.beatsService.setBeat(
      beat,
      true,
      true
    );

    this.ref.markForCheck();
  }

  async deleteChildBeat(): Promise<void> {
    const uuidToDelete = this.selectedChildBeatId;
    this.selectedChildBeatId = '';

    await this.beatsService.deleteBeat(uuidToDelete);
  }

  tabChange(newIndex: number): void {
    console.log(newIndex);
  }

  getChildSumDuration(): number {

    if (!this.selectedBeat) {
      return 0;
    }

    let sum = 0;
    this.selectedBeat.structure.forEach(childId => {
      const childBeatView = this.beatMapView.get(childId);
      if (childBeatView) {
        sum += childBeatView.intendedDurationMs;
      }
    });

    return sum;
  }

  async selectStructureTemplate(newId: string): Promise<void> {
    this.selectedTemplateUuid = newId;

    this.structureTemplateService.cancelSubscription(this.selectedTemplateSubscription);
    this.selectedTemplateSubscription = this.structureTemplateService.subscribeToTemplate(newId, (newValue) => {
      this.selectedTemplate = newValue;
      this.ref.markForCheck();
    });

    this.ref.markForCheck();
  }

  applyStructureTemplate(): void {
    console.log('apply structure template');
  }
}
