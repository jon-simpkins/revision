
enum ScrapPrototype {
  MOVIE_TITLE,
  SIMILAR_MOVIES,
}

enum ScrapContentType {
  TEXT_LINE,
  THREE_LINES,
}

abstract class ScrapContent {

  toString() {}
}

class TextLineContent extends ScrapContent {
  text: string = '';

  toString() {
    return JSON.stringify({t: this.text});
  }

  static parse(stringified: string): TextLineContent {
    let retVal = new TextLineContent();
    retVal.text = JSON.parse(stringified).t;

    return retVal;
  }
}

class ThreeLineContent extends ScrapContent {
  textLines: object = ['', '', ''];

  toString() {
    return JSON.stringify({l: this.textLines});
  }

  static parse(stringified: string): ThreeLineContent {
    let retVal = new ThreeLineContent();
    retVal.textLines = JSON.parse(stringified).l;

    return retVal;
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
    const ARRAY_CHUNK_LENGTH = 10;

    let base64Content = btoa(JSON.stringify([
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

    let jsonContent = JSON.parse(atob(serializedContent));

    let newScrap = new Scrap();

    newScrap.id = matchedHeader[1];
    newScrap.prototype = Number(matchedHeader[2]);
    newScrap.startedEpoch = jsonContent[0];
    newScrap.completedEpoch = jsonContent[1];
    newScrap.editedBy = jsonContent[2];
    newScrap.content = Scrap.parseScrapContent(jsonContent[3], newScrap.prototype);

    console.log(newScrap.content);

    return newScrap;
  }

  static determineTypeFromPrototype(prototype: ScrapPrototype): ScrapContentType {
    switch (prototype) {
      case ScrapPrototype.MOVIE_TITLE:
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

export {ScrapPrototype, ThreeLineContent, TextLineContent};

export default Scrap;
