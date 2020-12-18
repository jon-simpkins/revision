import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';

import {LandingPageComponent} from './landing-page.component';

export default {
  title: 'Landing Page',
  component: LandingPageComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule],
    }),
  ],
} as Meta;

const Template: Story<LandingPageComponent> = (args: LandingPageComponent) => ({
  component: LandingPageComponent,
  props: args,
});

export const DefaultExample = Template.bind({});
DefaultExample.args = {};
