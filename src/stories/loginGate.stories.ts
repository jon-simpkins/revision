import { storiesOf } from '@storybook/angular';

import {LoginGateComponent} from '../app/login-gate/login-gate.component';

storiesOf('Login Gate', module)
  .add('Shows logged in', () => ({
    component: LoginGateComponent,
    props: {
      loggedIn: true
    },
  }))
  .add('Shows logged out', () => ({
    component: LoginGateComponent,
    props: {
      loggedIn: false
    },
  }));
