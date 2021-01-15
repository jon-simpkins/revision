import {moduleMetadata} from '@storybook/angular';
import {CommonModule} from '@angular/common';
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import {Meta, Story} from '@storybook/angular/types-6-0';

import {MaterialModules} from '../app.module';
import {ReadPageBeatComponent} from './read-page-beat.component';
import {BeatReadView} from '../beats.service';
import {Beat} from '../../protos';
import Completeness = Beat.Completeness;
import {AppRoutingModule} from '../app-routing.module';

export default {
  title: 'Read Page / Beat View',
  argTypes: {},
  component: ReadPageBeatComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, ...MaterialModules, AppRoutingModule],
    }),
  ],
} as Meta;

const Template: Story<ReadPageBeatComponent> = (args: ReadPageBeatComponent) => ({
  component: ReadPageBeatComponent,
  props: args,
});


const mockOpenBeat = {
  id: 'abc123',
  name: 'My First Act',
  prose: '   It was great\nand\n\nalso good?',
  completeness: Completeness.BRAINSTORM,
  showExpanded: true,
} as BeatReadView;
export const Example1 = Template.bind({});
Example1.args = {
  beat: mockOpenBeat
};

const mockClosedBeat = {
  id: 'def456',
  name: 'My 2nd Act',
  prose: 'It was great\nand\n\nalso good',
  completeness: Completeness.FINAL,
  showExpanded: false,
} as BeatReadView;
export const Example2 = Template.bind({});
Example2.args = {
  beat: mockClosedBeat
};
