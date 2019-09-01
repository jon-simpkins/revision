import { ApplicationRef, Injectable } from '@angular/core';

import { createDoc, fetchDoc, updateBatch } from '../docsApi/docsApiHelpers';

import StorySummary from '../types/StorySummary';
import {generateHeaderCommands, updateContentLine} from '../docsApi/docsContentHelpers';
import {ScreenService} from './screen.service';

const STORY_SUMMARIES_KEY = 'STORY_SUMMARIES';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  storySummaries: StorySummary[] = [];
  currentId: string = null;
  currentStoryStr: string = '';
  currentStoryScraps: any = {};

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
        // TODO: write / update the changelog
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
    this.currentStoryScraps = {};
  }

  fetchStory(id) {
    if (id === this.currentId) {
      return;
    }

    this.clearStory();

    fetchDoc(id).then((response) => {
      this.currentId = id;
      this.currentStoryStr = JSON.stringify(response.result, null, 4);

      // TODO: INITIALIZE currentStoryScraps

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

  fetchEditScrap(scrapId: string) {
    return this.currentStoryScraps[scrapId];
  }

  updateScrap(scrapId, prototype, originalContent, currentContent, hasBeenSaved: boolean) {
    if (!this.currentId) {
      // No associated story, skip
    }

    let originalSerialized = null;
    if (hasBeenSaved) {
      originalSerialized = StoryService.generateSerialization(
        scrapId,
        prototype,
        originalContent
      );
    }

    let newSerialized = StoryService.generateSerialization(
      scrapId,
      prototype,
      currentContent
    );

    let updateCommand = updateContentLine(
      originalSerialized,
      newSerialized
    );

    this.currentStoryScraps[scrapId] = currentContent;

    return updateBatch(
      this.currentId,
      [
        updateCommand
      ]
    );
  }

  static generateSerialization(scrapId: string, prototype: string, content: any) {
    const ARRAY_CHUNK_LENGTH = 10;

    let base64Content = btoa(JSON.stringify(content));

    let contentArray = [];
    for (let i = 0; i < base64Content.length; i += ARRAY_CHUNK_LENGTH) {
      contentArray.push(base64Content.substr(i, ARRAY_CHUNK_LENGTH));
    }

    return `(${scrapId}:${prototype}) ${contentArray.join(' ')}`
  }

  static parseSerialization(serializedContent: string) {
    const LINE_REGEX = /\(([a-zA-Z0-9]+):([a-zA-Z0-9]+)\)/;

    let matchedHeader = LINE_REGEX.exec(serializedContent);

    if (!matchedHeader) {
      return null;
    }

    let scrapId = matchedHeader[1];
    let prototype = matchedHeader[2];

    serializedContent = serializedContent.replace(matchedHeader[0], '');
    serializedContent = serializedContent.split(' ').join('');

    return {
      scrapId: scrapId,
      prototype: prototype,
      content: JSON.parse(atob(serializedContent))
    };
  }


}
