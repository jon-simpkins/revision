import {moduleMetadata, storiesOf} from '@storybook/angular';

import Scrap from '../../types/Scrap';
import ScrapPrototype from '../../types/ScrapPrototype';
import {Component, Input, OnInit} from '@angular/core';
import {ScreenService} from '../services/screen.service';
import {StoryService} from '../services/story.service';
import {stubStory001} from '../../stubStoryData/stubStory001';
import {ContentEditService} from '../services/content-edit.service';

import {AppModule} from '../app.module';
import {HackUpdateService} from '../services/hack-update.service';

const TEMPLATE = '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"><div style="width: 90%;"><edit-panel-content [editContext]="contentEditService.editContext" [editContent]="contentEditService.currentContent"></edit-panel-content></div>';

@Component({
  template: TEMPLATE,
})
class EditPanelContent implements OnInit {

  @Input() scrapId;
  @Input() prototype;
  @Input() refId;

  constructor(public hackUpdateService: HackUpdateService, public screenService: ScreenService, public storyService: StoryService, public contentEditService: ContentEditService) {
    // Import the appropriate story scraps
    storyService.clearStory();
    storyService.currentId = 'myStory1234';
    stubStory001.forEach(line => {
      storyService.currentScrapPile.addScrap(
        Scrap.parseSerialization(line.trim())
      );
    });

    storyService.updateViewEditOptions();
  }

  ngOnInit(): void {
    this.contentEditService.startEdit(this.scrapId, this.prototype, this.refId);
  }
}

const EXAMPLE_TYPES = [
  {
    storyName: 'Movie Duration',
    scrapId: '108e7615-bb30-4765-a820-07c949345098',
    prototype: ScrapPrototype.MOVIE_DURATION,
    refId: null
  },
  {
    storyName: 'Character Listing',
    scrapId: 'c7297e97-8fae-4f74-8b73-01810262de3a',
    prototype: ScrapPrototype.CHARACTER_LISTING,
    refId: null
  },
  {
    storyName: 'Initial Structure Spec',
    scrapId: null,
    prototype: ScrapPrototype.STRUCTURE_SPEC,
    refId: null
  },
  {
    storyName: 'Structure Block Summary',
    scrapId: '7cdb4e5f-f362-446d-851f-19511d448688',
    prototype: ScrapPrototype.STRUCTURE_BLOCK_SUMMARY,
    refId: 'f7bbed38-584f-4b50-b72c-138a84e4f534'
  },
  {
    storyName: 'Structure Block Content (New)',
    scrapId: null,
    prototype: ScrapPrototype.STRUCTURE_BLOCK_CONTENT,
    refId: 'f7bbed38-584f-4b50-b72c-138a84e4f534'
  },
  {
    storyName: 'Script Entry',
    scrapId: null,
    prototype: ScrapPrototype.SCRIPT,
    refId: 'b3cc9e5f-1c09-443f-befa-219d61d101e0'
  },
  {
    storyName: 'Sub-Structure',
    scrapId: null,
    prototype: ScrapPrototype.STRUCTURE_SPEC,
    refId: '2e30ef1d-3d1c-44e9-b499-6a60c05b0972'
  }
];

let editStoryModule = storiesOf('Edit Panel Content', module)
  .addDecorator(
    moduleMetadata({
      declarations: [EditPanelContent],
      imports: [AppModule],
      providers: [],
    })
  );

EXAMPLE_TYPES.forEach(entry => {

  editStoryModule.add(entry.storyName, () => {
    return {
      component: EditPanelContent,
      props: {
        scrapId: entry.scrapId,
        prototype: entry.prototype,
        refId: entry.refId
      }
    };
  });
});
