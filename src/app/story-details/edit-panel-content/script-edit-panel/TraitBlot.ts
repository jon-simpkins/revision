import * as Quill from 'quill';
import {storyServiceSingleton} from '../../../services/story.service';

const Inline = Quill.import('blots/inline');

const REFID_ATTRIBUTE = 'refid';

class TraitBlot extends Inline {
  static blotName = 'trait'; // This is the attribute that's set in FountainElements
  static tagName = 'trait'; // DOM element to wrap the content in
  static className = 'css-trait'; // For styling purposes

  constructor(domNode) {
    super(domNode);

    domNode.addEventListener('click', this.clickHandler);
  }

  static create(traitRefId) {
    const node = super.create(traitRefId);

    node.setAttribute(REFID_ATTRIBUTE, traitRefId);

    return node;
  }

  clickHandler(event) {
    const refId = event.target.getAttribute(REFID_ATTRIBUTE);
    storyServiceSingleton.navigateToTrait(refId);
  }
}

Quill.register({'formats/trait': TraitBlot}, true);

export default TraitBlot;
