import {moduleMetadata} from '@storybook/angular';
import {CommonModule} from '@angular/common';
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import {Meta, Story} from '@storybook/angular/types-6-0';

import {MaterialModules} from '../app.module';
import {AppRoutingModule} from '../app-routing.module';
import {TimelineBlock, TimelineChartComponent} from './timeline-chart.component';
import {Beat} from '../../protos';
import Completeness = Beat.Completeness;

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
    depth: 0
  },
  {
    id: 'def456',
    startSec: 60 * 15,
    endSec: 60 * 30,
    label: 'Second Act, oh wow is this a cool act, just the bestest',
    depth: 0,
    completeness: Completeness.FINAL
  },
  {
    id: 'ghi789',
    startSec: 60 * 5,
    endSec: 60 * 20,
    label: 'More involved stuff',
    depth: 1
  },
  {
    id: 'abc091',
    startSec: 3600 + 60 * 5,
    endSec: 3600 + 60 * 20,
    label: 'One for the road',
    depth: 1
  }
] as TimelineBlock[];

export const BasicExample = Template.bind({});
BasicExample.args = {
  timelineBlocks: exampleTimelineBlocks
};
