import { Injectable } from '@angular/core';

import { createDoc, fetchDoc, updateBatch } from '../../docsApi/docsApiHelpers';

import StorySummary from '../../types/StorySummary';
import {generateHeaderCommands, updateContentLine} from '../../docsApi/docsContentHelpers';
import {ScreenService} from './screen.service';
import Scrap, {ScrapPrototype} from '../../types/Scrap';
import EditOption from '../../types/EditOption';
import ViewOption, {ViewOptionGenerators} from '../../types/ViewOption';
import {generateAppropriateGenerator} from '../../viewContentGenerators/generateAppropriateViewGenerator';
import {StorybookService} from './storybook.service';
import {ScrapContent} from '../../types/ScrapTypes/ScrapContent';
import {ScrapPile} from '../../types/ScrapPile';

const STORY_SUMMARIES_KEY = 'STORY_SUMMARIES';

// Generic singleton for story service, to allow
// exposing it in the CharacterBlot click handler
export let storyServiceSingleton: StoryService;

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  storySummaries: StorySummary[] = [];
  currentId: string = null;
  currentScrapPile: ScrapPile = new ScrapPile();

  constructor(private screenService: ScreenService, private storybookService: StorybookService) {
    if (localStorage.getItem(STORY_SUMMARIES_KEY)) {
      this.storySummaries = JSON.parse(localStorage.getItem(STORY_SUMMARIES_KEY))
        .map(StorySummary.buildFromJSON);
    }

    storyServiceSingleton = this;
  }

  persistStorySummaries() {
    localStorage.setItem(
      STORY_SUMMARIES_KEY,
      JSON.stringify(this.storySummaries.map((summary) => {
        return summary.toJSON();
      })));
  }

  updateSummaryProgress() {
    this.storySummaries.forEach(summary => {
      if (summary.documentId !== this.currentId) {
        return;
      }

      summary.percentComplete = this.currentScrapPile.determineRemainingWork().percentComplete;
      summary.timeSpentSec = 0.001 * this.currentScrapPile.determineTimeSpentWriting().allTime;

    });
    this.persistStorySummaries();
  }

  selectRandomId(): string {
    const randomIdx = Math.floor(Math.random() * this.storySummaries.length);
    return this.storySummaries[randomIdx].documentId;
  }

  createStory() {
    createDoc('Revision Story ' + Date.now())
      .then((response) => {
        const newDocumentId = response.result.documentId;

        const newSummary = new StorySummary(
          newDocumentId,
          response.result.revisionId,
          Date.now(),
          0,
          0
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
        } catch (e) {}
      });

      this.screenService.currentViewOption = null; // Clear the view panel on load
      this.updateViewEditOptions();
    });
  }

  updateViewEditOptions() {
    this.updateEditOptions();
    this.screenService.setViewOptions(ViewOption.generateViewOptions(this.currentScrapPile));
    if (!this.screenService.currentViewOption) {
      this.screenService.currentViewOption = this.screenService.viewOptions[0];
      this.refreshViewContent();
    }
    this.screenService.showViewNav = false;
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

    const newSerialized = newScrap.generateSerialization();

    const updateCommand = updateContentLine(
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
    this.screenService.setViewOption(viewOption);
    this.refreshViewContent();
  }

  canNavigateViewBack(): boolean {
    return !!this.screenService.prevViewOptions.length;
  }

  navigateViewBack() {
    this.screenService.navigateViewBack();
    this.refreshViewContent();
  }

  canNavigateViewForward(): boolean {
    return !!this.screenService.nextViewOptions.length;
  }

  navigateViewForward() {
    this.screenService.navigateViewForward();
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

  navigateToCharacter(refId) {
    const characterViewOption = new ViewOption(
      ViewOptionGenerators.CHARACTER_DETAILS,
      null,
      null,
      refId
    );

    this.setViewContent(characterViewOption);
  }

  buildCharacterMap(): Map<string, object> {
    return this.currentScrapPile.buildCharacterMap();
  }
}
