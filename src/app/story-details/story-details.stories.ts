import { storiesOf, moduleMetadata } from '@storybook/angular';

import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material';
import {MatListModule} from '@angular/material';
import {MatSidenavModule} from '@angular/material';
import {MatIconModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {StoryDetailsComponent} from './story-details.component';
import {ViewNavComponent} from '../view-nav/view-nav.component';
import {Component} from '@angular/core';
import {ScreenService} from '../screen.service';

const TEMPLATE = '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"><div style="width: 90%;"><story-details></story-details></div>';

@Component({
  template: TEMPLATE,
})
class StoryDetailsWithNoViewOptions {
  constructor(screenService: ScreenService) {
    screenService.setViewOptions([]);
  }
}

@Component({
  template: TEMPLATE,
})
class StoryDetailsWith2ViewOptions {
  constructor(screenService: ScreenService) {
    screenService.setViewOptions([
      {
        id: 'abc123',
        label: 'My title'
      },
      {
        id: 'def456',
        label: 'Logline'
      }
    ]);
  }
}

storiesOf('Story Details', module)
  .addDecorator(
    moduleMetadata({
      declarations: [StoryDetailsComponent, StoryDetailsWith2ViewOptions, ViewNavComponent, StoryDetailsWithNoViewOptions],
      imports: [MatButtonModule, MatIconModule, MatToolbarModule, MatListModule, MatSidenavModule, BrowserAnimationsModule],
      providers: [],
    }),
  ).add('Renders correctly with no view options', () => {
    return {
      component: StoryDetailsWithNoViewOptions
    };
  })
  .add('Renders correctly with 2 view options', () => {
    return {
      component: StoryDetailsWith2ViewOptions
    };
  });
