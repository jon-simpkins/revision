import {moduleMetadata, storiesOf} from '@storybook/angular';

import {MatButtonModule} from '@angular/material/button';
import {
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSelectModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
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
import {StorybookService} from '../storybook.service';

const TEMPLATE = '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"><div style="width: 90%;"><story-details></story-details></div>';

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

      storyService.currentStoryScraps.set(scrap.id, scrap);
    });

    storyService.updateViewEditOptions();
  }
}

storiesOf('Story Details', module)
  .addDecorator(
    moduleMetadata({
      declarations: [ViewPanelContentComponent, EditNavComponent, EditHeaderComponent, StoryDetailsBlankSlate, EditPanelContentComponent, StoryDetailsComponent, StoryDetailsWithViewOptions, ViewNavComponent],
      imports: [MatSelectModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatToolbarModule, MatListModule, MatSidenavModule, BrowserAnimationsModule],
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
