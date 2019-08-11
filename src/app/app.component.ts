import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Revision';

  signIn() {
    console.log('Sign in goes here');
  }

  signOut() {
    console.log('Sign out goes here');
  }
}
