import {ApplicationRef, Injectable} from '@angular/core';

import {createDoc, fetchDoc} from '../docsApi/docsApiHelpers';

const STORY_SUMMARIES_KEY = 'STORY_SUMMARIES';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  storySummaries: object[] = [];
  currentId: string = null;
  currentStoryStr: string = '';

  constructor(private appRef: ApplicationRef) {
    if (localStorage.getItem(STORY_SUMMARIES_KEY)) {
      this.storySummaries = JSON.parse(localStorage.getItem(STORY_SUMMARIES_KEY));
    }
  }

  persistStorySummaries() {
    localStorage.setItem(STORY_SUMMARIES_KEY, JSON.stringify(this.storySummaries));
  }

  createStory() {
    createDoc('Revision Story ' + Date.now())
      .then((response) => {
        console.log(response);

        this.storySummaries.push({
          id: response.result.documentId,
          title: response.result.title
        });
        this.persistStorySummaries();
        this.appRef.tick();
      });
  }

  fetchStory(id) {
    if (id === this.currentId) {
      return;
    }

    fetchDoc(id).then((response) => {
      this.currentId = id;
      this.currentStoryStr = JSON.stringify(response.result, null, 4);
      this.appRef.tick();
    });
  }

}
