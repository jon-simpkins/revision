import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';

import {MaterialModules} from '../app.module';
import {AppRoutingModule} from '../app-routing.module';
import {ApplyTagNavComponent} from './apply-tag-nav.component';
import {Beat, Tag} from '../../protos';
import TagReference = Beat.TagReference;

export default {
  title: 'Beat Page / Apply Tag Nav',
  argTypes: {
    updateTagUses: {action: 'updateTagUses'},
  },
  component: ApplyTagNavComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, ...MaterialModules, AppRoutingModule],
    }),
  ],
} as Meta;

const Template: Story<ApplyTagNavComponent> = (args: ApplyTagNavComponent) => ({
  component: ApplyTagNavComponent,
  props: args,
});

const exampleTagMap: Map<string, Tag> = new Map<string, Tag>();
exampleTagMap.set('abc123', {
  id: 'abc123',
  name: 'Genre',
  description: 'What genre is this story / scene?',
  hasNumericValue: false,
  enumValues: [
    {
      label: 'Comedy',
      isDeprecated: false
    },
    {
      label: 'Drama',
      isDeprecated: false
    }
  ]
} as Tag);
exampleTagMap.set('def456', {
  id: 'def456',
  name: 'Action Setpiece',
  description: 'This beat would be one of those cool moments they reference in the trailer'
} as Tag);
exampleTagMap.set('ghi789', {
  id: 'ghi789',
  name: 'Intensity',
  description: 'How intense is this beat?',
  hasNumericValue: true,
} as Tag);

const exampleTagReferences = [
  {
    tagId: 'abc123',
    enumValue: 1
  },
  {
    tagId: 'def456',
  },
  {
    tagId: 'ghi789',
    enumValue: -1,
    numericValue: 11
  }
] as TagReference[];

export const EmptyExample = Template.bind({});
EmptyExample.args = {};


export const AllAvailableTagExample = Template.bind({});
AllAvailableTagExample.args = {
  tagMap: exampleTagMap
};

export const NoAvailableTagExample = Template.bind({});
NoAvailableTagExample.args = {
  tagReferences: exampleTagReferences,
  tagMap: exampleTagMap
};
