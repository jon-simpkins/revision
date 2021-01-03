import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';

import {MaterialModules} from '../app.module';
import {BeatNavComponent} from './beat-nav.component';
import {BeatMapView} from '../beats.service';

export default {
  title: 'Beats / Nav',
  argTypes: {
    newBeat: { action: 'newBeat' },
    selectBeat: { action: 'selectBeat' },
    deleteBeat: { action: 'deleteBeat' }
  },
  component: BeatNavComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, ...MaterialModules],
    }),
  ],
} as Meta;

const Template: Story<BeatNavComponent> = (args: BeatNavComponent) => ({
  component: BeatNavComponent,
  props: args,
});

const exampleBeatListView = [
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

export const EmptyExample = Template.bind({});
EmptyExample.args = {};

export const FullExampleNothingSelected = Template.bind({});
FullExampleNothingSelected.args = {
  beatListView: exampleBeatListView
};

export const FullExampleSecondSelected = Template.bind({});
FullExampleSecondSelected.args = {
  selectedBeatId: 'def-456',
  beatListView: exampleBeatListView
};
