import { Injectable } from '@angular/core';

import { signIn, registerSignedInListener, signOut, getLoginEmail } from '../docsApi/docsApiHelpers';

const SPLASH_SCREEN_MIN_DURATION = 1000;

@Injectable({
  providedIn: 'root'
})
export class LoginGateService {

  loggedIn = false;
  loggedInEmail = '';
  stillInitializing = true;

  constructor() {
    const startEpochMs = Date.now();
    registerSignedInListener((loggedIn) => {
      this.updateSignedIn(loggedIn);
      const remainingSplashDuration = SPLASH_SCREEN_MIN_DURATION - (Date.now() - startEpochMs);
      if (remainingSplashDuration <= 0) {
        this.stillInitializing = false;
      } else {
        setTimeout(() => {
          this.stillInitializing = false;
        }, remainingSplashDuration);
      }

    });
  }

  updateSignedIn(loggedIn) {
    this.loggedIn = loggedIn;
    this.loggedInEmail = getLoginEmail();
  }

  signIn(): void {
    signIn();
  }

  signOut(): void {
    signOut();
  }
}
