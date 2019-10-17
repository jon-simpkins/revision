import {Component, OnInit} from '@angular/core';
import {LoginGateService} from '../services/login-gate.service';
import {ScreenService} from '../services/screen.service';
import {Router} from '@angular/router';

@Component({
  selector: 'logged-in-state',
  templateUrl: './logged-in-state.component.html',
  styleUrls: ['./logged-in-state.component.scss']
})
export class LoggedInStateComponent implements OnInit {

  constructor(public loginGateService: LoginGateService, public screenService: ScreenService, private router: Router) { }

  ngOnInit() {
    if (!this.loginGateService.loggedIn && !this.loginGateService.stillInitializing) {
      // Redirect to logged out page
      this.router.navigate(['/loggedOut']);
    }
  }

  signOut() {
    this.loginGateService.signOut();
  }
}
