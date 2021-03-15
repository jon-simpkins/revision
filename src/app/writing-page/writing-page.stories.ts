import {moduleMetadata} from '@storybook/angular';
import {CommonModule} from '@angular/common';
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import {Meta, Story} from '@storybook/angular/types-6-0';

import {NebularModules} from '../app.module';
import {AppRoutingModule} from '../app-routing.module';
import {WritingPageComponent} from './writing-page.component';
import {Component} from '@angular/core';
import {WritingSubheaderComponent} from './writing-subheader/writing-subheader.component';
import {WritingContentComponent} from './writing-content/writing-content.component';
import {WritingSidebarComponent} from './writing-sidebar/writing-sidebar.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'writing-page-story',
  template: '<app-writing-page style="min-height: 800px;">hello</app-writing-page>',
  providers: [],
})
class WritingPageStoryComponent extends WritingPageComponent {

}

export default {
  title: 'Writing Page',
  argTypes: {},
  component: WritingPageStoryComponent,
  decorators: [
    moduleMetadata({
      declarations: [
        WritingPageComponent,
        WritingSubheaderComponent,
        WritingContentComponent,
        WritingSidebarComponent,
      ],
      imports: [CommonModule, ...NebularModules, AppRoutingModule],
    }),
  ],
} as Meta;

const Template: Story<WritingPageStoryComponent> = (args: WritingPageStoryComponent) => ({
  component: WritingPageStoryComponent,
  props: args,
});

export const EmptyExample = Template.bind({});

