import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';

import {MaterialModules} from '../app.module';
import {BeatProseEditComponent} from './beat-prose-edit.component';
import {Beat} from '../../protos';

export default {
  title: 'Beats / Prose editor',
  argTypes: {
    onBeatUpdated: { action: 'onBeatUpdated' },
  },
  component: BeatProseEditComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, ...MaterialModules],
    }),
  ],
} as Meta;

const Template: Story<BeatProseEditComponent> = (args: BeatProseEditComponent) => ({
  component: BeatProseEditComponent,
  props: args,
});

export const EmptyExample = Template.bind({});
EmptyExample.args = {};

const mockBeat = Beat.create({
  id: 'abc-123',
  synopsis: 'My Synopsis',
});
export const FullExample = Template.bind({});
FullExample.args = {
  beat: mockBeat
};
