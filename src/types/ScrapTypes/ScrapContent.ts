import {LineContent} from './LineContent';
import UserEdit from '../UserEdit';
import {StoryStructure} from '../StoryStructure/StoryStructure';

abstract class ScrapContent {
  text = '';
  lines: LineContent[] = [];
  storyStructure: StoryStructure;

  abstract toString(): string;

  abstract clone(): ScrapContent;

  abstract receiveEdit(userEdit: UserEdit);
}

export {ScrapContent};
