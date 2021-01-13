import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';

import {StructureTemplateListView} from '../structure-template.service';
import {MaterialModules} from '../app.module';
import {ApplyStructureNavComponent} from './apply-structure-nav.component';
import {AppRoutingModule} from '../app-routing.module';
import {StructureTemplate} from '../../protos';
import StructureTemplateBeat = StructureTemplate.StructureTemplateBeat;
import IStructureTemplateBeat = StructureTemplate.IStructureTemplateBeat;

export default {
  title: 'Beat Page / Apply Structure Nav',
  argTypes: {
    selectTemplate: { action: 'selectTemplate' },
    applyTemplate: { action: 'applyTemplate' }
  },
  component: ApplyStructureNavComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, ...MaterialModules, AppRoutingModule],
    }),
  ],
} as Meta;

const Template: Story<ApplyStructureNavComponent> = (args: ApplyStructureNavComponent) => ({
  component: ApplyStructureNavComponent,
  props: args,
});

const exampleStructureTemplateListView = [
  {
    id: 'abc-123',
    name: 'My first template',
  } as StructureTemplateListView,
  {
    id: 'def-456',
    name: 'My second template'
  } as StructureTemplateListView
];

const exampleStructureTemplate = {
  id: 'def-456',
  name: 'My second template',
  description: 'Kind of like 3-act structure, but... actually, just 3-act structure',
  beats: [
    {
      description: 'First Act',
      intendedDurationMs: 1000 * 60
    } as IStructureTemplateBeat,
    {
      description: 'Second Act',
      intendedDurationMs: 1000 * 95
    } as IStructureTemplateBeat,
    {
      description: 'Final Act',
      intendedDurationMs: 1000 * 70
    } as IStructureTemplateBeat,
  ]
} as StructureTemplate;

export const EmptyExample = Template.bind({});
EmptyExample.args = {};

export const FullExampleNothingSelected = Template.bind({});
FullExampleNothingSelected.args = {
  structureTemplateListView: exampleStructureTemplateListView
};

export const FullExampleSecondSelected = Template.bind({});
FullExampleSecondSelected.args = {
  selectedTemplateId: 'def-456',
  structureTemplateListView: exampleStructureTemplateListView,
  rescaledSelectedTemplate: exampleStructureTemplate,
};
