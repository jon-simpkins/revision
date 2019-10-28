import {FountainElements} from '../../app/story-details/edit-panel-content/script-edit-panel/FountainElements';

class Script {
  rawText = '';

  constructor() {
    this.rawText = '';
  }

  static fromString(strContent: string): Script {
    const parsed = JSON.parse(strContent);

    const script = new Script();
    script.rawText = parsed.r;

    return script;
  }

  /**
   * Replaces all dialogue instances of the character refId in the script with the corresponding uppercase character name
   *
   * @param rawText The original Fountain-formatted string
   * @param characterMap A map from CHAR_NAME_UPPERCASE -> refId
   */
  static convertCharacterRefIdsToNames(rawText: string, characterMap: Map<string, string>): string {
    const parsedScript = FountainElements.fromFullText(rawText);

    // Build the reverse map of refId -> character name
    const reverseCharacterMap = new Map<string, string>();
    characterMap.forEach((refId: string, uppercaseName: string) => {
      reverseCharacterMap.set(refId.toUpperCase(), uppercaseName);
    });

    parsedScript.replaceTokenValues(reverseCharacterMap, '@');
    return parsedScript.backToRawText();
  }

  toString(): string {
    return JSON.stringify({
      r: this.rawText
    });
  }

  /**
   * Replaces all dialogue instances of the character name in the script with the corresponding refId
   *
   * @param characterMap A map from CHAR_NAME_UPPERCASE -> refId
   */
  convertCharacterNamesToRefIds(characterMap: Map<string, string>) {
    const parsedScript = FountainElements.fromFullText(this.rawText);
    parsedScript.replaceTokenValues(characterMap, '@');

    this.rawText = parsedScript.backToRawText();
  }
}

export {Script};
