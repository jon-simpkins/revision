
import Op from 'quill-delta/dist/Op';

enum FountainElementType {
  EMPTY,
  ACTION,
  SCENE_HEADER,
  TRANSITION,
  CENTERED,
  CHARACTER,
  PARENTHETICAL,
  DIALOGUE,
}

// Element constituting a line in a .fountain-formatted document
class FountainElement {
  text: string;
  type = FountainElementType.ACTION;

  constructor(text: string) {
    this.text = text;
  }

  toDelta(): Op {
    return {
      insert: this.text + '\n',
      attributes: this.getDeltaAttributes()
    };
  }

  getDeltaAttributes() {
    switch (this.type) {
      case FountainElementType.EMPTY:
      case FountainElementType.ACTION:
        return {};
      case FountainElementType.SCENE_HEADER:
        return {
          bold: true,
        };
      case FountainElementType.CENTERED:
        return {
          align: 'center'
        };
      case FountainElementType.TRANSITION:
        return {
          bold: true,
          align: 'right'
        };
      case FountainElementType.CHARACTER:
        return {
          bold: true,
          indent: 4
        };
      case FountainElementType.PARENTHETICAL:
        return {
          indent: 3
        };
      case FountainElementType.DIALOGUE:
        return {
          indent: 2
        };
    }

    throw new Error(`Unexpected type: ${this.type}`);
  }

  sameElement(other: FountainElement) {
    return other.type === this.type;
  }
}

class FountainElements {
  lines: FountainElement[];

  static fromTextLines(textLines: string[]): FountainElements {
    const retVal = new FountainElements();
    retVal.lines = textLines.map(textLine => new FountainElement(textLine));

    retVal.applyEmpty();
    retVal.applySceneHeaders();
    retVal.applyCentered();
    retVal.applySceneTransitions();
    retVal.applyCharacters();
    retVal.applyParentheticalDialogue();

    return retVal;
  }

  emptyBeforeAfter(idx: number): boolean {
    return this.emptyBefore(idx) && this.emptyAfter(idx);
  }

  emptyBefore(idx: number): boolean {
    if (idx === 0) {
      return true;
    }

    return this.lines[idx - 1].type === FountainElementType.EMPTY;
  }

  emptyAfter(idx: number, interpretEndAsEmpty = true): boolean {
    if (idx + 1 === this.lines.length) {
      return interpretEndAsEmpty;
    }

    return this.lines[idx + 1].type === FountainElementType.EMPTY;
  }

  applyEmpty() {
    this.lines = this.lines.map((line) => {
      if (line.text.trim().length === 0) {
        line.type = FountainElementType.EMPTY;
      }
      return line;
    });
  }

  applyCentered() {
    this.lines = this.lines.map((line) => {
      if (line.text.startsWith('>') && line.text.endsWith('<')) {
        line.type = FountainElementType.CENTERED;
      }
      return line;
    });
  }

  applySceneHeaders() {
    this.lines = this.lines.map((line, idx) => {
      let isSceneHeader = false;

      if (line.text.startsWith('.')) {
        isSceneHeader = true;
      } else {
        const SCENE_HEADING_REGEX = /^(INT|EXT|int|ext)(\.| )/;
        if (line.text.match(SCENE_HEADING_REGEX) && this.emptyBeforeAfter(idx)) {
          isSceneHeader = true;
        }
      }

      if (isSceneHeader) {
        line.type = FountainElementType.SCENE_HEADER;
      }
      return line;
    });
  }

  applySceneTransitions() {
    this.lines = this.lines.map((line, idx) => {
      let isSceneTransition = false;

      if (line.text.startsWith('>') && line.type !== FountainElementType.CENTERED) {
        isSceneTransition = true;
      } else {
        const SCENE_TRANSITION_REGEX = / TO:$/;
        if (line.text.match(SCENE_TRANSITION_REGEX) && (line.text.toUpperCase() === line.text) && this.emptyBeforeAfter(idx)) {
          isSceneTransition = true;
        }
      }

      if (isSceneTransition) {
        line.type = FountainElementType.TRANSITION;
      }
      return line;
    });
  }

  applyCharacters() {
    this.lines = this.lines.map((line, idx) => {
      let isCharacter = false;

      if (this.emptyBefore(idx) && !this.emptyAfter(idx, false)) {
        if (line.text.startsWith('@')) {
          isCharacter = true;
        } else {
          // Insist on capital letters, except in parentheticals at the end where anything goes
          const CHARACTER_REGEX = /^[\sA-Z\d-_]+(\s+\(.+)?$/;
          if (line.text.match(CHARACTER_REGEX)) {
            isCharacter = true;
          }
        }
      }

      if (isCharacter) {
        line.type = FountainElementType.CHARACTER;
      }
      return line;
    });
  }

  applyParentheticalDialogue() {
    let isInDialogueBlock = false;
    for (let i = 0; i < this.lines.length; i++) {
      if (this.lines[i].type === FountainElementType.CHARACTER) {
        // Cool, start a new dialogue block, do nothing else
        isInDialogueBlock = true;
      } else if (this.lines[i].type !== FountainElementType.ACTION) {
        isInDialogueBlock = false;
      } else if (isInDialogueBlock) {
        const PARENTHETICAL_REGEX = /^[\s]*\([^\)]*\)[\s]*$/;
        if (this.lines[i].text.match(PARENTHETICAL_REGEX)) {
          this.lines[i].type = FountainElementType.PARENTHETICAL;
        } else {
          this.lines[i].type = FountainElementType.DIALOGUE;
        }
      }
    }
  }

  getQuillDeltas(): Op[] {
    // Now, consolidate the lines and output
    const outputDeltas = [];
    let currentDelta = this.lines[0].toDelta();
    let currentElement = this.lines[0];
    for (let i = 1; i < this.lines.length; i++) {
      if (currentElement.sameElement(this.lines[i])) {
        // Just append line to string
        currentDelta.insert += this.lines[i].text + '\n';
      } else {
        outputDeltas.push(currentDelta);
        currentDelta = this.lines[i].toDelta();
        currentElement = this.lines[i];
      }
    }
    outputDeltas.push(currentDelta);
    return outputDeltas;
  }
}




export function parseQuillFromFountain(text: string): Op[] {

  const begin = Date.now();

  const parsedElements = FountainElements.fromTextLines(text.split('\n'));

  console.log(`Parsed ${parsedElements.lines.length} lines in ${Date.now() - begin} ms`);

  return parsedElements.getQuillDeltas();
}
