import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';

import {MaterialModules} from '../app.module';
import {AppRoutingModule} from '../app-routing.module';
import {BrainstormTemplate} from '../../protos';

import {BeatBrainstormTemplateNavComponent} from './beat-brainstorm-template-nav.component';
import {BrainstormTemplateListView} from '../brainstorm-template.service';

export default {
  title: 'Beat Page / Brainstorm Template Nav',
  argTypes: {
    selectTemplate: { action: 'selectTemplate' },
    applyTemplate: { action: 'applyTemplate' }
  },
  component: BeatBrainstormTemplateNavComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, ...MaterialModules, AppRoutingModule],
    }),
  ],
} as Meta;

const Template: Story<BeatBrainstormTemplateNavComponent> = (args: BeatBrainstormTemplateNavComponent) => ({
  component: BeatBrainstormTemplateNavComponent,
  props: args,
});

const exampleBrainstormTemplateListView = [
  {
    id: 'abc-123',
    label: 'My first template',
  } as BrainstormTemplateListView,
  {
    id: 'def-456',
    label: 'My second template'
  } as BrainstormTemplateListView
];

const exampleBrainstormTemplate = {
  id: 'def-456',
  label: 'My second template',
  template: 'Who is the main character here?',
} as BrainstormTemplate;

export const EmptyExample = Template.bind({});
EmptyExample.args = {};

export const FullExampleNothingSelected = Template.bind({});
FullExampleNothingSelected.args = {
  brainstormTemplateListView: exampleBrainstormTemplateListView
};

export const FullExampleSecondSelected = Template.bind({});
FullExampleSecondSelected.args = {
  selectedTemplateId: 'def-456',
  brainstormTemplateListView: exampleBrainstormTemplateListView,
  selectedBrainstormTemplate: exampleBrainstormTemplate,
};
