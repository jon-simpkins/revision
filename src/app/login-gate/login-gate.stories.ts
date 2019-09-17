import { storiesOf, moduleMetadata } from '@storybook/angular';

import { Component } from '@angular/core';

import { LoginGateService } from '../login-gate.service';
import { StorybookService } from '../storybook.service';

import {AppModule} from '../app.module';

@Component({
  template: `<login-gate></login-gate>`,
})
class LoginGateLoggedIn {
  constructor(loginGateService: LoginGateService, storybookService: StorybookService) {
    loginGateService.loggedIn = true;
    loginGateService.loggedInEmail = 'my.account@gmail.com';
    storybookService.isInStorybook = true;
  }
}

@Component({
  template: `<login-gate></login-gate>`,
})
class LoginGateLoggedOut {
  constructor(loginGateService: LoginGateService, storybookService: StorybookService) {
    loginGateService.loggedIn = false;
    loginGateService.loggedInEmail = null;
    storybookService.isInStorybook = true;
  }
}

storiesOf('Login Gate', module)
  .addDecorator(
    moduleMetadata({
      declarations: [LoginGateLoggedIn, LoginGateLoggedOut],
      imports: [AppModule],
      providers: [],
    }),
  )
  .add('Logged In', () => {
    return {
      component: LoginGateLoggedIn
    };
  }, { notes: 'Login state is determined by the LoginGateService' })
  .add('Logged Out', () => {
    return {
      component: LoginGateLoggedOut
    };
  }, { notes: 'Login state is determined by the LoginGateService' });
