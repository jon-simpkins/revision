import {CharacterMetadata, ContentBlock} from 'draft-js';
import Immutable from 'immutable';
import {ScrapMap} from '../scrapList/scrapListSlice';
import {Scrap} from '../../protos_v2';

export const isFountainHeader = 'isFountainHeader';
export const isBlank = 'isBlank';

export interface ProcessProgress {
  processStartEpoch: number;
  currentDurationSec: number;
  childScraps: Immutable.OrderedSet<string>;
}

interface ProcessUpdate {
  processProgress: ProcessProgress;
  contentBlock: ContentBlock;
}

const LINES_PER_PAGE = 55;
const ONE_LINE_DURATION_SEC = (1 / LINES_PER_PAGE * 60);


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

// Process each content block, resetting the blockData and conditionally setting a flag for if the block
// is blank or not. This function needs to be able to operate on each contentBlock independent of all the rest
export function preProcessProseBlock(contentBlock: ContentBlock): ContentBlock {
  if (!contentBlock) {
    return contentBlock;
  }

  let blockData: { [index: string]: boolean|string} = {};
  let blockText = contentBlock.getText().trim();

  if (!blockText.length) {
    blockData[isBlank] = true;
  }

  return contentBlock.set('data', Immutable.fromJS(blockData)) as ContentBlock;
}

export function processProseBlock(contentBlock: ContentBlock, blockBefore: null|ContentBlock, blockAfter: null|ContentBlock, processProgress: ProcessProgress, scrapMap: ScrapMap): ProcessUpdate {
  if (!contentBlock) {
    return {
      processProgress: processProgress,
      contentBlock: contentBlock
    };
  }

  let blockData: { [index: string]: boolean|string} = contentBlock.getData().toJS();
  let applyCharacterStyles = true;

  let blockText = contentBlock.getText().trim();

  const blankBefore = !!blockBefore ? blockBefore.getData().get(isBlank) : true;
  const blankAfter = !!blockAfter ? blockAfter.getData().get(isBlank) : true;

  if (blockData[isBlank]) {
    if (!blankBefore) { // We only want to count 1 contiguous block of "blank", since we remove redundant whitespace
      processProgress.currentDurationSec += ONE_LINE_DURATION_SEC; // Assume one line of whitespace
    }
  } else {


    /** Scene header */
    if (blankBefore && blankAfter && ((/^(int|ext\.|est|i\/e)[\s\.]/i).test(blockText) || blockText.startsWith('.'))) {
      blockData[isFountainHeader] = true;

      processProgress.currentDurationSec += ONE_LINE_DURATION_SEC; // Assume one line per scene heading
    }

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
  }

  const updatedBlock = contentBlock.set('data', Immutable.fromJS(blockData)) as ContentBlock;

  applyCharacterStyles = false;

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
