import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';

// This is the monolithic service that'll handle all the story data.
//
// This will certainly get broken up into smaller bits later on.
@Injectable({
  providedIn: 'root'
})
export class MonolithicDataService {

  constructor(private storage: StorageMap) { }

  getExampleValue(next: (value: any) => void): void {
    this.storage.get('example-key').subscribe(next);
  }

  setExampleValue(value: string, next: () => void): void {
    this.storage.set('example-key', value).subscribe(next);
  }

  clear(next: () => void): void {
    this.storage.clear().subscribe(next);
  }
}
