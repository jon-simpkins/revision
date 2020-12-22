import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';

import {StructureTemplateDetailsComponent} from './structure-template-details.component';
import {MaterialModules} from '../../app.module';
import {StructureTemplate} from '../../../protos';

export default {
  title: 'Structure Template Page / Details',
  argTypes: {
    templateUpdated: { action: 'templateUpdated' },
  },
  component: StructureTemplateDetailsComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, ...MaterialModules],
    }),
  ],
} as Meta;

const Template: Story<StructureTemplateDetailsComponent> = (args: StructureTemplateDetailsComponent) => ({
  component: StructureTemplateDetailsComponent,
  props: args,
});

export const EmptyExample = Template.bind({});
EmptyExample.args = {};

const mockTemplate = StructureTemplate.create({
  id: 'abc-123',
  name: 'My Template',
  description: 'Like a 3-act structure, but turned up to 4'
});
export const FullExample = Template.bind({});
FullExample.args = {
  structureTemplate: mockTemplate
};
