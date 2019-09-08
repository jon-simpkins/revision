import {LineContent} from './LineContent';
import UserEdit from '../UserEdit';

abstract class ScrapContent {
  text = '';
  lines: LineContent[] = [];

  abstract toString(): string;

  abstract clone(): ScrapContent;

  abstract receiveEdit(userEdit: UserEdit);
}

export {ScrapContent};
