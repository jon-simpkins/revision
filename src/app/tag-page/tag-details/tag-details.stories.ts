import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';

import {MaterialModules} from '../../app.module';
import {StructureTemplate, Tag} from '../../../protos';
import {TagDetailsComponent} from './tag-details.component';

export default {
  title: 'Tag Page / Details',
  argTypes: {
    tagUpdated: { action: 'tagUpdated' },
  },
  component: TagDetailsComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, ...MaterialModules],
    }),
  ],
} as Meta;

const Template: Story<TagDetailsComponent> = (args: TagDetailsComponent) => ({
  component: TagDetailsComponent,
  props: args,
});

export const EmptyExample = Template.bind({});
EmptyExample.args = {};

const mockTag = Tag.create({
  id: 'abc-123',
  name: 'My Template',
  description: 'Like a 3-act structure, but turned up to 4',
  hasNumericValue: true,
});
export const FullExample = Template.bind({});
FullExample.args = {
  tag: mockTag
};
