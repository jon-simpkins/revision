import { storiesOf, moduleMetadata } from '@storybook/angular';

import { Component } from '@angular/core';

import { LoginGateService } from '../services/login-gate.service';
import {ScreenService} from '../services/screen.service';
import {AppModule} from '../app.module';

const TEMPLATE = `
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <logged-in-state></logged-in-state>
`;

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
      declarations: [LoggedInStateWithStubs, LoggedInDetailStateWithStubs],
      imports: [AppModule],
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
