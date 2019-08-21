import { Component } from '@angular/core';
import {LoginGateService} from '../login-gate.service';
import {ScreenService} from '../screen.service';

@Component({
  selector: 'logged-in-state',
  templateUrl: './logged-in-state.component.html',
  styleUrls: ['./logged-in-state.component.scss']
})
export class LoggedInStateComponent {

  constructor(public loginGateService: LoginGateService, public screenService: ScreenService) { }

  signOut() {
    this.loginGateService.signOut();
  }
}
