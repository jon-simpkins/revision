import {moduleMetadata, storiesOf} from '@storybook/angular';
import {Component} from '@angular/core';
import {ContentEditService} from '../../services/content-edit.service';

import {ScrapPrototype} from '../../../types/Scrap';
import {AppModule} from '../../app.module';
import {HackUpdateService} from '../../services/hack-update.service';

const TEMPLATE = `
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <div style="width: 90%;"><edit-header></edit-header></div>
`;

@Component({
  template: TEMPLATE,
})
class EditHeaderWithNoEdit {
  constructor(contentEditService: ContentEditService) {
    contentEditService.cancelEdit();
  }
}

@Component({
  template: TEMPLATE,
})
class EditHeaderWithActiveEdit {
  constructor(contentEditService: ContentEditService, hackUpdateService: HackUpdateService) {
    contentEditService.startEdit(
      'myScrap001',
      ScrapPrototype.MOVIE_TITLE,
      null
    );
    // hackUpdateService included just to make the timer update
  }
}

storiesOf('Edit Header', module)
  .addDecorator(
    moduleMetadata({
      declarations: [EditHeaderWithNoEdit, EditHeaderWithActiveEdit],
      imports: [AppModule],
      providers: [],
    }),
  ).add('Renders correctly when not editing', () => {
    return {
      component: EditHeaderWithNoEdit
    };
  }).add('Renders correctly with active editing', () => {
    return {
      component: EditHeaderWithActiveEdit
    }
  });
