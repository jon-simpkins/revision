import { ApplicationRef, Injectable } from '@angular/core';

import { createDoc, fetchDoc, updateBatch } from '../docsApi/docsApiHelpers';

import StorySummary from '../types/StorySummary';
import {generateHeaderCommands, updateContentLine} from '../docsApi/docsContentHelpers';
import {ScreenService} from './screen.service';
import Scrap, {ScrapContent, ScrapPrototype} from '../types/Scrap';

const STORY_SUMMARIES_KEY = 'STORY_SUMMARIES';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  storySummaries: StorySummary[] = [];
  currentId: string = null;
  currentStoryStr: string = '';
  currentStoryScraps: Map<string, Scrap> = new Map<string, Scrap>();

  constructor(private appRef: ApplicationRef, private screenService: ScreenService) {
    if (localStorage.getItem(STORY_SUMMARIES_KEY)) {
      this.storySummaries = JSON.parse(localStorage.getItem(STORY_SUMMARIES_KEY))
        .map(StorySummary.buildFromJSON);
    }
  }

  persistStorySummaries() {
    localStorage.setItem(
      STORY_SUMMARIES_KEY,
      JSON.stringify(this.storySummaries.map((summary) => {
        return summary.toJSON();
      })));
  }

  createStory() {
    createDoc('Revision Story ' + Date.now())
      .then((response) => {
        let newDocumentId = response.result.documentId;

        let newSummary = new StorySummary(
          newDocumentId,
          response.result.revisionId,
          Date.now()
        );

        this.storySummaries.push(newSummary);

        this.persistStorySummaries();
        this.appRef.tick();

        return this.writeHeader(newDocumentId);
      });
  }

  // Convenience function to write the boilerplate header for the document
  writeHeader(id) {
    return updateBatch(
      id,
      generateHeaderCommands()
    );
  }

  // Clear the local copy of a story, used when loading fresh
  clearStory() {
    this.currentId = null;
    this.screenService.currentViewScrapId = null;
    this.currentStoryScraps = new Map<string, Scrap>();
  }

  fetchStory(id) {
    if (id === this.currentId) {
      return;
    }

    this.clearStory();

    fetchDoc(id).then((response) => {
      this.currentId = id;
      this.currentStoryStr = JSON.stringify(response.result, null, 4);

      response.result.body.content.forEach((section) => {
        let textContent = null;
        try {
          textContent = section.paragraph.elements[0].textRun.content;

          let parsedScrap = Scrap.parseSerialization(textContent);

          if (parsedScrap) {
            this.currentStoryScraps[parsedScrap.id] = parsedScrap;
          }

        } catch(e) {}
      });

      console.log(this.currentStoryScraps);

      this.screenService.setViewOptions([
        {
          id: 'abc123',
          label: 'Title'
        },
        {
          id: 'def456',
          label: 'Logline'
        }
      ]);

      this.appRef.tick();
    });
  }

  fetchViewScrap(scrapId) {
    if (scrapId === 'abc123') {
      return 'abc123 (Title)';
    }
    return scrapId;
  }

  fetchEditScrapContent(scrapId: string, prototype: ScrapPrototype) : ScrapContent {
    let fetchedScrap = this.currentStoryScraps.get(scrapId);
    if (fetchedScrap) {
      return fetchedScrap.content;
    }

    // If it didn't currently exist, generate empty content of the correct
    // type given the prototype
    return Scrap.parseScrapContent(null, prototype);
  }

  updateScrap(newScrap: Scrap) {
    if (!this.currentId) {
      // No associated story, skip
    }

    let newSerialized = newScrap.generateSerialization();

    let updateCommand = updateContentLine(
      null,
      newSerialized
    );

    this.currentStoryScraps[newScrap.id] = newScrap;

    return updateBatch(
      this.currentId,
      [
        updateCommand
      ]
    );
  }

}
