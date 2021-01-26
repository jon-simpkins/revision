import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';

import {MaterialModules} from '../app.module';
import {AppRoutingModule} from '../app-routing.module';
import {ApplyTagNavComponent} from './apply-tag-nav.component';

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


export const EmptyExample = Template.bind({});
EmptyExample.args = {};
