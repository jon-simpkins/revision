import {Component, OnInit} from '@angular/core';

import {LoginGateService} from '../login-gate.service';
import {Router} from '@angular/router';

@Component({
  selector: 'logged-out-state',
  templateUrl: './logged-out-state.component.html',
  styleUrls: ['./logged-out-state.component.scss']
})
export class LoggedOutStateComponent implements OnInit {

  constructor(public loginGateService: LoginGateService, private router: Router) { }

  ngOnInit() {
    if (this.loginGateService.loggedIn && !this.loginGateService.stillInitializing) {
      // Redirect away from logged out page
      this.router.navigate(['/']);
    }
  }

  signIn() {
    this.loginGateService.signIn();
  }

}
