import { storiesOf, moduleMetadata } from '@storybook/angular';

import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material';
import {MatListModule} from '@angular/material';
import {MatSidenavModule} from '@angular/material';
import {MatIconModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {StoryDetailsComponent} from './story-details.component';

storiesOf('Story Details', module)
  .addDecorator(
    moduleMetadata({
      declarations: [StoryDetailsComponent],
      imports: [MatButtonModule, MatIconModule, MatToolbarModule, MatListModule, MatSidenavModule, BrowserAnimationsModule],
      providers: [],
    }),
  ).add('Renders correctly', () => {
    return {
      template: '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"><div style="width: 90%;"><story-details></story-details></div>'
    };
  });
