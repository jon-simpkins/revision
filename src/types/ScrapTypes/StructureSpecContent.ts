import {ScrapContent} from './ScrapContent';
import UserEdit from '../UserEdit';
import {StoryStructure} from '../StoryStructure/StoryStructure';

class StructureSpecContent extends ScrapContent {
  storyStructure: StoryStructure;

  constructor(storyStructure?: StoryStructure) {
    super();

    this.storyStructure = storyStructure ? storyStructure : new StoryStructure();
  }

  static parse(stringified: string): StructureSpecContent {
    const retVal = new StructureSpecContent();

    if (!stringified) {
      return retVal;
    }

    retVal.storyStructure = StoryStructure.fromString(JSON.parse(stringified).st);

    return retVal;
  }

  toString() {
    return JSON.stringify({st: this.storyStructure.toString()});
  }

  clone(): StructureSpecContent {
    const newContent = new StructureSpecContent();
    newContent.storyStructure = this.storyStructure.clone();
    return newContent;
  }

  receiveEdit(userEdit: UserEdit) {
    // I *think* we can skip this, just leverage the shared reference to the structure object
  }
}

export {StructureSpecContent};
