import {CharacterMetadata, ContentBlock, ContentState} from 'draft-js';
import Immutable from 'immutable';
import {ScrapMap} from '../scrapList/scrapListSlice';
import {Scrap} from '../../protos_v2';
import {character, durationSecContribution, isBlank, isComment, isCommentEnd, isCommentStart, mergeDataObject, ONE_LINE_DURATION_SEC, scrapLink} from './usefulConstants';
import {checkIsSceneHeader, sceneHeaderData, sceneHeaderDurationSec} from './FountainHeaderComponent';
import {checkIsScrapEmbed, scrapEmbedData} from './ScrapEmbedComponent';
import {checkIsSceneTransition, sceneTransitionData, sceneTransitionDurationSec} from './FountainTransitionComponent';
import {checkIsCentered, sceneCenteredData, sceneCenteredDurationSec} from './FountainCenteredComponent';
import {checkIsCommentEnd, checkIsCommentStart} from './CommentComponent';
import {characterData, characterDurationSec, checkIsCharacter} from './FountainCharacterComponent';
import {checkIsDialogue, dialogueData, dialogueDurationSec} from './FountainDialogueComponent';
import {checkIsParenthetical, parentheticalData, parentheticalDurationSec} from './FountainParentheticalComponent';
import {actionData, actionDurationSec} from './FountainActionComponent';
import {checkIsScrapPlaceholder, scrapPlaceholderData, scrapPlaceholderDurationSec} from './ScrapPlaceholderComponent';

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
  } else {
    if (checkIsCommentStart(blockText)) {
      blockData[isCommentStart] = true;
    }
    if (checkIsCommentEnd(blockText)) {
      blockData[isCommentEnd] = true;
    }
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

  let blockData: { [index: string]: boolean|string|number} = contentBlock.getData().toJS();
  let applyCharacterStyles = true;

  let blockText = contentBlock.getText().trim();

  const blankBefore: boolean = !!blockBefore ? blockBefore.getData().get(isBlank) : true;
  const blankAfter: boolean = !!blockAfter ? blockAfter.getData().get(isBlank) : true;
  const characterBefore: string = !!blockBefore ? (blockBefore.getData().get(character) || '') : '';

  if (blockData[isBlank]) {
    if (!blankBefore && !blockData[isComment]) { // We only want to count 1 contiguous block of "blank", since we remove redundant whitespace
      processProgress.currentDurationSec += ONE_LINE_DURATION_SEC; // Assume one line of whitespace
      blockData = mergeDataObject(blockData, {
        [durationSecContribution]: ONE_LINE_DURATION_SEC
      });
    }
  } else {
    if (!blockData[isComment]) {
      if (checkIsSceneHeader(blankBefore, blankAfter, blockText)) {
        /** Scene header */
        blockData = mergeDataObject(blockData, sceneHeaderData(blockText));

        processProgress.currentDurationSec += sceneHeaderDurationSec(blockText);
      } else if (checkIsSceneTransition(blankBefore, blankAfter, blockText)) {
        /** Scene transition */
        blockData = mergeDataObject(blockData, sceneTransitionData(blockText));

        processProgress.currentDurationSec += sceneTransitionDurationSec(blockText);
      } else if (checkIsCentered(blockText)) {
        /** Centered action */
        blockData = mergeDataObject(blockData, sceneCenteredData(blockText));

        processProgress.currentDurationSec += sceneCenteredDurationSec(blockText);
      } else if (checkIsCharacter(blankBefore, blankAfter, blockText)) {
        /** Character */
        blockData = mergeDataObject(blockData, characterData(blockText));

        processProgress.currentDurationSec += characterDurationSec(blockText);
      } else if (checkIsDialogue(characterBefore, blockText)) {
        /** Dialogue */
        blockData = mergeDataObject(blockData, dialogueData(characterBefore, blockText));

        processProgress.currentDurationSec += dialogueDurationSec(blockText);
      }
      else if (checkIsParenthetical(characterBefore, blockText)) {
        /** Parenthetical */
        blockData = mergeDataObject(blockData, parentheticalData(characterBefore, blockText));

        processProgress.currentDurationSec += parentheticalDurationSec(blockText);
      } else if (checkIsScrapPlaceholder(blockText)) {
        /** Scrap placeholder (for scrap that doesn't exist yet, for structure planning) */
        blockData = mergeDataObject(blockData, scrapPlaceholderData(blockText));

        processProgress.currentDurationSec += scrapPlaceholderDurationSec(blockText);
      } else if (!checkIsScrapEmbed(blockText)) {
        /** Action */
        blockData = mergeDataObject(blockData, actionData(blockText));

        processProgress.currentDurationSec += actionDurationSec(blockText);
      }
    }

    if (checkIsScrapEmbed(blockText)) {
      /** Scrap link embedded in prose */
      blockData = mergeDataObject(blockData, scrapEmbedData(blockText));

      const scrapId = blockData[scrapLink] as string;

      if (!!scrapMap[scrapId]) {
        processProgress.childScraps = processProgress.childScraps.add(scrapId);

        const childScrap = scrapMap[scrapId] as Scrap;

        if (!blockData[isComment]) {
          processProgress.currentDurationSec += childScrap.intendedDurationSec;
        }
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

interface ParsedProseResult {
  contentState: ContentState;
  totalDurationSec: number;
  childScraps: Immutable.OrderedSet<string>;
  showTimeoutWarning: boolean;
}

export function parseAllProse(contentState: ContentState, scrapMap: ScrapMap, warnParsingThreshold: number, errorParsingThreshold: number): ParsedProseResult {

  let newParseErrorState = false;

  let processProgress = {
    processStartEpoch: Date.now(),
    currentDurationSec: 0,
    childScraps: Immutable.OrderedSet<string>()
  } as ProcessProgress;

  let currentBlockMap = contentState.getBlockMap();
  // @ts-ignore
  const blockKeys = [ ...currentBlockMap.keys()];

  for (let i = 0; i < blockKeys.length; i++) {
    const nextKey = blockKeys[i];
    currentBlockMap = currentBlockMap.set(nextKey, preProcessProseBlock(currentBlockMap.get(nextKey)));

    const timeSoFar = Date.now() - processProgress.processStartEpoch;
    if (timeSoFar > warnParsingThreshold) {
      newParseErrorState = true;
    }
    if (timeSoFar > errorParsingThreshold) {
      break;
    }
  }

  // Mark all comment blocks as such
  let currentlyInComment = false;
  for (let i = 0; i < blockKeys.length; i++) {
    const nextKey = blockKeys[i];
    const blockData = currentBlockMap.get(nextKey).getData().toJS();
    if (blockData[isCommentStart]) {
      currentlyInComment = true;
    }

    if (currentlyInComment) {
      const currentBlock = currentBlockMap.get(nextKey);

      blockData[isComment] = true;
      const updatedData = Immutable.fromJS(blockData);

      const updatedBlock = currentBlock.set('data', updatedData) as ContentBlock;
      currentBlockMap = currentBlockMap.set(nextKey, updatedBlock);
    }

    if (blockData[isCommentEnd]) {
      currentlyInComment = false;
    }
    const timeSoFar = Date.now() - processProgress.processStartEpoch;
    if (timeSoFar > warnParsingThreshold) {
      newParseErrorState = true;
    }
    if (timeSoFar > errorParsingThreshold) {
      break;
    }
  }

  for (let i = 0; i < blockKeys.length; i++) {
    const blockBefore = i > 0 ? currentBlockMap.get(blockKeys[i - 1]) : null;
    const nextKey = blockKeys[i];
    const blockAfter = i + 1 < blockKeys.length ? currentBlockMap.get(blockKeys[i + 1]) : null;

    const update = processProseBlock(currentBlockMap.get(nextKey), blockBefore, blockAfter, processProgress, scrapMap);

    processProgress = update.processProgress;

    currentBlockMap = currentBlockMap.set(nextKey, update.contentBlock);
    const timeSoFar = Date.now() - processProgress.processStartEpoch;
    if (timeSoFar > warnParsingThreshold) {
      newParseErrorState = true;
    }
    if (timeSoFar > errorParsingThreshold) {
      break;
    }
  }

  const newContent = contentState.set('blockMap', currentBlockMap) as ContentState;

  const durationMs = Date.now() - processProgress.processStartEpoch;
  console.log('Update took: ' + durationMs);

  return {
    contentState: newContent,
    totalDurationSec: processProgress.currentDurationSec,
    childScraps: processProgress.childScraps,
    showTimeoutWarning: newParseErrorState
  };
}
