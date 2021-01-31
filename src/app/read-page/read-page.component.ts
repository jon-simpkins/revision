import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BeatReadView, BeatsService} from '../beats.service';
import {TimelineBlock} from '../timeline-chart/timeline-chart.component';
import {Tag} from '../../protos';
import {TagService} from '../tag.service';

@Component({
  selector: 'app-read-page',
  templateUrl: './read-page.component.html',
  styleUrls: ['./read-page.component.scss']
})
export class ReadPageComponent implements OnInit {

  selectedBeatId = '';
  readView: BeatReadView[] = [];
  timelineView: TimelineBlock[] = [];
  relevantTags: Tag[] = [];

  constructor(
    private beatsService: BeatsService,
    private tagService: TagService,
    private ref: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router) { }

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
    this.readView = await this.beatsService.fetchReadView(selectedId);
    this.timelineView = await this.beatsService.fetchTimelineView(selectedId);

    const allReferencedTagIds = new Set<string>();
    this.timelineView.forEach((block) => {
      block.tagReferences.forEach((reference) => {
        allReferencedTagIds.add(reference.tagId);
      });
    });

    this.relevantTags = await this.tagService.getSpecificTags(Array.from(allReferencedTagIds.keys()));

    this.selectedBeatId = selectedId;
    this.ref.markForCheck();
  }

  async timelineSelectBeat(selectedId: string): Promise<void> {
    await this.router.navigate(['/beats', { id: selectedId }]);
  }

}
