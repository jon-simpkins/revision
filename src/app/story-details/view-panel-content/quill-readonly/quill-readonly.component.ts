import {Component, Input, OnInit, OnChanges, AfterViewInit, ViewEncapsulation} from '@angular/core';

import * as uuid from 'uuid/v4';
import * as Quill from 'quill';
import {FountainElements} from '../../edit-panel-content/script-edit-panel/FountainElements';
import CharacterBlot from '../../edit-panel-content/script-edit-panel/CharacterBlot';
import {StoryService} from '../../../services/story.service';
import TraitBlot from '../../edit-panel-content/script-edit-panel/TraitBlot';
import QuillAllowedFormats from '../../edit-panel-content/script-edit-panel/QuillAllowedFormats';

@Component({
  selector: 'quill-readonly',
  templateUrl: './quill-readonly.component.html',
  styleUrls: ['./quill-readonly.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QuillReadonlyComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() plaintext: string;

  contentToShow;
  characterMap: Map<string, object>;
  traitMap: Map<string, object>;

  editor: Quill;

  editorId = 'editorId' + uuid().replace('-', '');

  constructor(private storyService: StoryService) { }

  buildContentToShow() {
    this.characterMap = this.storyService.buildCharacterMap();
    this.traitMap = this.storyService.buildTraitMap();
    const parsedScript = FountainElements.fromFullText(
      this.plaintext
        .replace(/\n$/, ''), // Remove the mandatory trailing newline (we'll add it back))
    );

    this.contentToShow = parsedScript.getQuillDeltas(this.characterMap, this.traitMap);
  }

  ngOnInit() {
    this.buildContentToShow();
  }

  ngOnChanges() {
    this.buildContentToShow();
    if (this.editor) {
      this.editor.setContents(this.contentToShow);
    }
  }

  ngAfterViewInit() {
    this.editor = new Quill(`#${this.editorId}`, {
      theme: 'snow',
      readOnly: true,
      formats: QuillAllowedFormats,
      modules: {
        toolbar: false
      }
    });
    Quill.register({'formats/character': CharacterBlot}, true);
    Quill.register({'formats/trait': TraitBlot}, true);

    this.editor.setContents(this.contentToShow);
  }

}
