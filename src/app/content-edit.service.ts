import {ApplicationRef, Injectable} from '@angular/core';

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

  constructor(private appRef: ApplicationRef) {
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

  startEdit(scrapId: string, prototype: any, content: any, hasBeenSaved: boolean) {
    this.currentScrapId = scrapId;
    this.editPrototype = prototype;

    // TODO: fetch type, context based on prototype
    this.editContext = ContentEditService.buildContext(prototype);
    this.originalContent = JSON.parse(JSON.stringify(content)); // Create isolated clone
    this.currentContent = content;
    this.hasBeenSaved = hasBeenSaved;
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
  }

  acceptEdit() {
    console.log('Accepting edit!!!');
    console.log(this.currentScrapId);
    console.log(this.editPrototype);
    console.log(this.originalContent);
    console.log(this.currentContent);
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

}
