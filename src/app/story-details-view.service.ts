import {ApplicationRef, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoryDetailsViewService {

  currentPanelView = 'split';
  showViewNav = false;
  showEditNav = false;

  constructor(private appRef: ApplicationRef) { }

  setPanelView(newValue) {
    this.currentPanelView = newValue;

    if (this.currentPanelView === 'view') {
      this.showEditNav = false;
    }
    if (this.currentPanelView === 'edit') {
      this.showViewNav = false;
    }

    this.appRef.tick();
  }

  showViewPanel() {
    return this.currentPanelView === 'split' || this.currentPanelView === 'view';
  }

  showEditPanel() {
    return this.currentPanelView === 'split' || this.currentPanelView === 'edit';
  }

  toggleViewNav() {
    this.showViewNav = !this.showViewNav;

    this.appRef.tick();
  }

  toggleEditNav() {
    this.showEditNav = !this.showEditNav;

    this.appRef.tick();
  }
}
