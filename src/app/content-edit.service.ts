import { Injectable } from '@angular/core';

// A service for tracking the current editing state of a Scrap
@Injectable({
  providedIn: 'root'
})
export class ContentEditService {

  currentScrapId: string = null; // ID of the current scrap being edited
  hasBeenSaved: boolean = false; // Has the current scrap been saved before?
  originalContent: any = null; // The original state, so that we can perform updates
  editType: string = null; //
  editContext: any = null; // The prompt, description, hints for presentation sake
  currentContent: any = null; // The current state, yet to be saved
  editStartEpoch: number = null; // Epoch (ms) when editing began

  constructor() { }

  startEdit(scrapId: string, type: string, context: any, content: any, hasBeenSaved: boolean) {
    this.currentScrapId = scrapId;
    this.editType = type;
    this.editContext = context;
    this.originalContent = JSON.parse(JSON.stringify(content)); // Create isolated clone
    this.currentContent = content;
    this.hasBeenSaved = hasBeenSaved;
    this.editStartEpoch = Date.now();
  }

  receiveEdit(updatedValue, context) {
    if (!this.currentScrapId) {
      return;
    }

    switch (this.editType) {
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

}
