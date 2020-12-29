import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';

import {MaterialModules} from '../../app.module';
import {TagNavComponent} from './tag-nav.component';
import {TagListView} from '../../tag.service';

export default {
  title: 'Tag Page / Nav',
  argTypes: {
    newTag: { action: 'newTag' },
    selectTag: { action: 'selectTag' },
    deleteTag: { action: 'deleteTag' }
  },
  component: TagNavComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, ...MaterialModules],
    }),
  ],
} as Meta;

const Template: Story<TagNavComponent> = (args: TagNavComponent) => ({
  component: TagNavComponent,
  props: args,
});

const exampleTagListView = [
  {
    id: 'abc-123',
    name: 'My first tag'
  } as TagListView,
  {
    id: 'def-456',
    name: 'My second tag'
  } as TagListView
];

export const EmptyExample = Template.bind({});
EmptyExample.args = {};

export const FullExampleNothingSelected = Template.bind({});
FullExampleNothingSelected.args = {
  tagListView: exampleTagListView
};

export const FullExampleSecondSelected = Template.bind({});
FullExampleSecondSelected.args = {
  selectedTagId: 'def-456',
  tagListView: exampleTagListView
};
