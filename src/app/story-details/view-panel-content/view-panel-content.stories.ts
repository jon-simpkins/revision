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
  }).add('Renders scrap details for most recent edit', () => {
    return {
      component: ViewPanelContent,
      props: {
        viewOption: new ViewOption(ViewOptionGenerators.SCRAP_DETAILS, null, '1567691117955')
      }
    }
  }).add('Renders scrap details for most edit with next / prev', () => {
    return {
      component: ViewPanelContent,
      props: {
        viewOption: new ViewOption(ViewOptionGenerators.SCRAP_DETAILS, null, '1567682847943')
      }
    }
  }).add('Renders scrap details for least recent edit', () => {
    return {
      component: ViewPanelContent,
      props: {
        viewOption: new ViewOption(ViewOptionGenerators.SCRAP_DETAILS, null, '1567593539785')
      }
    }
  });
