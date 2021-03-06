import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';

import {ImportExportPageComponent} from './import-export-page.component';
import {MatButtonModule} from '@angular/material/button';
import {MonolithicDataService} from '../monolithic-data.service';

export default {
  title: 'Import + Export Page',
  component: ImportExportPageComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      providers: [MonolithicDataService],
      imports: [CommonModule, MatButtonModule],
    }),
  ],
} as Meta;

const Template: Story<ImportExportPageComponent> = (args: ImportExportPageComponent) => ({
  component: ImportExportPageComponent,
  props: args,
});

export const DefaultExample = Template.bind({});
DefaultExample.args = {};
