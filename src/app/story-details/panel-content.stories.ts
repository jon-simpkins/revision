import {moduleMetadata, storiesOf} from '@storybook/angular';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatToolbarModule
} from '@angular/material';
import {EditPanelContentComponent} from './edit-panel-content/edit-panel-content.component';
import {ScrapPrototype, TextLineContent} from '../../types/Scrap';
import EditContext from '../../types/EditContext';
import {NLineContent} from '../../types/ScrapTypes/NLineContent';
import {LineContent} from '../../types/ScrapTypes/LineContent';
import {ScrapPile} from '../../types/ScrapPile';

const EXAMPLE_TYPES = [
  {
    storyName: 'Movie Title',
    prototype: ScrapPrototype.MOVIE_TITLE,
    content: new TextLineContent('Die Hard 7')
  },
  {
    storyName: 'Time Frame',
    prototype: ScrapPrototype.TIME_FRAME,
    content: new TextLineContent('Over the summer of 1969')
  },
  {
    storyName: 'Log Line',
    prototype: ScrapPrototype.LOG_LINE,
    content: new TextLineContent('A cop goes undercover as a baker, and discovers a love of cake decorating.')
  },
  {
    storyName: 'Similar Movies',
    prototype: ScrapPrototype.SIMILAR_MOVIES,
    content: new NLineContent([
      new LineContent('Raiders of the Lost Ark', true),
      new LineContent('Sound of Music', true),
      new LineContent('The Dark Knight', true)
    ])
  },
  {
    storyName: 'Character Listing',
    prototype: ScrapPrototype.CHARACTER_LISTING,
    content: new NLineContent()
  }
];


let editStoryModule = storiesOf('Edit Panel Content', module)
  .addDecorator(
    moduleMetadata({
      declarations: [EditPanelContentComponent],
      imports: [MatSlideToggleModule, MatSelectModule, MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, MatToolbarModule, MatListModule, BrowserAnimationsModule],
      providers: [],
    })
  );

EXAMPLE_TYPES.forEach(entry => {

  editStoryModule.add(entry.storyName, () => {
    return {
      component: EditPanelContentComponent,
      props: {
        editContent: entry.content,
        editContext: EditContext.fromPrototype(entry.prototype, new ScrapPile(), null)
      }
    }
  });
});
