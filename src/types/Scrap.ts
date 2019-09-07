import UserEdit from './UserEdit';
import * as LZString from 'lz-string/libs/lz-string.js';

enum ScrapPrototype {
  MOVIE_TITLE,
  SIMILAR_MOVIES,
  LOG_LINE,
  TIME_FRAME,
  STC_GENRE,
  STC_GENRE_EXPLANATION,
}

enum ScrapContentType {
  TEXT_LINE,
  THREE_LINES,
}

abstract class ScrapContent {
  text = '';
  textLines: string[] = [];

  abstract toString(): string;

  abstract clone(): ScrapContent;

  abstract receiveEdit(userEdit: UserEdit);
}

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

class ThreeLineContent extends ScrapContent {
  textLines: string[];

  constructor(textLines ?: string[]) {
    super();

    this.textLines = textLines ? textLines : ['', '', ''];
  }

  toString() {
    return JSON.stringify({l: this.textLines});
  }

  static parse(stringified: string): ThreeLineContent {
    let retVal = new ThreeLineContent();

    if (!stringified) {
      return retVal;
    }

    retVal.textLines = JSON.parse(stringified).l;

    return retVal;
  }

  clone(): ThreeLineContent {
    let newContent = new ThreeLineContent();
    newContent.textLines = JSON.parse(JSON.stringify(this.textLines))
    return newContent;
  }

  receiveEdit(userEdit: UserEdit) {
    this.textLines[userEdit.idx] = userEdit.textValue;
  }
}

// Class for individual story scraps
class Scrap {

  id: string;

  // Stuff that tracks when / who made the change
  startedEpoch: number;
  completedEpoch: number;
  editedBy: string;

  prototype: ScrapPrototype;

  content: ScrapContent;


  generateSerialization(): string {
    const ARRAY_CHUNK_LENGTH = 20;

    let base64Content = LZString.compressToBase64(JSON.stringify([
      this.startedEpoch,
      this.completedEpoch,
      this.editedBy,
      this.content.toString()
    ]));

    let contentArray = [];
    for (let i = 0; i < base64Content.length; i += ARRAY_CHUNK_LENGTH) {
      contentArray.push(base64Content.substr(i, ARRAY_CHUNK_LENGTH));
    }

    return `(${this.id}:${this.prototype}) ${contentArray.join(' ')}`;
  }

  static parseSerialization(serializedContent: string) : Scrap | null {
    const LINE_REGEX = /\(([a-zA-Z0-9]+):([a-zA-Z0-9]+)\)/;

    let matchedHeader = LINE_REGEX.exec(serializedContent);

    if (!matchedHeader) {
      return null;
    }

    serializedContent = serializedContent.replace(matchedHeader[0], '');
    serializedContent = serializedContent.split(' ').join('');

    let jsonContent = JSON.parse(LZString.decompressFromBase64(serializedContent));

    let newScrap = new Scrap();

    newScrap.id = matchedHeader[1];
    newScrap.prototype = Number(matchedHeader[2]);
    newScrap.startedEpoch = jsonContent[0];
    newScrap.completedEpoch = jsonContent[1];
    newScrap.editedBy = jsonContent[2];
    newScrap.content = Scrap.parseScrapContent(jsonContent[3], newScrap.prototype);

    return newScrap;
  }

  static determineTypeFromPrototype(prototype: ScrapPrototype): ScrapContentType {
    switch (prototype) {
      case ScrapPrototype.MOVIE_TITLE:
      case ScrapPrototype.LOG_LINE:
      case ScrapPrototype.TIME_FRAME:
      case ScrapPrototype.STC_GENRE:
      case ScrapPrototype.STC_GENRE_EXPLANATION:
        return ScrapContentType.TEXT_LINE;
      case ScrapPrototype.SIMILAR_MOVIES:
        return ScrapContentType.THREE_LINES;
    }

    return null;
  }

  static parseScrapContent(serializedContent: string, prototype: ScrapPrototype) {
    let contentType = Scrap.determineTypeFromPrototype(prototype);

    switch (contentType) {
      case ScrapContentType.TEXT_LINE:
        return TextLineContent.parse(serializedContent);
      case ScrapContentType.THREE_LINES:
        return ThreeLineContent.parse(serializedContent);
    }

    return null;
  }

}

export {ScrapContent, ScrapPrototype, ThreeLineContent, TextLineContent};

export default Scrap;
