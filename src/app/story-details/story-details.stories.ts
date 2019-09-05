import {moduleMetadata, storiesOf} from '@storybook/angular';

import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatSidenavModule, MatToolbarModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EditPanelContentComponent} from './edit-panel-content/edit-panel-content.component';
import {StoryDetailsComponent} from './story-details.component';
import {ViewNavComponent} from './view-nav/view-nav.component';
import {Component} from '@angular/core';
import {ScreenService} from '../screen.service';
import {ContentEditService} from '../content-edit.service';
import {StoryService} from '../story.service';
import {EditHeaderComponent} from './edit-header/edit-header.component';
import {EditNavComponent} from './edit-nav/edit-nav.component';
import Scrap, {ScrapPrototype, TextLineContent} from '../../types/Scrap';

import {stubStory001} from '../../stubStoryData/stubStory001';

import {ViewPanelContentComponent} from './view-panel-content/view-panel-content.component';

const TEMPLATE = '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"><div style="width: 90%;"><story-details></story-details></div>';

@Component({
  template: TEMPLATE,
})
class StoryDetailsWithNoViewOptions {
  constructor(screenService: ScreenService, contentEditService: ContentEditService, storyService: StoryService) {
    screenService.setViewOptions([]);
    storyService.currentId = 'myStory1234';
    storyService.currentStoryScraps = new Map<string, Scrap>();

    let myScrap = new Scrap();
    myScrap.content = new TextLineContent('Godfather 4');
    myScrap.prototype = ScrapPrototype.MOVIE_TITLE;

    storyService.currentStoryScraps.set('abc123', myScrap);

    contentEditService.startEdit(
      'abc123',
      ScrapPrototype.MOVIE_TITLE
    );
  }
}

@Component({
  template: TEMPLATE,
})
class StoryDetailsThreeLineEditWithNoViewOptions {
  constructor(screenService: ScreenService, contentEditService: ContentEditService, storyService: StoryService) {
    screenService.setViewOptions([]);
    storyService.currentId = 'myStory1234';
    contentEditService.startEdit(
      'abc123',
      ScrapPrototype.SIMILAR_MOVIES
    );
  }
}

@Component({
  template: TEMPLATE,
})
class StoryDetailsWithViewOptions {
  constructor(screenService: ScreenService, contentEditService: ContentEditService, storyService: StoryService) {
    // Import the appropriate story scraps
    storyService.clearStory();
    storyService.currentId = 'myStory1234';
    stubStory001.forEach(line => {
      let scrap = Scrap.parseSerialization(line.trim());

      storyService.currentStoryScraps.set(scrap.id, scrap);
    });

    storyService.updateViewEditOptions();
  }
}

storiesOf('Story Details', module)
  .addDecorator(
    moduleMetadata({
      declarations: [ViewPanelContentComponent, EditNavComponent, EditHeaderComponent, StoryDetailsThreeLineEditWithNoViewOptions, EditPanelContentComponent, StoryDetailsComponent, StoryDetailsWithViewOptions, ViewNavComponent, StoryDetailsWithNoViewOptions],
      imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatToolbarModule, MatListModule, MatSidenavModule, BrowserAnimationsModule],
      providers: [],
    }),
  ).add('Renders correctly with no view options', () => {
    return {
      component: StoryDetailsWithNoViewOptions
    };
  })
  .add('Renders correctly with 3-line edit', () => {
    return {
      component: StoryDetailsThreeLineEditWithNoViewOptions
    }
  })
  .add('Renders correctly with a full-fledged story', () => {
    return {
      component: StoryDetailsWithViewOptions
    };
  });
