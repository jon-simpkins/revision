import {moduleMetadata, storiesOf} from '@storybook/angular';

import {ViewPanelContentComponent} from './view-panel-content.component';

import ViewOption, {ViewOptionGenerators} from '../../../types/ViewOption';

import {stubStory001} from '../../../stubStoryData/stubStory001';
import {Component, Input, OnInit} from '@angular/core';
import {ScreenService} from '../../services/screen.service';
import {StoryService} from '../../services/story.service';
import Scrap from '../../../types/Scrap';
import {AppModule} from '../../app.module';

const TEMPLATE = `
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <div style="width: 90%;"><view-panel-content [viewContentBlocks]="screenService.viewContent"></view-panel-content></div>
`;

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

      storyService.currentScrapPile.addScrap(scrap);
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
      declarations: [ViewPanelContent],
      imports: [AppModule],
      providers: [],
    }),
  ).add('Renders with no view content', () => {
    return {
      component: ViewPanelContentComponent
    };
  }).add('Renders writing tracker', () => {
    return {
      component: ViewPanelContent,
      props: {
        viewOption: new ViewOption(ViewOptionGenerators.WRITING_TRACKER, null, null)
      }
    };
  }).add('Renders story structure', () => {
    return {
      component: ViewPanelContent,
      props: {
        viewOption: new ViewOption(ViewOptionGenerators.STRUCTURE_BLOCK_VIEW, null, null)
      }
    };
  }).add('Renders changelog', () => {
    return {
      component: ViewPanelContent,
      props: {
        viewOption: new ViewOption(ViewOptionGenerators.CHANGELOG, null, null)
      }
    };
  }).add('Renders story summary', () => {
    return {
      component: ViewPanelContent,
      props: {
        viewOption: new ViewOption(ViewOptionGenerators.STORY_SUMMARY, null, null)
      }
    };
  }).add('Renders Character Listing', () => {
    return {
      component: ViewPanelContent,
      props: {
        viewOption: new ViewOption(ViewOptionGenerators.CHARACTER_LISTING, null, null)
      }
    };
  }).add('Renders Character Details', () => {
    return {
      component: ViewPanelContent,
      props: {
        viewOption: new ViewOption(ViewOptionGenerators.CHARACTER_DETAILS, null, null, '3398fac5-cea6-4d9c-affa-08afab444108')
      }
    };
  }).add('Renders Character Details for Incomplete Character', () => {
    return {
      component: ViewPanelContent,
      props: {
        viewOption: new ViewOption(ViewOptionGenerators.CHARACTER_DETAILS, null, null, '67bdf7e3-db18-4e66-a09e-0cb35203b31c')
      }
    };
  }).add('Renders the flattened script', () => {
    return {
      component: ViewPanelContent,
      props: {
        viewOption: new ViewOption(ViewOptionGenerators.FLATTENED_SCRIPT, null)
      }
    };
  }).add('Renders the Trait Listing', () => {
    return {
      component: ViewPanelContent,
      props: {
        viewOption: new ViewOption(ViewOptionGenerators.TRAIT_LISTING, null)
      }
    };
  }).add('Renders the full timeline', () => {
    return {
      component: ViewPanelContent,
      props: {
        viewOption: new ViewOption(ViewOptionGenerators.TIMELINE, null)
      }
    };
  });
