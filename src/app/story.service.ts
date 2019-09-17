import { ApplicationRef, Injectable } from '@angular/core';

import { createDoc, fetchDoc, updateBatch } from '../docsApi/docsApiHelpers';

import StorySummary from '../types/StorySummary';
import {generateHeaderCommands, updateContentLine} from '../docsApi/docsContentHelpers';
import {ScreenService} from './screen.service';
import Scrap, {ScrapPrototype} from '../types/Scrap';
import EditOption from '../types/EditOption';
import ViewOption from '../types/ViewOption';
import {generateAppropriateGenerator} from '../viewContentGenerators/viewContentGenerators';
import {StorybookService} from './storybook.service';
import {ScrapContent} from '../types/ScrapTypes/ScrapContent';
import {ScrapPile} from '../types/ScrapPile';

const STORY_SUMMARIES_KEY = 'STORY_SUMMARIES';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  storySummaries: StorySummary[] = [];
  currentId: string = null;
  currentScrapPile: ScrapPile = new ScrapPile();

  constructor(private appRef: ApplicationRef, private screenService: ScreenService, private storybookService: StorybookService) {
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
    this.currentScrapPile = new ScrapPile();
  }

  fetchStory(id) {
    if (id === this.currentId) {
      return;
    }

    this.clearStory();

    fetchDoc(id).then((response) => {
      this.currentId = id;

      response.result.body.content.forEach((section) => {
        let textContent = null;
        try {
          textContent = section.paragraph.elements[0].textRun.content;

          this.currentScrapPile.importFromSerialization(textContent);
        } catch (e) {
          console.error(e);
        }
      });

      this.updateViewEditOptions();
    });
  }

  updateViewEditOptions() {
    this.updateEditOptions();
    this.screenService.setViewOptions(ViewOption.generateViewOptions(this.currentScrapPile));
  }

  fetchEditScrapContent(scrapId: string, prototype: ScrapPrototype): ScrapContent {
    const fetchedScrap = this.currentScrapPile.scrapById.get(scrapId);
    if (fetchedScrap) {
      return fetchedScrap.content;
    }

    // If it didn't currently exist, generate empty content of the correct
    // type given the prototype
    return Scrap.parseScrapContent(null, prototype);
  }

  updateEditOptions() {
    this.screenService.setEditOptions(EditOption.buildOptions(this.currentScrapPile));
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

    this.currentScrapPile.addScrap(newScrap);

    this.updateViewEditOptions();

    if (this.storybookService.isInStorybook) {
      console.log('Serialization to update:');
      console.log(newSerialized);
      console.log('');
      return Promise.resolve(true); // If in storybook, don't sync with google docs
    }

    return updateBatch(
      this.currentId,
      [
        updateCommand
      ]
    );
  }

  setViewContent(viewOption: ViewOption) {
    this.screenService.currentViewOption = viewOption;
    this.refreshViewContent();
  }

  refreshViewContent() {
    const viewOption = this.screenService.currentViewOption;
    this.screenService.viewContent = generateAppropriateGenerator(viewOption)(
      this.currentScrapPile,
      viewOption.scrapId,
      viewOption.refId
    );
  }

}
