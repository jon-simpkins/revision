import { Injectable } from '@angular/core';

// This is the monolithic service that'll handle all the story data.
//
// This will certainly get broken up into smaller bits later on.
@Injectable({
  providedIn: 'root'
})
export class MonolithicDataService {

  constructor() { }

  exampleMethod(): void {
    console.log('it worked!');
  }
}
