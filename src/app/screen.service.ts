import {ApplicationRef, Injectable} from '@angular/core';
import {ScrapPrototype} from '../types/Scrap';

// Service to manage the state of "what screen am I on right now" when logged in
@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  showStoryDetails: boolean = false;
  currentViewScrapId: string = null;

  currentDetailsPanelView = 'split';
  showViewNav = false;
  showEditNav = false;

  viewOptions = [];
  editOptions = [
    {
      scrapId: 'abc123',
      prototype: ScrapPrototype.SIMILAR_MOVIES,
      label: 'Similar Movies'
    },
    {
      scrapId: 'def456',
      prototype: ScrapPrototype.MOVIE_TITLE,
      label: 'Movie Title'
    },
    {
      scrapId: 'def456',
      prototype: ScrapPrototype.LOG_LINE,
      label: 'Log Line'
    }
  ];

  constructor(private appRef: ApplicationRef) { }

  updateShowStoryDetails(newValue: boolean) : void {
    this.showStoryDetails = newValue;
    this.appRef.tick();
  }

  setViewOptions(options) {
    this.viewOptions = options;
    if (!this.viewOptions.length) {
      // If there are no view options, then insist on edit mode
      this.setDetailPanelView('edit', false);
    }
  }

  selectViewScrap(scrapId: string) {
    this.currentViewScrapId = scrapId;

    this.appRef.tick();
  }

  setDetailPanelView(newValue, doTick: boolean) {
    this.currentDetailsPanelView = newValue;

    if (this.currentDetailsPanelView === 'view') {
      this.showEditNav = false;
    }
    if (this.currentDetailsPanelView === 'edit') {
      this.showViewNav = false;
    }

    if (doTick) {
      this.appRef.tick();
    }
  }

  showViewPanel() {
    return this.currentDetailsPanelView === 'split' || this.currentDetailsPanelView === 'view';
  }

  showEditPanel() {
    return this.currentDetailsPanelView === 'split' || this.currentDetailsPanelView === 'edit';
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
