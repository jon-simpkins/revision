import {LineContent} from './LineContent';
import UserEdit from '../UserEdit';
import {StoryStructure} from '../StoryStructure/StoryStructure';
import {Script} from '../Script/Script';

enum TARGET_CONTENT_TYPE {
  SCRIPT_SCRAP, // Small bit of writing
  SUB_STRUCTURE, // StoryStructure
}

abstract class ScrapContent {
  text = '';
  lines: LineContent[] = [];
  storyStructure: StoryStructure;
  targetRefId: string;
  targetType: TARGET_CONTENT_TYPE;
  script: Script;

  abstract toString(): string;

  abstract clone(): ScrapContent;

  abstract receiveEdit(userEdit: UserEdit);
}

export {ScrapContent, TARGET_CONTENT_TYPE};
