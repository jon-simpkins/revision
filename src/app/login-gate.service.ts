import { Injectable } from '@angular/core';

import { signIn, registerSignedInListener, signOut, getLoginEmail } from '../docsApi/docsApiHelpers';
import {Router} from '@angular/router';

const SPLASH_SCREEN_MIN_DURATION = 1000;

@Injectable({
  providedIn: 'root'
})
export class LoginGateService {

  loggedIn = false;
  loggedInEmail = '';
  stillInitializing = true;

  constructor(private router: Router) {
    const startEpochMs = Date.now();
    registerSignedInListener((loggedIn) => {
      const remainingSplashDuration = SPLASH_SCREEN_MIN_DURATION - (Date.now() - startEpochMs);
      if (remainingSplashDuration <= 0) {
        this.stillInitializing = false;
        this.updateSignedIn(loggedIn);
      } else {
        setTimeout(() => {
          this.stillInitializing = false;
          this.updateSignedIn(loggedIn);
        }, remainingSplashDuration);
      }
    });
  }

  updateSignedIn(loggedIn: boolean) {
    this.loggedIn = loggedIn;
    if (this.loggedIn) {
      this.loggedInEmail = getLoginEmail();

      const currentUrl = this.router.url;
      if (currentUrl === '/loggedOut') {
        this.router.navigate(['/']);
      }
    } else {
      this.loggedInEmail = null;

      this.router.navigate(['/loggedOut']);
    }
  }

  signIn(): void {
    signIn();
  }

  signOut(): void {
    signOut();
  }
}
