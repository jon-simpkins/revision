import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';

import {StructureTemplateNavComponent} from './structure-template-nav.component';
import {StructureTemplateListView} from '../../structure-template.service';
import {MaterialModules} from '../../app.module';

export default {
  title: 'Structure Template Page / Nav',
  argTypes: {
    newTemplate: { action: 'newTemplate' },
    selectTemplate: { action: 'selectTemplate' }
  },
  component: StructureTemplateNavComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, ...MaterialModules],
    }),
  ],
} as Meta;

const Template: Story<StructureTemplateNavComponent> = (args: StructureTemplateNavComponent) => ({
  component: StructureTemplateNavComponent,
  props: args,
});

export const EmptyExample = Template.bind({});
EmptyExample.args = {};

export const FullExample = Template.bind({});
FullExample.args = {
  structureTemplateListView: [
    {
      id: 'abc-123',
      name: 'My first template'
    } as StructureTemplateListView,
    {
      id: 'def-456',
      name: 'My second template'
    } as StructureTemplateListView
  ],
};
