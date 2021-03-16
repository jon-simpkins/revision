import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {WritingPageComponent} from './writing-page.component';
import {TimelineBlock} from '../timeline-chart/timeline-chart.component';
import {Beat, Tag} from '../../protos';

import Completeness = Beat.Completeness;
import TagReference = Beat.TagReference;
import {ActivatedRoute} from '@angular/router';
import {BeatsService} from '../beats.service';
import {TagService} from '../tag.service';

const exampleTimelineBlocks = [
  {
    id: 'abc123',
    startSec: 0,
    endSec: 60 * 15,
    label: 'First Act',
    depth: 0,
    tagReferences: [
      {
        tagId: 'tag1',
      }
    ] as TagReference[]
  },
  {
    id: 'def456',
    startSec: 60 * 15,
    endSec: 60 * 30,
    label: 'Second Act, oh wow is this a cool act, just the bestest',
    depth: 0,
    completeness: Completeness.FINAL,
    tagReferences: [] as TagReference[]
  },
  {
    id: 'ghi789',
    startSec: 60 * 5,
    endSec: 60 * 20,
    label: 'More involved stuff',
    depth: 1,
    tagReferences: [
      {
        tagId: 'tag1',
      }
    ] as TagReference[]
  },
  {
    id: 'abc091',
    startSec: 3600 + 60 * 5,
    endSec: 3600 + 60 * 20,
    label: 'One for the road',
    depth: 1,
    tagReferences: [
      {
        tagId: 'tag1',
      },
      {
        tagId: 'tag2',
        enumValue: 1
      },
      {
        tagId: 'tag3',
        enumValue: 0,
        numericValue: 14.5
      }
    ] as TagReference[]
  }
] as TimelineBlock[];

const exampleTagList = [
  {
    id: 'tag1',
    name: 'Boolean tag',
    hasNumericValue: false,
    enumValues: []
  },
  {
    id: 'tag2',
    name: 'Enum tag',
    hasNumericValue: false,
    enumValues: [
      {
        label: 'First Value'
      },
      {
        label: 'Second Value'
      }
    ]
  },
  {
    id: 'tag3',
    name: 'Numeric tag',
    hasNumericValue: true,
    enumValues: []
  },
] as Tag[];






@Component({
  // tslint:disable-next-line:component-selector
  selector: 'writing-page-mirage',
  templateUrl: './writing-page.component.html',
  styleUrls: ['./writing-page.component.scss'],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WritingPageMirageComponent extends WritingPageComponent {

  constructor(
    protected beatsService: BeatsService,
    protected tagService: TagService,
    protected ref: ChangeDetectorRef, protected route: ActivatedRoute) {
    super(
      beatsService,
      tagService,
      ref, route);
  }

  async updateTimeline(): Promise<void> {
    this.timelineView = exampleTimelineBlocks;
  }

  async updateRelevantTags(): Promise<void> {
    this.relevantTags = exampleTagList;
  }
}
