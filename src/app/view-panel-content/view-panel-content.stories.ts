import { storiesOf, moduleMetadata } from '@storybook/angular';

import {MatButtonModule, MatListModule, MatToolbarModule} from '@angular/material';
import {ViewPanelContentComponent} from './view-panel-content.component';

const EXAMPLE_TYPES = [
  {
    storyName: 'Unknown Type',
    viewContent: {
      type: 'bob',
      content: {}
    }
  },
  {
    storyName: 'Movie Title',
    viewContent: {
      type: 'title',
      content: {
        title: 'Die Hard 7'
      }
    }
  },
  {
    storyName: 'Similar Movies',
    viewContent: {
      type: 'similarMovies',
      content: {
        titles: [
          'Raiders of the Lost Ark',
          'Sound of Music',
          'The Dark Knight'
        ]
      }
    }
  },
];

let storyModule = storiesOf('View Panel Content', module)
  .addDecorator(
    moduleMetadata({
      declarations: [ViewPanelContentComponent],
      imports: [MatButtonModule, MatToolbarModule, MatListModule],
      providers: [],
    })
  );

EXAMPLE_TYPES.forEach(entry => {
  storyModule.add(entry.storyName, () => {
    return {
      component: ViewPanelContentComponent,
      props: {
        viewContent: entry.viewContent
      }
    }
  })
});
