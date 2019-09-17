import { storiesOf, moduleMetadata } from '@storybook/angular';

import { Component } from '@angular/core';

import { LoginGateService } from '../login-gate.service';

import {AppModule} from '../app.module';

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
      declarations: [LoggedOutStateWithStubs],
      imports: [AppModule],
      providers: [],
    }),
  )
  .add('Renders correctly', () => {
    return {
      component: LoggedOutStateWithStubs
    };
  });
