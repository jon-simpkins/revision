import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {WritingPageComponent} from './writing-page.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'writing-page-story',
  template: '<app-writing-page style="min-height: 800px;">hello</app-writing-page>',
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WritingPageMirageComponent extends WritingPageComponent {

  constructor(protected ref: ChangeDetectorRef) {
    super(ref);
  }
}
