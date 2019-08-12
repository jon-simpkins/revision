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

    gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: this.API_KEY,
        clientId: this.CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: 'https://www.googleapis.com/auth/documents'
      });
    });
  }

  signIn() {
    console.log('Signing in...');
    gapi.auth2.getAuthInstance().signIn();
  }

  fetchDoc() {
    gapi.client.docs.documents.get({
      documentId: '195j9eDD3ccgjQRttHhJPymLJUCOUjs-jmwTrekvdjFE'
    }).then(function(response) {
      console.log(response);
    });
  }

  createDoc() {
    gapi.client.docs.documents.create({
      title: 'Revision Test Doc: ' + Date.now()
    }).then(function(response) {
      console.log(response);
    });
  }
}
