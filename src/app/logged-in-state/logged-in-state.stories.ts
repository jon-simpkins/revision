import { storiesOf, moduleMetadata } from '@storybook/angular';

import { Component } from '@angular/core';

import { LoggedInStateComponent } from './logged-in-state.component';
import { LoginGateService } from '../login-gate.service';

import {
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatSelectModule,
  MatSliderModule,
  MatSlideToggleModule
} from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material';
import {MatSidenavModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material';

import {StoryListComponent} from '../story-list/story-list.component';
import {StoryDetailsComponent} from '../story-details/story-details.component';
import {ScreenService} from '../screen.service';
import {EditHeaderComponent} from '../story-details/edit-header/edit-header.component';
import {ViewNavComponent} from '../story-details/view-nav/view-nav.component';
import {ViewPanelContentComponent} from '../story-details/view-panel-content/view-panel-content.component';
import {EditPanelContentComponent} from '../story-details/edit-panel-content/edit-panel-content.component';
import {EditNavComponent} from '../story-details/edit-nav/edit-nav.component';
import {StructureEditorComponent} from '../structure-editor/structure-editor.component';
import {BeatCardListComponent} from '../structure-editor/beat-card-list/beat-card-list.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

const TEMPLATE = `<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"><logged-in-state></logged-in-state>`;

@Component({
  template: TEMPLATE,
})
class LoggedInStateWithStubs {
  constructor(loginGateService: LoginGateService, screenService: ScreenService) {
    loginGateService.loggedIn = true;
    loginGateService.loggedInEmail = 'jon.simpkins@gmail.com';
    loginGateService.signOut = () => {
      alert('Successfully clicked "sign out"');
    };
    screenService.showStoryDetails = false;
  }
}

@Component({
  template: TEMPLATE,
})
class LoggedInDetailStateWithStubs {
  constructor(loginGateService: LoginGateService, screenService: ScreenService) {
    loginGateService.loggedIn = true;
    loginGateService.loggedInEmail = 'jon.simpkins@gmail.com';
    loginGateService.signOut = () => {
      alert('Successfully clicked "sign out"');
    };
    screenService.showStoryDetails = true;
  }
}


storiesOf('Logged In State', module)
  .addDecorator(
    moduleMetadata({
      declarations: [EditHeaderComponent, StructureEditorComponent, BeatCardListComponent, EditNavComponent, ViewNavComponent, ViewPanelContentComponent, EditPanelContentComponent,
        StoryListComponent, StoryDetailsComponent, LoggedInStateComponent, LoggedInStateWithStubs, LoggedInDetailStateWithStubs
      ],
      imports: [MatFormFieldModule, MatInputModule, MatCardModule, MatSelectModule, MatSliderModule, MatSlideToggleModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule, MatToolbarModule, BrowserAnimationsModule],
      providers: [],
    }),
  ).add('Renders correctly in story list', () => {
    return {
      component: LoggedInStateWithStubs
    };
  })
  .add('Renders correctly in story details', () => {
    return {
      component: LoggedInDetailStateWithStubs
    }
  });
