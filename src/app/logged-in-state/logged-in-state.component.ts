import {Component, OnInit} from '@angular/core';
import {LoginGateService} from '../services/login-gate.service';
import {ScreenService} from '../services/screen.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'logged-in-state',
  templateUrl: './logged-in-state.component.html',
  styleUrls: ['./logged-in-state.component.scss']
})
export class LoggedInStateComponent implements OnInit {

  constructor(public loginGateService: LoginGateService, public screenService: ScreenService, private router: Router, private route: ActivatedRoute) { }

  url: string;
  storyId: string;


  ngOnInit() {
    if (!this.loginGateService.loggedIn && !this.loginGateService.stillInitializing) {
      // Redirect to logged out page
      this.router.navigate(['/loggedOut']);
    }

    this.route.queryParamMap.subscribe((map: ParamMap) => {
      this.storyId = map.get('storyId');
    });

    this.route.url.subscribe((url) => {
      this.url = url.join('/');
    });
  }

  goToLandingPage() {
    this.router.navigate(['/']);
  }

  signOut() {
    this.loginGateService.signOut();
  }
}
