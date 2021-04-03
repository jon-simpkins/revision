import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {TimelineBlock} from '../timeline-chart/timeline-chart.component';
import {Beat, Tag} from '../../protos';
import {ActivatedRoute, Router} from '@angular/router';
import {BeatsService} from '../beats.service';
import {TagService} from '../tag.service';

@Component({
  selector: 'app-writing-page',
  templateUrl: './writing-page.component.html',
  styleUrls: ['./writing-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WritingPageComponent implements OnInit {

  selectedBeatId = '';
  selectedBeat: Beat = new Beat();

  referenceBeatId = '';
  referenceBeat: Beat|null = null;

  timelineView: TimelineBlock[] = [];
  relevantTags: Tag[] = [];

  shouldShowPreview = false;

  constructor(
    protected beatsService: BeatsService,
    protected tagService: TagService,
    protected ref: ChangeDetectorRef,
    protected route: ActivatedRoute,
    protected router: Router) { }

  ngOnInit(): void {

    // Read the selected beat ID from the route
    this.route.params.subscribe(async (value) => {
      const selectedId = value.id as string;
      if (this.selectedBeatId !== selectedId && !!selectedId) {
        await this.selectBeat(selectedId);
      }
    });
  }

  async selectBeat(selectedId: string): Promise<void> {
    this.selectedBeatId = selectedId;
    console.log('selected: ' + selectedId);

    await this.fetchBeatAndSetSubscriptions();

    await this.updateTimeline();
    await this.updateRelevantTags();
    this.ref.markForCheck();
  }

  // Separate function to allow mocking in Mirage variation
  async fetchBeatAndSetSubscriptions(): Promise<void> {
    this.selectedBeat = await this.beatsService.getBeat(this.selectedBeatId) as Beat;
  }

  async updateTimeline(): Promise<void> {
    this.timelineView = await this.beatsService.fetchTimelineView(
      this.selectedBeatId);
  }

  async updateRelevantTags(): Promise<void> {
    const allReferencedTagIds = new Set<string>();
    this.timelineView.forEach((block) => {
      block.tagReferences.forEach((reference) => {
        allReferencedTagIds.add(reference.tagId);
      });
    });

    this.relevantTags = await this.tagService.getSpecificTags(Array.from(allReferencedTagIds.keys()));

  }

  async showPreview(newId: string): Promise<void> {
    this.referenceBeatId = newId;
    await this.fetchReferenceBeatAndSetSubscriptions();
    this.ref.markForCheck();
  }

  // Separate function to allow mocking in Mirage variation
  async fetchReferenceBeatAndSetSubscriptions(): Promise<void> {
    this.referenceBeat = await this.beatsService.getBeat(this.referenceBeatId) as Beat;
  }

  hidePreview(): void {
    this.referenceBeatId = '';
    this.referenceBeat = null;
    this.ref.markForCheck();
  }

  async navigateToPreview(): Promise<void> {
    const beatToNavigateTo = this.referenceBeatId;
    this.hidePreview();
    await this.router.navigate(['/writing', { id: beatToNavigateTo }]);
  }

  async editorTextChanged(newText: string): Promise<void> {
    this.selectedBeat.prose = newText;
    await this.setBeatUpdate(this.selectedBeat, false, true);
    this.ref.markForCheck();
  }

  // Separate function to allow mocking in Mirage variation
  async setBeatUpdate(beat: Beat, affectsMapView: boolean = false, affectsLastUpdated: boolean): Promise<void> {
    await this.beatsService.setBeat(beat, affectsMapView, affectsLastUpdated);
  }

}
