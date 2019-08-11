import { Component } from '@angular/core';

import {credentials} from '../credentials';

declare var gapi: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Revision';

  API_KEY = credentials.api_key;
  CLIENT_ID = credentials.web.client_id;

  initApi() {
    const DISCOVERY_DOCS = [
      'https://docs.googleapis.com/$discovery/rest?version=v1&key=' + this.API_KEY];

    const SCOPES = "https://www.googleapis.com/auth/documents.readonly";

    gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: this.API_KEY,
        clientId: this.CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
      });
    });
  }

  signIn() {
    console.log('Sign in goes here');
    gapi.auth2.getAuthInstance().signIn();
  }

  fetchDoc() {
    console.log('Sign out goes here');
    gapi.client.docs.documents.get({
      documentId: '195j9eDD3ccgjQRttHhJPymLJUCOUjs-jmwTrekvdjFE'
    }).then(function(response) {
      console.log(response);
    });
  }
}
