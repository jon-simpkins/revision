import {moduleMetadata, storiesOf} from '@storybook/angular';

import {ViewPanelContentComponent} from './view-panel-content.component';

import {MatButtonModule, MatIconModule, MatListModule,} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import ViewContentBlock, {ViewContentBlockType} from './ViewContentBlock';
import ViewOption, {ViewOptionGenerators} from '../../../types/ViewOption';

import {stubStory001} from '../../../stubStoryData/stubStory001';
import {Component, Input, OnInit} from '@angular/core';
import {ScreenService} from '../../screen.service';
import {StoryService} from '../../story.service';
import Scrap from '../../../types/Scrap';

const TEMPLATE = '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"><div style="width: 90%;"><view-panel-content [viewContentBlocks]="screenService.viewContent"></view-panel-content></div>';

@Component({
  template: TEMPLATE,
})
class ViewPanelContent implements OnInit {

  @Input() viewOption: ViewOption;

  constructor(public screenService: ScreenService, public storyService: StoryService) {
    // Import the appropriate story scraps
    storyService.clearStory();
    storyService.currentId = 'myStory1234';
    stubStory001.forEach(line => {
      let scrap = Scrap.parseSerialization(line.trim());

      storyService.currentStoryScraps.set(scrap.id, scrap);
    });

    storyService.updateViewEditOptions();
  }

  ngOnInit(): void {
    this.storyService.setViewContent(this.viewOption);
  }
}

storiesOf('View Panel Content', module)
  .addDecorator(
    moduleMetadata({
      declarations: [ViewPanelContent, ViewPanelContentComponent],
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
  }).add('Renders changelog', () => {
      return {
        component: ViewPanelContent,
        props: {
          viewOption: new ViewOption(ViewOptionGenerators.CHANGELOG, null, null)
        }
      }
  }).add('Renders story summary', () => {
    return {
      component: ViewPanelContent,
      props: {
        viewOption: new ViewOption(ViewOptionGenerators.STORY_SUMMARY, null, null)
      }
    }
  });
