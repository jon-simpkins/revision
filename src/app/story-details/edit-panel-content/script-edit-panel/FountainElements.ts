
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
  SECTION_HEADER, // ## My subsection
  BONEYARD, // /* something */
}

// Element constituting a line in a .fountain-formatted document
class FountainElement {
  text: string;
  type = FountainElementType.ACTION;

  constructor(text: string) {
    this.text = text;
  }

  toDeltas(characterMap: Map<string, object>): Op[] {
    const splitTokens = (this.text + '\n').split('{@');

    if (splitTokens.length === 1 || (![FountainElementType.BONEYARD, FountainElementType.CHARACTER, FountainElementType.ACTION].includes(this.type))) {
      return [{
        insert: this.text + '\n',
        attributes: this.getDeltaAttributes()
      }];
    }

    // Correctly parse out any tokens wrapped in {@ }
    const outputDeltas: Op[] = [];
    for (let i = 0; i < splitTokens.length; i++) {
      let startedWithBrackets = false;
      if (i > 0) {
        startedWithBrackets = true;
      }

      if (i === 0) {
        if (splitTokens[0].length) {
          outputDeltas.push({
            insert: splitTokens[i],
            attributes: this.getDeltaAttributes()
          });
        }
      } else {
        const subSplitToken = splitTokens[i].split('}');
        if (subSplitToken.length === 1) {
          // No trailing }
          outputDeltas.push({
            insert: '{@' + splitTokens[i],
            attributes: this.getDeltaAttributes()
          });
        } else {
          const tokenValue = subSplitToken[0];
          const tokenAttributes = this.getDeltaAttributes();

          if (characterMap.has(tokenValue.toUpperCase())) {
            // @ts-ignore
            tokenAttributes.character = characterMap.get(tokenValue.toUpperCase()).refId;
          }

          outputDeltas.push({
            insert: '{@' + tokenValue + '}',
            attributes: tokenAttributes
          });
          outputDeltas.push({
            insert: subSplitToken.slice(1).join('}'),
            attributes: this.getDeltaAttributes()
          });
        }
      }
    }

    return outputDeltas;
  }

  getDeltaAttributes(): any {
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
      case FountainElementType.SECTION_HEADER:
        return {
          bold: true,
          background: '#a7c2ff',
        };
      case FountainElementType.BONEYARD:
        return {
          italic: true,
          background: '#f0f0f0'
        };
    }

    throw new Error(`Unexpected type: ${this.type}`);
  }

  getNumRenderedLines(): number {
    // These are all based on measuring the maximum number of characters
    // in Highland before it caused a linebreak, for each type of element
    const trimmedText = this.text.trim();

    switch (this.type) {
      case FountainElementType.SCENE_HEADER:
        return Math.ceil(trimmedText.replace(/^\./, '').length / 55);
      case FountainElementType.CHARACTER:
        return Math.ceil(trimmedText.replace(/^@/, '').length / 34);
      case FountainElementType.PARENTHETICAL:
        return Math.ceil(trimmedText.length / 29);
      case FountainElementType.DIALOGUE:
        return Math.ceil(trimmedText.length / 34);
      case FountainElementType.CENTERED:
        return Math.ceil(trimmedText.replace(/^>/, '').replace(/<$/, '').length / 63);
      case FountainElementType.ACTION:
        return Math.ceil(trimmedText.length / 63);
      case FountainElementType.TRANSITION:
        return Math.ceil(trimmedText.replace(/^>/, '').length / 63);
      case FountainElementType.EMPTY:
        return 1;
      case FountainElementType.SECTION_HEADER:
      case FountainElementType.BONEYARD:
        return 0;
    }

    throw new Error(`Unexpected type: ${this.type}`);
  }
}

class FountainElements {
  lines: FountainElement[];

  static fromFullText(fullText: string): FountainElements {
    const textLines = fullText.split('\n');

    const retVal = new FountainElements();
    retVal.lines = textLines.map(textLine => new FountainElement(textLine));

    retVal.applyEmpty();
    retVal.applySectionHeaders();
    retVal.applyBoneyard();
    retVal.applySceneHeaders();
    retVal.applyCentered();
    retVal.applySceneTransitions();
    retVal.applyCharacters();
    retVal.applyParentheticalDialogue();

    return retVal;
  }

