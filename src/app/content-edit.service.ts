import {ApplicationRef, Injectable} from '@angular/core';

import {StoryService} from './story.service';

// A service for tracking the current editing state of a Scrap
@Injectable({
  providedIn: 'root'
})
export class ContentEditService {

  currentScrapId: string = null; // ID of the current scrap being edited
  hasBeenSaved: boolean = false; // Has the current scrap been saved before?
  originalContent: any = null; // The original state, so that we can perform updates
  editPrototype: string = null; // The "type" of this scrap, which indicates the input variation and messaging
  editContext: any = null; // The prompt, description, hints for presentation sake
  currentContent: any = null; // The current state, yet to be saved
  editStartEpoch: number = null; // Epoch (ms) when editing began

  constructor(private appRef: ApplicationRef, private storyService: StoryService) {
    setInterval(() => {
      if (this.currentScrapId) {
        // Do an update check once a second when actively editing
        this.appRef.tick();
      }
    }, 1000);
  }

  getElapsedTimeStr() : string {
    let secElapsed = Math.floor((Date.now() - this.editStartEpoch) / 1000);

    let minElapsed = Math.floor(secElapsed / 60);
    secElapsed -= (60*minElapsed);

    let outputStr = '';
    if (minElapsed < 10) {
      outputStr += '0';
    }
    outputStr += minElapsed + ':';

    if (secElapsed < 10) {
      outputStr += '0';
    }
    outputStr += secElapsed;

    return outputStr;
  }

  startEdit(scrapId: string, prototype: string) {
    this.currentScrapId = scrapId;
    this.editPrototype = prototype;

    // TODO: fetch content, or default to empty state
    // TODO: determine if hasBeenSaved based on if story scrap is available

    this.editContext = ContentEditService.buildContext(prototype);

    this.originalContent = this.storyService.fetchEditScrap(scrapId);
    this.hasBeenSaved = true;
    if (!this.originalContent) {
      this.hasBeenSaved = false;
      this.originalContent = ContentEditService.buildEmptyContent(this.editContext.type);
    }

    this.currentContent = JSON.parse(JSON.stringify(this.originalContent)); // Create isolated clone

    this.editStartEpoch = Date.now();
  }

  receiveEdit(updatedValue, context) {
    if (!this.currentScrapId) {
      return;
    }

    switch (this.editContext.type) {
      case 'textLine':
      case 'textArea':
        this.currentContent.text = updatedValue;
        break;
      case 'threeLines':
        this.currentContent.textEntries[context] = updatedValue;
        break;
    }
  }

  cancelEdit() {
    this.currentScrapId = null;
    this.appRef.tick();
  }

  acceptEdit() {
    this.storyService.updateScrap(
      this.currentScrapId,
      this.editPrototype,
      this.originalContent,
      this.currentContent,
      this.hasBeenSaved
    ).then(() => {
      this.cancelEdit();
    });
  }



  static buildContext(prototype: string) {
    switch (prototype) {
      case 'similarMovies':
        return {
          type: 'threeLines',
          shortPrompt: 'Similar Movies'
        };
      case 'timeFrame':
        return {
          type: 'textLine',
          shortPrompt: 'Time Frame'
        };
      case 'logLine':
        return {
          type: 'textArea',
          shortPrompt: 'Log Line'
        };
      case 'movieTitle':
        return {
          type: 'textLine',
          shortPrompt: 'Movie Title'
        };
      case 'threeQuestions':
        return {
          type: 'threeLines',
          shortPrompt: 'Three Questions in Act 2'
        };
      case 'threeAnswers':
        return {
          type: 'threeLines',
          shortPrompt: 'Three Answers in Act 2'
        };
    }

    return {};
  }

  static buildEmptyContent(type: string) {
    switch (type) {
      case 'textLine':
        return {
          text: ''
        };
      case 'threeLines':
        return {
          textEntries: ['','','']
        }
    }

    return {};
  }

}
