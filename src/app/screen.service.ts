import {ApplicationRef, Injectable} from '@angular/core';

// Service to manage the state of "what screen am I on right now" when logged in
@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  showStoryDetails: boolean = false;
  currentViewScrap: string = null;

  viewOptions = [
    {
      id: 'abc123',
      label: 'Title',
      isSelected: false
    },
    {
      id: 'def456',
      label: 'Logline',
      isSelected: false
    }
  ];

  constructor(private appRef: ApplicationRef) { }

  updateShowStoryDetails(newValue: boolean) : void {
    this.showStoryDetails = newValue;
    this.appRef.tick();
  }



  selectViewScrap(scrapId: string) {
    this.currentViewScrap = scrapId; // TODO: actually fetch the scrap from the story service
    this.viewOptions = this.viewOptions.map(option => {
      option.isSelected = option.id === scrapId;
      return option;
    });

    this.appRef.tick();
  }

}
