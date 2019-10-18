import {Component, Input, OnInit, OnChanges, AfterViewInit, ViewEncapsulation} from '@angular/core';

import * as uuid from 'uuid/v4';
import * as Quill from 'quill';
import {FountainElements} from '../../edit-panel-content/script-edit-panel/FountainElements';
import CharacterBlot from '../../edit-panel-content/script-edit-panel/CharacterBlot';
import {StoryService} from '../../../services/story.service';

@Component({
  selector: 'quill-readonly',
  templateUrl: './quill-readonly.component.html',
  styleUrls: ['./quill-readonly.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QuillReadonlyComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() plaintext: string;

  contentToShow;
  characterMap: Map<string, string>;

  editor: Quill;

  editorId = 'editorId' + uuid().replace('-', '');

  constructor(private storyService: StoryService) { }

  buildContentToShow() {
    this.characterMap = this.storyService.buildCharacterMap();
    const parsedScript = FountainElements.fromFullText(
      this.plaintext
        .replace(/\n$/, ''), // Remove the mandatory trailing newline (we'll add it back))
      this.characterMap
    );

    this.contentToShow = parsedScript.getQuillDeltas();

    debugger;
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
      modules: {
        toolbar: false
      }
    });
    Quill.register({'formats/character': CharacterBlot}, true);

    this.editor.setContents(this.contentToShow);
  }

}
