import { storiesOf, moduleMetadata } from '@storybook/angular';

import { Component } from '@angular/core';

import { LoggedInStateComponent } from './logged-in-state.component';
import { LoginGateService } from '../login-gate.service';

import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material';

import {StoryListComponent} from '../story-list/story-list.component';

@Component({
  template: `<logged-in-state></logged-in-state>`,
})
class LoggedInStateWithStubs {
  constructor(loginGateService: LoginGateService) {
    loginGateService.loggedIn = true;
    loginGateService.loggedInEmail = 'jon.simpkins@gmail.com';
    loginGateService.signOut = () => {
      alert('Successfully clicked "sign out"');
    };
  }
}


storiesOf('Logged In State', module)
  .addDecorator(
    moduleMetadata({
      declarations: [StoryListComponent, LoggedInStateComponent, LoggedInStateWithStubs],
      imports: [MatButtonModule, MatToolbarModule],
      providers: [],
    }),
  )
  .add('Renders correctly', () => {
    return {
      component: LoggedInStateWithStubs
    };
  });
