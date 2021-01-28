import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';

import {MaterialModules} from '../app.module';
import {AppRoutingModule} from '../app-routing.module';
import {TimelineChartComponent, TimelineBlock} from './timeline-chart.component';

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
    row: 'Top Level',
    label: 'First Act'
  },
  {
    id: 'def456',
    startSec: 60 * 15,
    endSec: 60 * 30,
    row: 'Top Level',
    label: 'Second Act, oh wow is this a cool act, just the bestest'
  },
  {
    id: 'ghi789',
    startSec: 60 * 5,
    endSec: 60 * 20,
    row: 'Second Level',
    label: 'More involved stuff'
  },
  {
    id: 'ghi789',
    startSec: 3600 + 60 * 5,
    endSec: 3600 + 60 * 20,
    row: 'Top Level',
    label: 'One for the road'
  }
] as TimelineBlock[];

export const BasicExample = Template.bind({});
BasicExample.args = {
  chartWidth: 800,
  chartHeight: 200,
  timelineBlocks: exampleTimelineBlocks
};
