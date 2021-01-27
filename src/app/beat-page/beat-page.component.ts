import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {BeatMapView, BeatsService} from '../beats.service';
import {Beat, BrainstormTemplate, StructureTemplate, Tag} from '../../protos';
import {BeatUpdate} from '../beat-prose-edit/beat-prose-edit.component';
import {BeatDropEvent, BeatSubList} from '../beat-related-beat-nav/beat-related-beat-nav.component';
import {ActivatedRoute, Router} from '@angular/router';
import {StructureTemplateListView, StructureTemplateService} from '../structure-template.service';
import StructureTemplateBeat = StructureTemplate.StructureTemplateBeat;
import {BrainstormTemplateListView, BrainstormTemplateService} from '../brainstorm-template.service';
import {TagService} from '../tag.service';
import TagReference = Beat.TagReference;
import ITagReference = Beat.ITagReference;

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
  rescaledStructureTemplate: StructureTemplate|null = null;
  selectedTemplateSubscription = '';

  structureTemplateListView: StructureTemplateListView[] = [];
  structureTemplateListViewSubscription = '';


  /** Brainstorm Templates */
  selectedBrainstormTemplate: BrainstormTemplate|null = null;
  selectedBrainstormTemplateUuid = '';
  selectedBrainstormTemplateSubscription = '';

  brainstormTemplateListView: BrainstormTemplateListView[] = [];
  brainstormTemplateListViewSubscription = '';

  /** Tag Map */
  tagMapSubscription = '';
  tagMap: Map<string, Tag> = new Map<string, Tag>();

  selectedTabIndex = 0;

  constructor(
    private beatsService: BeatsService,
    private ref: ChangeDetectorRef,
    private structureTemplateService: StructureTemplateService,
    private brainstormTemplateService: BrainstormTemplateService,
    private tagService: TagService,
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

    this.brainstormTemplateListViewSubscription = this.brainstormTemplateService.subscribeToTemplateListView((newValue) => {
      this.brainstormTemplateListView = newValue;
      this.ref.markForCheck();
    });

    this.tagMapSubscription = this.tagService.subscribeToTagMapView((newValue) => {
      this.tagMap = newValue;
      this.ref.markForCheck();
    })
  }

  ngOnDestroy(): void {
    this.beatsService.cancelSubscription(this.beatMapViewSubscription);
    this.beatsService.cancelSubscription(this.selectedBeatSubscription);
    this.beatsService.cancelSubscription(this.selectedChildBeatSubscription);
    this.structureTemplateService.cancelSubscription(this.selectedTemplateSubscription);
    this.structureTemplateService.cancelSubscription(this.structureTemplateListViewSubscription);
    this.brainstormTemplateService.cancelSubscription(this.selectedBrainstormTemplateSubscription);
    this.brainstormTemplateService.cancelSubscription(this.brainstormTemplateListViewSubscription);
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

  async selectParentBeat(parentUuid: string): Promise<void> {
    const newChildId = this.selectedBeatId;
    await this.selectBeat(parentUuid);
    await this.selectChildBeat(newChildId);
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

    if (updatedBeat.modifiesListView) {
      this.rescaleStructureTemplate();
    }
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
    this.selectedTabIndex = newIndex;
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

      this.rescaleStructureTemplate();
      this.ref.markForCheck();
    });

    this.ref.markForCheck();
  }

  rescaleStructureTemplate(): void {
    this.rescaledStructureTemplate = this.selectedTemplate;

    if (!this.rescaledStructureTemplate) {
      return;
    }

    const currentIntendedDuration = this.selectedBeat?.intendedDurationMs;
    let templateSumDuration = 0;
    (this.selectedTemplate?.beats || []).forEach(beat => {
      templateSumDuration += (beat.intendedDurationMs as number);
    });

    if (!templateSumDuration || !currentIntendedDuration) {
      return;
    }

    const scale = currentIntendedDuration / templateSumDuration;
    (this.selectedTemplate?.beats || []).forEach(beat => {
      if (!!beat) {
        const originalDuration = beat?.intendedDurationMs as number;
        beat.intendedDurationMs = Math.floor(originalDuration * scale);
      }
    });
    this.ref.markForCheck();
  }

  async applyStructureTemplate(): Promise<void> {
    const parentBeat = this.selectedBeat as Beat;

    // Move everything from structure -> brainstorm
    parentBeat.brainstorm = parentBeat.brainstorm.concat(parentBeat.structure);
    parentBeat.structure = [];

    // Create all relevant beats
    const templateBeats = this.rescaledStructureTemplate?.beats as StructureTemplateBeat[];
    for (const templateBeat of templateBeats) {
      const newUuid = await this.beatsService.createNewBeat();

      parentBeat.structure.push(newUuid);

      const childBeat = await this.beatsService.getBeat(newUuid) as Beat;
      childBeat.synopsis = templateBeat.description;
      childBeat.intendedDurationMs = templateBeat.intendedDurationMs;

      await this.beatsService.setBeat(childBeat, true);
    }

    await this.beatsService.setBeat(parentBeat, true);

    await this.selectStructureTemplate('');
    await this.selectChildBeat(parentBeat.structure[0]);
    this.selectedTabIndex = 0;
    this.ref.markForCheck();
  }

  async openReadView(): Promise<void> {
    await this.router.navigate(['/read', { id: this.selectedBeatId }]);
  }

  async selectBrainstormTemplate(newId: string): Promise<void> {
    this.selectedBrainstormTemplateUuid = newId;

    this.brainstormTemplateService.cancelSubscription(this.selectedBrainstormTemplateSubscription);
    this.selectedBrainstormTemplateSubscription = this.brainstormTemplateService.subscribeToTemplate(newId, (newValue) => {
      this.selectedBrainstormTemplate = newValue;

      this.ref.markForCheck();
    });

    this.ref.markForCheck();
  }

  async applyBrainstormTemplate(): Promise<void> {
    const parentBeat = this.selectedBeat as Beat;
    const brainstormTemplate = this.selectedBrainstormTemplate as BrainstormTemplate;

    const newBeatUuid = await this.beatsService.createNewBeat();

    parentBeat.brainstorm.push(newBeatUuid);

    const childBeat = await this.beatsService.getBeat(newBeatUuid) as Beat;
    childBeat.intendedDurationMs = 0;
    childBeat.synopsis = brainstormTemplate.label;
    childBeat.prose = brainstormTemplate.template;

    await this.beatsService.setBeat(childBeat, true);
    await this.beatsService.setBeat(parentBeat, true);

    await this.selectChildBeat(newBeatUuid);
    await this.selectBrainstormTemplate('');

    this.selectedTabIndex = 0;
    this.ref.markForCheck();
  }

  async updateTagUses(tagReferences: ITagReference[]): Promise<void> {
    const parentBeat = this.selectedBeat as Beat;
    parentBeat.tagReferences = tagReferences;

    await this.beatsService.setBeat(parentBeat);
  }
}
