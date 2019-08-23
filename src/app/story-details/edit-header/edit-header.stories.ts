import { storiesOf, moduleMetadata } from '@storybook/angular';
import {Component} from '@angular/core';
import {ScreenService} from '../../screen.service';
import {ContentEditService} from '../../content-edit.service';
import {StoryService} from '../../story.service';
import {EditPanelContentComponent} from '../edit-panel-content/edit-panel-content.component';
import {StoryDetailsComponent} from '../story-details.component';
import {ViewNavComponent} from '../view-nav/view-nav.component';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EditHeaderComponent} from './edit-header.component';

const TEMPLATE = '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"><div style="width: 90%;"><edit-header></edit-header></div>';

@Component({
  template: TEMPLATE,
})
class EditHeaderWithNoEdit {
  constructor(contentEditService: ContentEditService) {
    contentEditService.cancelEdit();
  }
}

@Component({
  template: TEMPLATE,
})
class EditHeaderWithActiveEdit {
  constructor(contentEditService: ContentEditService) {
    contentEditService.startEdit(
      'myScrap001',
      'textLine',
      {
        shortPrompt: 'Movie Title'
      },
      {
        text: 'Die Hard 7'
      },
      false
    );
  }
}

storiesOf('Edit Header', module)
  .addDecorator(
    moduleMetadata({
      declarations: [ EditHeaderComponent, EditPanelContentComponent, StoryDetailsComponent, ViewNavComponent, EditHeaderWithNoEdit, EditHeaderWithActiveEdit],
      imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatToolbarModule, MatListModule, MatSidenavModule, BrowserAnimationsModule],
      providers: [],
    }),
  ).add('Renders correctly when not editing', () => {
    return {
      component: EditHeaderWithNoEdit
    };
  }).add('Renders correctly with active editing', () => {
    return {
      component: EditHeaderWithActiveEdit
    }
  });
