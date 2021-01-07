import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';

import {MaterialModules} from '../app.module';
import {BeatMapView} from '../beats.service';
import {BeatRelatedBeatNavComponent} from './beat-related-beat-nav.component';

export default {
  title: 'Beats / Nav for Related Beats',
  argTypes: {
    newBeat: { action: 'newBeat' },
    selectBeat: { action: 'selectBeat' },
    moveBeat: { action: 'moveBeat' },
    deleteBeat: { action: 'deleteBeat' },
  },
  component: BeatRelatedBeatNavComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, ...MaterialModules],
    }),
  ],
} as Meta;

const Template: Story<BeatRelatedBeatNavComponent> = (args: BeatRelatedBeatNavComponent) => ({
  component: BeatRelatedBeatNavComponent,
  props: args,
});

const exampleBeatListView1 = [
  {
    id: 'abc-123',
    name: 'My first beat',
    lastUpdated: Date.now(),
  } as BeatMapView,
  {
    id: 'def-456',
    name: 'My second beat',
    lastUpdated: Date.now() - (1000 * 3400)
  } as BeatMapView
];

const exampleBeatListView2 = [
  {
    id: 'ghi-789',
    name: 'My third beat',
    lastUpdated: Date.now() - (1000 * 12),
  } as BeatMapView,
  {
    id: 'jkl-012',
    name: 'My 4th beat with a really long title that will wrap at some point perhaps',
    lastUpdated: Date.now() - (1000 * 9)
  } as BeatMapView
];

export const EmptyExample = Template.bind({});
EmptyExample.args = {};

export const FullExampleNothingSelected = Template.bind({});
FullExampleNothingSelected.args = {
  brainstormListView: exampleBeatListView1,
  structureListView: exampleBeatListView2,
};

export const FullExampleSecondSelected = Template.bind({});
FullExampleSecondSelected.args = {
  selectedBeatId: 'def-456',
  brainstormListView: exampleBeatListView1,
  structureListView: exampleBeatListView2,
};
