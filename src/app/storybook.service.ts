import { Injectable } from '@angular/core';

// Simple service to indicate if we're in "Storybook" mode or not,
// to allow components to mock out their children based on that flag

@Injectable({
  providedIn: 'root'
})
export class StorybookService {
  isInStorybook: boolean = false;
}
