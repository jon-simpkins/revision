import {ApplicationRef, Injectable} from '@angular/core';

import {StoryService} from './story.service';
import Scrap, {ScrapContent, ScrapPrototype} from '../types/Scrap';
import EditContext from '../types/EditContext';
import UserEdit from '../types/UserEdit';
import {LoginGateService} from './login-gate.service';

// A service for tracking the current editing state of a Scrap
@Injectable({
  providedIn: 'root'
})
export class ContentEditService {

  currentScrapId: string = null; // ID of the current scrap being edited
  originalContent: ScrapContent = null; // The original state, so that we can perform updates
  editPrototype: ScrapPrototype = null; // The "type" of this scrap, which indicates the input variation and messaging
  editContext: EditContext = null; // The prompt, description, hints for presentation sake
  currentContent: ScrapContent = null; // The current state, yet to be saved
  editStartEpoch: number = null; // Epoch (ms) when editing began

  constructor(private appRef: ApplicationRef, private storyService: StoryService, private loginGateService: LoginGateService) {
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

  startEdit(scrapId: string, prototype: ScrapPrototype) {
    this.currentScrapId = String(Date.now()); // Maintain every edit as unique
    this.editPrototype = prototype;

    this.editContext = EditContext.fromPrototype(prototype);

    this.originalContent = this.storyService.fetchEditScrapContent(scrapId, prototype);
    this.currentContent = this.originalContent.clone(); // Create isolated clone

    this.editStartEpoch = Date.now();
  }

  receiveEdit(userEdit: UserEdit) {
    if (!this.currentScrapId) {
      return;
    }

    this.currentContent.receiveEdit(userEdit);
  }

  cancelEdit() {
    this.currentScrapId = null;
    this.appRef.tick();
  }

  acceptEdit() {
    let newScrap = new Scrap();
    newScrap.id = this.currentScrapId;
    newScrap.prototype = this.editPrototype;
    newScrap.content = this.currentContent;
    newScrap.startedEpoch = this.editStartEpoch;
    newScrap.completedEpoch = Date.now();
    newScrap.editedBy = this.loginGateService.loggedInEmail;

    this.storyService.updateScrap(
      newScrap
    ).then(() => {
      this.cancelEdit();
    });
  }

}
