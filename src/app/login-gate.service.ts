import { Injectable, ApplicationRef } from '@angular/core';

import { signIn, registerSignedInListener, signOut, getLoginEmail } from '../docsApi/docsApiHelpers';

@Injectable({
  providedIn: 'root'
})
export class LoginGateService {

  loggedIn: boolean = false;
  loggedInEmail: string = '';

  constructor() {
    registerSignedInListener((loggedIn) => {
      this.updateSignedIn(loggedIn);
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
