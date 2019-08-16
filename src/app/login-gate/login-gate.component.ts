import { Component } from '@angular/core';

import { LoginGateService } from '../login-gate.service';
import { StorybookService } from '../storybook.service';

@Component({
  selector: 'login-gate',
  templateUrl: './login-gate.component.html',
  styleUrls: ['./login-gate.component.scss'],
})
export class LoginGateComponent {

  constructor(public loginGateService: LoginGateService, public storybookService: StorybookService) {

  }

  signIn() {
    this.loginGateService.signIn();
  }

  signOut() {
    this.loginGateService.signOut();
  }
}
