import { storiesOf, moduleMetadata } from '@storybook/angular';

import { Component } from '@angular/core';

import {StoryService} from '../services/story.service';

import StorySummary from '../../types/StorySummary';
import {AppModule} from '../app.module';

const TEMPLATE = `
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <story-list></story-list>
`;

@Component({
  template: TEMPLATE,
})
class StoryListWithStubs {
  constructor(storyService: StoryService) {
    storyService.storySummaries = [
      new StorySummary(
        'abc123',
        'def456',
        Date.now() - 150000000,
        121,
        31
      ),
      new StorySummary(
        'ghi789',
        'jkl012',
        Date.now() - 150,
        1000,
        78
      )
    ];
  }
}

@Component({
  template: TEMPLATE,
})
class StoryListWithNoEntries {
  constructor(storyService: StoryService) {
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
