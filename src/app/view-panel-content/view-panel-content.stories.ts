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
      type: 'textLine',
      content: {
        shortPrompt: 'Movie Title',
        text: 'Die Hard 7'
      }
    }
  },
  {
    storyName: 'Log Line',
    viewContent: {
      type: 'textLine',
      content: {
        shortPrompt: 'Log Line',
        text: 'An cop goes undercover as a baker, and discovers a love of cake decorating.'
      }
    }
  },
  {
    storyName: 'Time Frame',
    viewContent: {
      type: 'textLine',
      content: {
        shortPrompt: 'Time Frame',
        text: 'A summer'
      }
    }
  },
  {
    storyName: 'Similar Movies',
    viewContent: {
      type: 'textEntries',
      content: {
        shortPrompt: 'Similar Movies',
        textEntries: [
          'Raiders of the Lost Ark',
          'Sound of Music',
          'The Dark Knight'
        ]
      }
    }
  },
  {
    storyName: 'Three Questions',
    viewContent: {
      type: 'textEntries',
      content: {
        shortPrompt: 'Three Questions in Act 2',
        textEntries: [
          'Why did the the droids come to Tatooine?',
          '',
          'What does the Joker want?'
        ]
      }
    }
  },
  {
    storyName: 'Three Answers',
    viewContent: {
      type: 'textEntries',
      content: {
        shortPrompt: 'Three Answers in Act 2',
        textEntries: [
          'Sent by Leia',
          '',
          'Chaos',
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
