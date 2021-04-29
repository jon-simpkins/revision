import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';

import {BrainstormTemplateNavComponent} from './brainstorm-template-nav.component';
import {BrainstormTemplateListView} from '../../brainstorm-template.service';

export default {
  title: 'Brainstorm Template Page / Nav',
  argTypes: {
    newTemplate: { action: 'newTemplate' },
    selectTemplate: { action: 'selectTemplate' },
    deleteTemplate: { action: 'deleteTemplate' },
    generateStandardTemplates: {action: 'generateStandardTemplates'}
  },
  component: BrainstormTemplateNavComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule],
    }),
  ],
} as Meta;

const Template: Story<BrainstormTemplateNavComponent> = (args: BrainstormTemplateNavComponent) => ({
  component: BrainstormTemplateNavComponent,
  props: args,
});

const exampleBrainstormTemplateListView = [
  {
    id: 'abc-123',
    label: 'My first template'
  } as BrainstormTemplateListView,
  {
    id: 'def-456',
    label: 'My second template'
  } as BrainstormTemplateListView
];

export const EmptyExample = Template.bind({});
EmptyExample.args = {};

export const FullExampleNothingSelected = Template.bind({});
FullExampleNothingSelected.args = {
  brainstormTemplateListView: exampleBrainstormTemplateListView
};

export const FullExampleSecondSelected = Template.bind({});
FullExampleSecondSelected.args = {
  selectedTemplateId: 'def-456',
  brainstormTemplateListView: exampleBrainstormTemplateListView
};
