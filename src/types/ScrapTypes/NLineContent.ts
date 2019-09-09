import UserEdit from '../UserEdit';
import {LineContent} from './LineContent';
import {ScrapContent} from './ScrapContent';

class NLineContent extends ScrapContent {
  lines: LineContent[];

  constructor(lines ?: LineContent[]) {
    super();

    this.lines = lines ? lines : [new LineContent('', true), new LineContent('', true), new LineContent('', true)];
  }

  toString() {
    return JSON.stringify(this.lines.map(line => {
      return line.serializeToJSON();
    }));
  }

  static parse(stringified: string): NLineContent {
    let retVal = new NLineContent();

    if (!stringified) {
      return retVal;
    }

    retVal.lines = JSON.parse(stringified).map(jsonLine => {
      return LineContent.parseFromJSON(jsonLine);
    });

    return retVal;
  }

  clone(): NLineContent {
    const newContent = new NLineContent();
    newContent.lines = this.lines.map(line => {
      return line.clone();
    });
    return newContent;
  }

  receiveEdit(userEdit: UserEdit) {
    if (userEdit.idx >= this.lines.length) {
      // Interpret as add line
      this.lines.push(
        new LineContent('', true)
      );
      return;
    }

    if (userEdit.textValue !== null) {
      this.lines[userEdit.idx].text = userEdit.textValue;
    } else {
      this.lines[userEdit.idx].active = userEdit.booleanValue;
    }
  }
}

export {NLineContent};
