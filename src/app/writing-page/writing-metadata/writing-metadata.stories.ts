import {moduleMetadata} from '@storybook/angular';
import {CommonModule} from '@angular/common';
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import {Meta, Story} from '@storybook/angular/types-6-0';

import {MaterialModules} from '../../app.module';
import {AppRoutingModule} from '../../app-routing.module';
import {Beat} from '../../../protos';
import {WritingMetadataComponent} from './writing-metadata.component';

export default {
  title: 'Metadata editor',
  argTypes: {
    beatMeatadataUpdates: {action: 'beatMeatadataUpdates'},
  },
  component: WritingMetadataComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, ...MaterialModules, AppRoutingModule],
    }),
  ],
} as Meta;

const Template: Story<WritingMetadataComponent> = (args: WritingMetadataComponent) => ({
  component: WritingMetadataComponent,
  props: args,
});

export const BasicExample = Template.bind({});
BasicExample.args = {
  editingBeat: {
    synopsis: 'My example synopsis',
    intendedDurationMs: (1000 * 3600 * 1.05)
  } as Beat
};
