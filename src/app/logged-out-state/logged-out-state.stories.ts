import { storiesOf, moduleMetadata } from '@storybook/angular';

import { Component } from '@angular/core';

import { LoggedOutStateComponent } from './logged-out-state.component';
import { LoginGateService } from '../login-gate.service';

import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material';

@Component({
  template: `<logged-out-state></logged-out-state>`,
})
class LoggedOutStateWithStubs {
  constructor(loginGateService: LoginGateService) {
    loginGateService.loggedIn = false;
    loginGateService.signIn = () => {
      alert('Successfully clicked "sign in"');
    };
  }
}


storiesOf('Logged Out State', module)
  .addDecorator(
    moduleMetadata({
      declarations: [LoggedOutStateComponent, LoggedOutStateWithStubs],
      imports: [MatButtonModule, MatDividerModule],
      providers: [],
    }),
  )
  .add('Renders correctly', () => {
    return {
      component: LoggedOutStateWithStubs
    };
  });
