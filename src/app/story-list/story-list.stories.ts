import { storiesOf, moduleMetadata } from '@storybook/angular';

import { Component } from '@angular/core';

import {StoryService} from '../services/story.service';
import {ScreenService} from '../services/screen.service';

import StorySummary from '../../types/StorySummary';
import {AppModule} from '../app.module';

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

@Component({
  template: `<story-list></story-list>`,
})
class StoryListWithNoEntries {
  constructor(storyService: StoryService, screenService: ScreenService) {
    screenService.showStoryDetails = false;
    screenService.updateShowStoryDetails = (newValue) => {
      alert('Changed showDetails to: ' + newValue);
    };

    storyService.storySummaries = [];
  }
}


storiesOf('Story List', module)
  .addDecorator(
    moduleMetadata({
      declarations: [StoryListWithStubs, StoryListWithNoEntries],
      imports: [AppModule],
      providers: [],
    }),
  ).add('Renders correctly with entries', () => {
    return {
      component: StoryListWithStubs
    };
  })
  .add('Renders correctly with no entries', () => {
    return {
      component: StoryListWithNoEntries
    };
  });
