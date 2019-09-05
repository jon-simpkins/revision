import {moduleMetadata, storiesOf} from '@storybook/angular';

import {ViewPanelContentComponent} from './view-panel-content.component';

import {MatButtonModule, MatIconModule, MatListModule,} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import ViewContentBlock, {ViewContentBlockType} from './ViewContentBlock';
import ViewOption, {ViewOptionGenerators} from '../../../types/ViewOption';

storiesOf('View Panel Content', module)
  .addDecorator(
    moduleMetadata({
      declarations: [ViewPanelContentComponent],
      imports: [MatButtonModule, MatIconModule, MatListModule, BrowserAnimationsModule],
      providers: [],
    }),
  ).add('Renders with no view content', () => {
    return {
      component: ViewPanelContentComponent
    };
  }).add('Renders with content', () => {
  return {
    component: ViewPanelContentComponent,
    props: {
      viewContentBlocks: [
        new ViewContentBlock(ViewContentBlockType.HEADER, 'Hello World'),
        new ViewContentBlock(ViewContentBlockType.PARAGRAPH, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ipsum felis, bibendum eu elementum quis, eleifend eget sapien. Suspendisse pulvinar egestas ligula bibendum gravida. Cras ac ante dignissim, placerat sem et, blandit sem. Aenean imperdiet et sapien id sollicitudin. Phasellus in urna a ligula viverra aliquet. Donec vitae nunc vel tellus scelerisque dapibus. Donec eu scelerisque nunc.'),
        new ViewContentBlock(ViewContentBlockType.LIST_ENTRY, 'List entry 1'),
        new ViewContentBlock(ViewContentBlockType.LIST_ENTRY, 'List entry 2'),
        new ViewContentBlock(ViewContentBlockType.LIST_ENTRY, 'List entry 3'),
        new ViewContentBlock(ViewContentBlockType.PARAGRAPH, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ipsum felis, bibendum eu elementum quis, eleifend eget sapien. Suspendisse pulvinar egestas ligula bibendum gravida. Cras ac ante dignissim, placerat sem et, blandit sem. Aenean imperdiet et sapien id sollicitudin. Phasellus in urna a ligula viverra aliquet. Donec vitae nunc vel tellus scelerisque dapibus. Donec eu scelerisque nunc.'),
        new ViewContentBlock(ViewContentBlockType.LIST_ENTRY, 'This is a link to another scrap', new ViewOption(ViewOptionGenerators.SCRAP_DETAILS, null, 'abc123')),
        new ViewContentBlock(ViewContentBlockType.LIST_ENTRY, 'One more link', new ViewOption(ViewOptionGenerators.SCRAP_DETAILS, null, 'def456')),
        new ViewContentBlock(ViewContentBlockType.PARAGRAPH, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ipsum felis, bibendum eu elementum quis, eleifend eget sapien. Suspendisse pulvinar egestas ligula bibendum gravida. Cras ac ante dignissim, placerat sem et, blandit sem. Aenean imperdiet et sapien id sollicitudin. Phasellus in urna a ligula viverra aliquet. Donec vitae nunc vel tellus scelerisque dapibus. Donec eu scelerisque nunc.'),
      ]
    }
  };
});
