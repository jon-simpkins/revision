import {moduleMetadata} from '@storybook/angular';
import {CommonModule} from '@angular/common';
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import {Meta, Story} from '@storybook/angular/types-6-0';

import {MaterialModules} from '../app.module';
import {AppRoutingModule} from '../app-routing.module';
import {TimelineBlock, TimelineChartComponent} from './timeline-chart.component';
import {Beat, Tag} from '../../protos';
import Completeness = Beat.Completeness;
import TagReference = Beat.TagReference;
import {TagListView} from '../tag.service';

export default {
  title: 'Timeline Chart',
  argTypes: {
    selectBeat: {action: 'selectBeat'},
  },
  component: TimelineChartComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, ...MaterialModules, AppRoutingModule],
    }),
  ],
} as Meta;

const Template: Story<TimelineChartComponent> = (args: TimelineChartComponent) => ({
  component: TimelineChartComponent,
  props: args,
});

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

export const BasicExample = Template.bind({});
BasicExample.args = {
  timelineBlocks: exampleTimelineBlocks,
  relevantTags: exampleTagList
};
