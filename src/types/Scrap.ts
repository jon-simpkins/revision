import * as LZString from 'lz-string/libs/lz-string.js';
import {NLineContent} from './ScrapTypes/NLineContent';
import {TextLineContent} from './ScrapTypes/TextLineContent';
import { ScrapContent } from './ScrapTypes/ScrapContent';
import {StructureSpecContent} from './ScrapTypes/StructureSpecContent';

enum ScrapPrototype {
  MOVIE_TITLE,
  SIMILAR_MOVIES,
  LOG_LINE,
  TIME_FRAME,
  CHARACTER_LISTING,
  CHARACTER_NAME,
  CHARACTER_GENDER,
  CHARACTER_DRIVE,
  MOVIE_DURATION,
  STRUCTURE_SPEC,
}

enum ScrapContentType {
  TEXT_LINE,
  N_LINES,
  STORY_STRUCTURE
}

// Class for individual story scraps
class Scrap {

  id: string;

  // Stuff that tracks when / who made the change
  startedEpoch: number;
  completedEpoch: number;
  editedBy: string;

  prototype: ScrapPrototype;

  // Allows a single scrap to define N threads of related scraps,
  // each of which contains only one piece of content per unique <prototype, refId> pair
  refId: string;

  content: ScrapContent;

  generateSerialization(): string {
    const ARRAY_CHUNK_LENGTH = 20;

    const base64Content = LZString.compressToBase64(JSON.stringify([
      this.startedEpoch,
      this.completedEpoch,
      this.editedBy,
      this.refId,
      this.content.toString()
    ]));

    const contentArray = [];
    for (let i = 0; i < base64Content.length; i += ARRAY_CHUNK_LENGTH) {
      contentArray.push(base64Content.substr(i, ARRAY_CHUNK_LENGTH));
    }

    return `(${this.id}:${this.prototype}) ${contentArray.join(' ')}`;
  }

  static parseSerialization(serializedContent: string): Scrap | null {
    const LINE_REGEX = /\(([a-zA-Z0-9\-]+):([0-9]+)\)/; // Expect a uuid followed by a numeric ID

    const matchedHeader = LINE_REGEX.exec(serializedContent);

    if (!matchedHeader) {
      return null;
    }

    serializedContent = serializedContent.replace(matchedHeader[0], '');
    serializedContent = serializedContent.split(' ').join('');

    const jsonContent = JSON.parse(LZString.decompressFromBase64(serializedContent));

    const newScrap = new Scrap();

    newScrap.id = matchedHeader[1];
    newScrap.prototype = Number(matchedHeader[2]);
    newScrap.startedEpoch = jsonContent[0];
    newScrap.completedEpoch = jsonContent[1];
    newScrap.editedBy = jsonContent[2];
    newScrap.refId = jsonContent[3];
    newScrap.content = Scrap.parseScrapContent(jsonContent[4], newScrap.prototype);

    return newScrap;
  }

  static determineTypeFromPrototype(prototype: ScrapPrototype): ScrapContentType {
    switch (prototype) {
      case ScrapPrototype.MOVIE_TITLE:
      case ScrapPrototype.LOG_LINE:
      case ScrapPrototype.TIME_FRAME:
      case ScrapPrototype.MOVIE_DURATION:
      case ScrapPrototype.CHARACTER_NAME:
      case ScrapPrototype.CHARACTER_GENDER:
      case ScrapPrototype.CHARACTER_DRIVE:
        return ScrapContentType.TEXT_LINE;
      case ScrapPrototype.SIMILAR_MOVIES:
      case ScrapPrototype.CHARACTER_LISTING:
        return ScrapContentType.N_LINES;
      case ScrapPrototype.STRUCTURE_SPEC:
        return ScrapContentType.STORY_STRUCTURE;
    }

    return null;
  }

  static parseScrapContent(serializedContent: string, prototype: ScrapPrototype) {
    const contentType = Scrap.determineTypeFromPrototype(prototype);

    switch (contentType) {
      case ScrapContentType.TEXT_LINE:
        return TextLineContent.parse(serializedContent);
      case ScrapContentType.N_LINES:
        return NLineContent.parse(serializedContent);
      case ScrapContentType.STORY_STRUCTURE:
        return StructureSpecContent.parse(serializedContent);
    }

    return null;
  }

}

export {ScrapPrototype};

export default Scrap;
