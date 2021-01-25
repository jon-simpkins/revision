import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';

import {MaterialModules} from '../../app.module';
import {BrainstormTemplate} from '../../../protos';
import {BrainstormTemplateDetailsComponent} from './brainstorm-template-details.component';

export default {
  title: 'Brainstorm Template Page / Details',
  argTypes: {
    brainstormTemplateUpdated: { action: 'brainstormTemplateUpdated' },
  },
  component: BrainstormTemplateDetailsComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, ...MaterialModules],
    }),
  ],
} as Meta;

const Template: Story<BrainstormTemplateDetailsComponent> = (args: BrainstormTemplateDetailsComponent) => ({
  component: BrainstormTemplateDetailsComponent,
  props: args,
});

export const EmptyExample = Template.bind({});
EmptyExample.args = {};

const mockTag = BrainstormTemplate.create({
  id: 'abc-123',
  label: 'My Template',
  template: 'Like a 3-act structure, but turned up to 4',
});
export const FullExample = Template.bind({});
FullExample.args = {
  brainstormTemplate: mockTag
};
