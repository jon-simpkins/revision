import {ContentBlock} from 'draft-js';
import {character, durationSecContribution} from '../scrapDetails/usefulConstants';

export interface CharacterAppearance {
  character: string;
  totalDurationSec: number;
  percentDurationSec: number;
}

export function fetchCharacters(parsedBlocks: ContentBlock[]): CharacterAppearance[] {
  const characterMap: {[key: string]: CharacterAppearance} = {};

  let totalDurationSec = 0;
  parsedBlocks.forEach((block) => {
    const blockData = block.getData();

    const thisCharacter = blockData.get(character) as string;
    const thisDurationSecContribution = (blockData.get(durationSecContribution) || 0) as number;

    totalDurationSec += thisDurationSecContribution;

    if (!!thisCharacter) {
      if (!characterMap[thisCharacter]) {
        characterMap[thisCharacter] = {
          character: thisCharacter,
          totalDurationSec: 0,
          percentDurationSec: 0,
        };
      }
      characterMap[thisCharacter].totalDurationSec += thisDurationSecContribution;
    }
  });

  return Object.values(characterMap).sort((b, a) => {
    return a.totalDurationSec - b.totalDurationSec;
  }).map((characterEntry) => {
    characterEntry.percentDurationSec = characterEntry.totalDurationSec / totalDurationSec;
    return characterEntry;
  });
}
