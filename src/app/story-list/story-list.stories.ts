import { storiesOf, moduleMetadata } from '@storybook/angular';

import { Component } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material';
import {MatListModule} from '@angular/material';

import {StoryListComponent} from './story-list.component';
import {StoryService} from '../story.service';
import {ScreenService} from '../screen.service';

import StorySummary from '../../types/StorySummary';

@Component({
  template: `<story-list></story-list>`,
})
class StoryListWithStubs {
  constructor(storyService: StoryService, screenService: ScreenService) {
    screenService.showStoryDetails = false;
    screenService.updateShowStoryDetails = (newValue) => {
      alert('Changed showDetails to: ' + newValue);
    };

    storyService.storySummaries = [
      new StorySummary(
        'abc123',
        'def456',
        Date.now() - 150000000
      ),
      new StorySummary(
        'ghi789',
        'jkl012',
        Date.now() - 150
      )
    ];
  }
}


storiesOf('Story List', module)
  .addDecorator(
    moduleMetadata({
      declarations: [StoryListComponent, StoryListWithStubs],
      imports: [MatButtonModule, MatToolbarModule, MatListModule],
      providers: [],
    }),
  ).add('Renders correctly with entries', () => {
    return {
      component: StoryListWithStubs
    };
  });
