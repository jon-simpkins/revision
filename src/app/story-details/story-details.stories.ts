import {moduleMetadata, storiesOf} from '@storybook/angular';

import {Component} from '@angular/core';
import {ScreenService} from '../services/screen.service';
import {ContentEditService} from '../services/content-edit.service';
import {StoryService} from '../services/story.service';

import Scrap from '../../types/Scrap';

import {stubStory001} from '../../stubStoryData/stubStory001';

import {StorybookService} from '../services/storybook.service';

import {AppModule} from '../app.module';

const TEMPLATE = `
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <div style="width: 90%;"><story-details></story-details></div>
`;

@Component({
  template: TEMPLATE,
})
class StoryDetailsBlankSlate {
  constructor(screenService: ScreenService, contentEditService: ContentEditService, storyService: StoryService, storybookService: StorybookService) {
    contentEditService.getCurrentUserEmail = () => {
      return 'dummy.user@gmail.com';
    };
    storybookService.isInStorybook = true;
    storyService.clearStory();
    storyService.currentId = 'myStory1234';

    // Notably, don't create any scraps

    storyService.updateViewEditOptions();
  }
}

@Component({
  template: TEMPLATE,
})
class StoryDetailsWithViewOptions {
  constructor(screenService: ScreenService, contentEditService: ContentEditService, storyService: StoryService, storybookService: StorybookService) {
    // Import the appropriate story scraps
    contentEditService.getCurrentUserEmail = () => {
      return 'dummy.user@gmail.com';
    };
    storybookService.isInStorybook = true;
    storyService.clearStory();
    storyService.currentId = 'myStory1234';
    stubStory001.forEach(line => {
      let scrap = Scrap.parseSerialization(line.trim());

      storyService.currentScrapPile.addScrap(scrap);
    });

    storyService.updateViewEditOptions();
  }
}

storiesOf('Story Details', module)
  .addDecorator(
    moduleMetadata({
      declarations: [ StoryDetailsBlankSlate, StoryDetailsWithViewOptions ],
      imports: [AppModule],
      providers: [],
    }),
  ).add('Renders correctly with a blank slate', () => {
    return {
      component: StoryDetailsBlankSlate
    };
  })
  .add('Renders correctly with a full-fledged story', () => {
    return {
      component: StoryDetailsWithViewOptions
    };
  });
