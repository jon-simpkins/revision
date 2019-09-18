import {moduleMetadata, storiesOf} from '@storybook/angular';

import Scrap, {ScrapPrototype} from '../../types/Scrap';
import {Component, Input, OnInit} from '@angular/core';
import {ScreenService} from '../screen.service';
import {StoryService} from '../story.service';
import {stubStory001} from '../../stubStoryData/stubStory001';
import {ContentEditService} from '../content-edit.service';

import {AppModule} from '../app.module';

const TEMPLATE = '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"><div style="width: 90%;"><edit-panel-content [editContext]="contentEditService.editContext" [editContent]="contentEditService.currentContent"></edit-panel-content></div>';

@Component({
  template: TEMPLATE,
})
class EditPanelContent implements OnInit {

  @Input() scrapId;
  @Input() prototype;
  @Input() refId;

  constructor(public screenService: ScreenService, public storyService: StoryService, public contentEditService: ContentEditService) {
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
