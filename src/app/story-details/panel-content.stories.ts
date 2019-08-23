import { storiesOf, moduleMetadata } from '@storybook/angular';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatListModule, MatToolbarModule, MatFormFieldModule, MatInputModule, MatIconModule} from '@angular/material';
import {ViewPanelContentComponent} from './view-panel-content/view-panel-content.component';
import {EditPanelContentComponent} from './edit-panel-content/edit-panel-content.component';

const EXAMPLE_TYPES = [
  {
    storyName: 'Unknown Type',
    content: {
      type: 'bob',
      content: {}
    }
  },
  {
    storyName: 'Movie Title',
    content: {
      type: 'textLine',
      content: {
        shortPrompt: 'Movie Title',
        text: 'Die Hard 7'
      }
    }
  },
  {
    storyName: 'Log Line',
    content: {
      type: 'textArea',
      content: {
        shortPrompt: 'Log Line',
        text: 'A cop goes undercover as a baker, and discovers a love of cake decorating.'
      }
    }
  },
  {
    storyName: 'Time Frame',
    content: {
      type: 'textLine',
      content: {
        shortPrompt: 'Time Frame',
        text: 'A summer'
      }
    }
  },
  {
    storyName: 'Similar Movies',
    content: {
      type: 'threeLines',
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
    content: {
      type: 'threeLines',
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
    content: {
      type: 'threeLines',
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

let viewStoryModule = storiesOf('View Panel Content', module)
  .addDecorator(
    moduleMetadata({
      declarations: [ViewPanelContentComponent],
      imports: [MatButtonModule, MatToolbarModule, MatListModule, BrowserAnimationsModule],
      providers: [],
    })
  );

let editStoryModule = storiesOf('Edit Panel Content', module)
  .addDecorator(
    moduleMetadata({
      declarations: [EditPanelContentComponent],
      imports: [MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, MatToolbarModule, MatListModule, BrowserAnimationsModule],
      providers: [],
    })
  );

EXAMPLE_TYPES.forEach(entry => {
  viewStoryModule.add(entry.storyName, () => {
    return {
      component: ViewPanelContentComponent,
      props: {
        viewContent: entry.content
      }
    }
  });

  editStoryModule.add(entry.storyName, () => {
    return {
      component: EditPanelContentComponent,
      props: {
        editContent: entry.content
      }
    }
  });
});
