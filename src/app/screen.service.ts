import {ApplicationRef, Injectable} from '@angular/core';

// Service to manage the state of "what screen am I on right now" when logged in
@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  showStoryDetails: boolean = false;
  currentViewScrapId: string = null;

  viewOptions = [];

  constructor(private appRef: ApplicationRef) { }

  updateShowStoryDetails(newValue: boolean) : void {
    this.showStoryDetails = newValue;
    this.appRef.tick();
  }

  setViewOptions(options) {
    this.viewOptions = options;
  }

  selectViewScrap(scrapId: string) {
    this.currentViewScrapId = scrapId;

    this.appRef.tick();
  }

}
