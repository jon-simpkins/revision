import { storiesOf, moduleMetadata } from '@storybook/angular';

import { Component } from '@angular/core';

import { LoginGateService } from '../login-gate.service';

import {AppModule} from '../app.module';

@Component({
  template: `<login-gate></login-gate>`,
})
class LoginGateSplashScreen {
  constructor(loginGateService: LoginGateService) {
    loginGateService.stillInitializing = true;
  }
}

@Component({
  template: `<login-gate></login-gate>`,
})
class LoginGateLoggedIn {
  constructor(loginGateService: LoginGateService) {
    loginGateService.stillInitializing = false;
    loginGateService.loggedIn = true;
    loginGateService.loggedInEmail = 'my.account@gmail.com';
  }
}

@Component({
  template: `<login-gate></login-gate>`,
})
class LoginGateLoggedOut {
  constructor(loginGateService: LoginGateService) {
    loginGateService.stillInitializing = false;
    loginGateService.loggedIn = false;
    loginGateService.loggedInEmail = null;
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
  .add('Splash Screen', () => {
    return {
      component: LoginGateSplashScreen
    };
  }, { notes: 'Login state is determined by the LoginGateService' })
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
