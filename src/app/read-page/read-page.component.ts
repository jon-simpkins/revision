import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BeatReadView, BeatsService} from '../beats.service';
import {TimelineBlock} from '../timeline-chart/timeline-chart.component';
import {Beat, Tag} from '../../protos';
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

  async selectRandomBeat(): Promise<void> {
    let sumScore = 0;
    this.timelineView.forEach((block) => {
      sumScore += this.getBlockScore(block);
    });

    const cutoff = Math.random() * sumScore;
    console.log([sumScore, cutoff]);

    let rollingSum = 0;
    for (const block of this.timelineView) {
      rollingSum += this.getBlockScore(block);
      if (rollingSum >= cutoff) {
        await this.timelineSelectBeat(block.id);
        return;
      }
    }
  }

  getBlockScore(block: TimelineBlock): number {
    const durationScore = Math.ceil((block.endSec - block.startSec) / 60);
    let completenessScore = 0;
    switch (block.completeness) {
      case Beat.Completeness.NOT_STARTED:
        completenessScore = 1e3;
        break;
      case Beat.Completeness.BRAINSTORM:
        completenessScore = 1e2;
        break;
      case Beat.Completeness.INITIAL_DRAFT:
        completenessScore = 1e1;
        break;
      case Beat.Completeness.POLISHED:
        completenessScore = 1;
        break;
      case Beat.Completeness.FINAL:
        completenessScore = 0;
        break;
    }

    console.log(durationScore * completenessScore);

    return durationScore * completenessScore;
  }
}
