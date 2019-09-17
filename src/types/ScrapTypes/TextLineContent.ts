import {ScrapContent} from './ScrapContent';
import UserEdit from '../UserEdit';

class TextLineContent extends ScrapContent {
  text = '';

  constructor(text?: string) {
    super();

    this.text = text ? text : '';
  }

  toString() {
    return JSON.stringify({t: this.text});
  }

  static parse(stringified: string): TextLineContent {
    let retVal = new TextLineContent();

    if (!stringified) {
      return retVal;
    }

    retVal.text = JSON.parse(stringified).t;

    return retVal;
  }

  clone(): TextLineContent {
    let newContent = new TextLineContent();
    newContent.text = this.text;
    return newContent;
  }

  receiveEdit(userEdit: UserEdit) {
    this.text = userEdit.textValue;
  }
}

export {TextLineContent};