  backToRawText(): string {
    return this.lines.map(line => line.text).join('\n');
  }

  emptyBeforeAfter(idx: number): boolean {
    return this.emptyBefore(idx) && this.emptyAfter(idx);
  }

  emptyBefore(idx: number): boolean {
    if (idx === 0) {
      return true;
    }

    return [FountainElementType.EMPTY, FountainElementType.BONEYARD].includes(this.lines[idx - 1].type);
  }

  emptyAfter(idx: number, interpretEndAsEmpty: boolean = true): boolean {
    if (idx + 1 === this.lines.length) {
      return interpretEndAsEmpty;
    }

    return [FountainElementType.EMPTY, FountainElementType.BONEYARD].includes(this.lines[idx + 1].type);
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
      if (this.emptyBefore(idx) && !this.emptyAfter(idx, false)) {
        // Insist on {@Name} or {@abc-123|3}, allow for optional parenthetical at end of line
          const CHARACTER_REGEX = /^[\s]*{@[\w._|\-]+}[\s]*(\([^\)]+\))?[\s]*$/;
          if (line.text.match(CHARACTER_REGEX)) {
            line.type = FountainElementType.CHARACTER;
          }
      }
      return line;
    });
  }

  replaceTokenValues(tokenMap: Map<string, string>, tokenPrefix: string) {
    this.lines.forEach(line => {
      if (line.type === FountainElementType.CHARACTER || line.type === FountainElementType.ACTION || line.type === FountainElementType.BONEYARD) {
        const regex = new RegExp(`{${tokenPrefix}([^}]+)}`, 'g');
        let match = regex.exec(line.text);
        while (match !== null) {
          const characterName = match[1];
          const dialogueRefId = tokenMap.get(characterName.toUpperCase());
          if (dialogueRefId) {
            line.text = line.text.replace(`{${tokenPrefix}${characterName}}`, `{${tokenPrefix}${dialogueRefId}}`);
            regex.lastIndex = 0;
          }

          match = regex.exec(line.text);
        }
      }
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

  applySectionHeaders() {
    for (let i = 0; i < this.lines.length; i++) {
      if (this.lines[i].text.startsWith('#')) {
        this.lines[i].type = FountainElementType.SECTION_HEADER;
      }
    }
  }

  applyBoneyard() {
    let inBoneyard = false;
    let startIdx = -1;
    for (let i = 0; i < this.lines.length; i++) {
      if (this.lines[i].text.startsWith('/*') && !inBoneyard) {
        startIdx = i;
        inBoneyard = true;
      }
      if (this.lines[i].text.endsWith('*/') && inBoneyard) {
        for (let j = startIdx; j <= i; j++) {
          this.lines[j].type = FountainElementType.BONEYARD;
        }
        inBoneyard = false;
      }
    }
  }

  getQuillDeltas(characterMap: Map<string, object>): Op[] {
    // Now, consolidate the lines and output
    let allDeltas = [];
    this.lines.forEach(line => {
      allDeltas = allDeltas.concat(line.toDeltas(characterMap));
    });

    const outputDeltas = [];
    let currentDelta = allDeltas[0];
    let currentAttributes = JSON.stringify(currentDelta.attributes);
    for (let i = 1; i < allDeltas.length; i++) {
      if (currentAttributes === JSON.stringify(allDeltas[i].attributes)) {
        // Just append line to string
        currentDelta.insert += allDeltas[i].insert;
      } else {
        outputDeltas.push(currentDelta);
        currentDelta = allDeltas[i];
        currentAttributes = JSON.stringify(currentDelta.attributes);
      }
    }
    outputDeltas.push(currentDelta);
    return outputDeltas;
  }

  getEstimatedPageCount(): number {
    let lineCount = 0;
    this.lines.forEach(line => {
      lineCount += line.getNumRenderedLines();
    });

    return lineCount / 55;
  }
}

export {FountainElementType, FountainElement, FountainElements};
