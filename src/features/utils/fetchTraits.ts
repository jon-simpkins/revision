import {ContentBlock} from 'draft-js';
import {scrapTraitText} from '../scrapDetails/usefulConstants';

export interface TraitAppearance {
  trait: string;
  numberOfAppearances: number;
}

export function fetchTraits(parsedBlocks: ContentBlock[]): TraitAppearance[] {
  const traitMap: {[key: string]: TraitAppearance} = {};

  parsedBlocks.forEach((block) => {
    const blockData = block.getData();

    const traitText = (blockData.get(scrapTraitText) || '') as string;
    traitText.split('#').filter(Boolean).forEach((untrimmedTrait) => {
      const trait = untrimmedTrait.trim();

      if (!traitMap[trait]) {
        traitMap[trait] = {
          trait: trait,
          numberOfAppearances: 0
        };
      }

      traitMap[trait].numberOfAppearances += 1;
    });
  });

  return Object.values(traitMap).sort((a, b) => {
    return b.numberOfAppearances - a.numberOfAppearances;
  });
}
