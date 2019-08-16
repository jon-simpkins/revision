import { Component } from '@angular/core';
import {LoginGateService} from '../login-gate.service';
import {createDoc, fetchDoc} from '../../docsApi/docsApiHelpers';

@Component({
  selector: 'logged-in-state',
  templateUrl: './logged-in-state.component.html',
  styleUrls: ['./logged-in-state.component.scss']
})
export class LoggedInStateComponent {

  constructor(public loginGateService: LoginGateService) { }

  signOut() {
    this.loginGateService.signOut();
  }

  myFetchDoc() {
    fetchDoc('195j9eDD3ccgjQRttHhJPymLJUCOUjs-jmwTrekvdjFE')
      .then((response) => {
        console.log(response);
      });
  }

  myCreateDoc() {
    createDoc('Revision Test Doc: ' + Date.now())
      .then((response) => {
        console.log(response);
      });
  }

}
