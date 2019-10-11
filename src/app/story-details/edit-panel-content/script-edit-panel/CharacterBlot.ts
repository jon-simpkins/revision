import * as Quill from 'quill';
import {storyServiceSingleton} from '../../../story.service';

const Inline = Quill.import('blots/inline');

const REFID_ATTRIBUTE = 'refid';

class CharacterBlot extends Inline {
  static blotName = 'character'; // This is the attribute that's set in FountainElements
  static tagName = 'character'; // DOM element to wrap the content in
  static className = 'css-character'; // For styling purposes

  constructor(domNode) {
    super(domNode);

    domNode.addEventListener('click', this.clickHandler);
  }

  static create(characterRefId) {
    const node = super.create(characterRefId);

    node.setAttribute(REFID_ATTRIBUTE, characterRefId);

    return node;
  }

  clickHandler(event) {
    const refId = event.target.getAttribute(REFID_ATTRIBUTE);
    storyServiceSingleton.navigateToCharacter(refId);
  }
}

Quill.register({'formats/character': CharacterBlot}, true);

export default CharacterBlot;
