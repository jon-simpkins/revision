import {Component} from '@angular/core';
import {WritingPageComponent} from './writing-page.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'writing-page-story',
  template: '<app-writing-page style="min-height: 800px;">hello</app-writing-page>',
  providers: [],
})
export class WritingPageMirageComponent extends WritingPageComponent {

}
