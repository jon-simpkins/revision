import {ApplicationRef, Injectable} from '@angular/core';

// Naive service to update the view, since I'm not
// being smart enough to get updates to trigger correctly

// TODO: MAKE THIS SERVICE OBSOLETE, REMOVE
const FPS = 10;

@Injectable({
  providedIn: 'root'
})
export class HackUpdateService {
  constructor(private appRef: ApplicationRef) {
    console.log('starting hack updates');
    setInterval(() => {
      this.appRef.tick();
    }, 1000 / FPS);
  }
}
