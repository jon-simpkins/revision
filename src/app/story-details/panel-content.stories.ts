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
      context: {
        shortPrompt: 'Movie Title'
      },
      content: {
        text: 'Die Hard 7'
      }
    }
  },
  {
    storyName: 'Log Line',
    content: {
      type: 'textArea',
      context: {
        shortPrompt: 'Log Line'
      },
      content: {
        text: 'A cop goes undercover as a baker, and discovers a love of cake decorating.'
      }
    }
  },
  {
    storyName: 'Time Frame',
    content: {
      type: 'textLine',
      context: {
        shortPrompt: 'Time Frame'
      },
      content: {
        text: 'A summer'
      }
    }
  },
  {
    storyName: 'Similar Movies',
    content: {
      type: 'threeLines',
      context: {
        shortPrompt: 'Similar Movies'
      },
      content: {
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
      context: {
        shortPrompt: 'Three Questions in Act 2'
      },
      content: {
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
      context: {
        shortPrompt: 'Three Answers in Act 2',
      },
      content: {
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
        viewContent: entry.content,
      }
    }
  });

  editStoryModule.add(entry.storyName, () => {
    return {
      component: EditPanelContentComponent,
      props: {
        editContent: entry.content.content,
        editContext: entry.content.context,
        editType: entry.content.type
      }
    }
  });
});
