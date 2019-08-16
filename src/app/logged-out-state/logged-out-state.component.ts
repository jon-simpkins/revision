import { Component } from '@angular/core';

import {LoginGateService} from '../login-gate.service';

@Component({
  selector: 'logged-out-state',
  templateUrl: './logged-out-state.component.html',
  styleUrls: ['./logged-out-state.component.scss']
})
export class LoggedOutStateComponent {

  constructor(public loginGateService: LoginGateService) { }

  signIn() {
    this.loginGateService.signIn();
  }

}
