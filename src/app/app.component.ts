import { Component } from '@angular/core';

import { fetchDoc, createDoc } from '../docsApi/docsApiHelpers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Revision';

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
