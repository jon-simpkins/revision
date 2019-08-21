import { storiesOf, moduleMetadata } from '@storybook/angular';

import { Component } from '@angular/core';

import { LoggedInStateComponent } from './logged-in-state.component';
import { LoginGateService } from '../login-gate.service';

import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material';

import {StoryListComponent} from '../story-list/story-list.component';
import {StoryDetailsComponent} from '../story-details/story-details.component';
import {ScreenService} from '../screen.service';

@Component({
  template: `<logged-in-state></logged-in-state>`,
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
  template: `<logged-in-state></logged-in-state>`,
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
      declarations: [StoryListComponent, StoryDetailsComponent, LoggedInStateComponent, LoggedInStateWithStubs, LoggedInDetailStateWithStubs],
      imports: [MatButtonModule, MatToolbarModule],
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
