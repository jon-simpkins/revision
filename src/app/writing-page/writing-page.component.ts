import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {TimelineBlock} from '../timeline-chart/timeline-chart.component';
import {Tag} from '../../protos';
import {ActivatedRoute} from '@angular/router';
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
  timelineView: TimelineBlock[] = [];
  relevantTags: Tag[] = [];

  constructor(
    protected beatsService: BeatsService,
    protected tagService: TagService,
    protected ref: ChangeDetectorRef, protected route: ActivatedRoute) { }

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
    await this.updateTimeline();
    await this.updateRelevantTags();
    this.ref.markForCheck();
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

}
