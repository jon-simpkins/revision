import { storiesOf, moduleMetadata } from '@storybook/angular';

import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material';
import {MatListModule} from '@angular/material';
import {MatSidenavModule} from '@angular/material';
import {MatIconModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatFormFieldModule, MatInputModule} from '@angular/material';
import {EditPanelContentComponent} from './edit-panel-content/edit-panel-content.component';
import {StoryDetailsComponent} from './story-details.component';
import {ViewNavComponent} from './view-nav/view-nav.component';
import {Component} from '@angular/core';
import {ScreenService} from '../screen.service';
import {ContentEditService} from '../content-edit.service';
import {StoryService} from '../story.service';
import {EditHeaderComponent} from './edit-header/edit-header.component';

const TEMPLATE = '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"><div style="width: 90%;"><story-details></story-details></div>';

@Component({
  template: TEMPLATE,
})
class StoryDetailsWithNoViewOptions {
  constructor(screenService: ScreenService, contentEditService: ContentEditService, storyService: StoryService) {
    screenService.setViewOptions([]);
    storyService.currentId = 'myStory1234';
    contentEditService.startEdit(
      'abc123',
      'textLine',
      {
        shortPrompt: 'Movie Title'
      },
      {
        text: 'Godfather 4'
      },
      false
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
      'threeLines',
      {
        shortPrompt: 'Similar Movies'
      },
      {
        textEntries: ['','','']
      },
      false
    );
  }
}

@Component({
  template: TEMPLATE,
})
class StoryDetailsWith2ViewOptions {
  constructor(screenService: ScreenService, contentEditService: ContentEditService, storyService: StoryService) {
    storyService.currentId = 'myStory1234';
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
    contentEditService.startEdit(
      null,
      'textLine',
      {},
      {},
      false
    );
  }
}

storiesOf('Story Details', module)
  .addDecorator(
    moduleMetadata({
      declarations: [EditHeaderComponent, StoryDetailsThreeLineEditWithNoViewOptions, EditPanelContentComponent, StoryDetailsComponent, StoryDetailsWith2ViewOptions, ViewNavComponent, StoryDetailsWithNoViewOptions],
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
  .add('Renders correctly with 2 view options', () => {
    return {
      component: StoryDetailsWith2ViewOptions
    };
  });
