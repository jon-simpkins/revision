import {CharacterMetadata, ContentBlock} from 'draft-js';
import Immutable from 'immutable';
import {ScrapMap} from '../scrapList/scrapListSlice';
import {Scrap} from '../../protos_v2';

export interface ProcessProgress {
  processStartEpoch: number;
  currentDurationSec: number;
  childScraps: Immutable.OrderedSet<string>;
}

interface ProcessUpdate {
  processProgress: ProcessProgress;
  contentBlock: ContentBlock;
}

function applyStyles(character: CharacterMetadata, styles: Immutable.OrderedSet<string>): CharacterMetadata {
  return (character as any).set('style', styles) as CharacterMetadata;
}

export function isArrayEqualToImmutableSet(set: Immutable.OrderedSet<string>, array: string[]): boolean {
  if (set.size !== array.length) {
    return false;
  }

  for (let i = 0; i < array.length; i++) {
    if (!set.includes(array[i])) {
      return false;
    }
  }

  return true;
}

export function processProseBlock(contentBlock: ContentBlock, processProgress: ProcessProgress, scrapMap: ScrapMap): ProcessUpdate {
  if (!contentBlock) {
    return {
      processProgress: processProgress,
      contentBlock: contentBlock
    };
  }

  let blockData: { [index: string]: boolean|string} = {};
  let applyCharacterStyles = true;

  let blockText = contentBlock.getText().trim();

  /** Scrap link embedded in prose */
  if (blockText.startsWith('{{') && blockText.endsWith('}}')) {
    applyCharacterStyles = false;
    blockData['isScrapEmbedding'] = true;

    const scrapId = blockText.replace('{{', '').replace('}}', '').trim();
    blockData['scrapLink'] = scrapId;

    if (!!scrapMap[scrapId]) {
      processProgress.childScraps = processProgress.childScraps.add(scrapId);

      const childScrap = scrapMap[scrapId] as Scrap;

      processProgress.currentDurationSec += childScrap.intendedDurationSec;
    }
  }

  const updatedBlock = contentBlock.set('data', Immutable.fromJS(blockData)) as ContentBlock;

  const updatedCharacterList = updatedBlock.getCharacterList().map((c, idx) => {
    if (!c || !applyCharacterStyles) { return c; }


    // @ts-ignore
    if (idx < 5) {
      return applyStyles(c, Immutable.OrderedSet.of('BOLD', 'GREEN'));
    } else {
      return applyStyles(c, Immutable.OrderedSet());
    }
  });

  const finalBlockUpdate = updatedBlock.set('characterList', updatedCharacterList) as ContentBlock;

  return {
    contentBlock: finalBlockUpdate,
    processProgress: processProgress,
  }
}
