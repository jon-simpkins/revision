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
  static convertCharacterRefIdsToNames(rawText: string, characterMap: Map<string, object>): string {
    const parsedScript = FountainElements.fromFullText(rawText);

    // Build the reverse map of uppercase refId -> character name
    const reverseCharacterMap = new Map<string, string>();
    characterMap.forEach((mapEntry: object) => {
      // @ts-ignore
      reverseCharacterMap.set(mapEntry.refId.toUpperCase(), mapEntry.name);
    });

    parsedScript.replaceTokenValues(reverseCharacterMap, '@');
    return parsedScript.backToRawText();
  }

  static convertTraitRefIdsToNames(rawText: string, traitMap: Map<string, object>): string {
    const parsedScript = FountainElements.fromFullText(rawText);

    // Build the reverse map of uppercase refId -> character name
    const reverseTraitMap = new Map<string, string>();
    traitMap.forEach((mapEntry: object) => {
      // @ts-ignore
      reverseTraitMap.set(mapEntry.refId.toUpperCase(), mapEntry.name);
    });

    parsedScript.replaceTokenValues(reverseTraitMap, '#');
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
  convertCharacterNamesToRefIds(characterMap: Map<string, object>) {
    const parsedScript = FountainElements.fromFullText(this.rawText);

    const tokenReplaceMap = new Map<string, string>();
    characterMap.forEach((mapEntry: object, upperCaseCharacterName: string) => {
      // @ts-ignore
      tokenReplaceMap.set(upperCaseCharacterName, mapEntry.refId);
    });

    parsedScript.replaceTokenValues(tokenReplaceMap, '@');

    this.rawText = parsedScript.backToRawText();
  }

  convertTraitNamesToRefIds(traitMap: Map<string, object>) {
    const parsedScript = FountainElements.fromFullText(this.rawText);

    const tokenReplaceMap = new Map<string, string>();
    traitMap.forEach((mapEntry: object, upperCaseTraitName: string) => {
      // @ts-ignore
      tokenReplaceMap.set(upperCaseTraitName, mapEntry.refId);
    });

    parsedScript.replaceTokenValues(tokenReplaceMap, '#');

    this.rawText = parsedScript.backToRawText();
  }
}

export {Script};
