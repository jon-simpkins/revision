import React from 'react';

export const LINES_PER_PAGE = 55;
export const ONE_LINE_DURATION_SEC = 1.0909; // (1 / LINES_PER_PAGE * 60);
export const PAGE_WIDTH_EM = '37em';

/** Fields on the data for a block of parsed text */
export const scrapIdField = 'scrapId'; // Indicates which scrap defines this block of prose
export const ancestorField = 'ancestorField'; // Array of ancestor scrap IDs, excluding the current one

export const pendingDurationSecContribution = 'pendingDurationSecContribution'; // Seconds (perhaps partial) which will be contributed, when this is actually written
export const durationSecContribution = 'durationSecContribution'; // Seconds (perhaps partial) contributed to the script duration

export const isScrapTrait = 'isScrapTrait';
export const scrapTraitText = 'scrapTraitText';
export const isScrapPlaceholder = 'isScrapPlaceholder';
export const scrapPlaceholderText = 'scrapPlaceholderText';
export const scrapPlaceholderDurationSecField = 'scrapPlaceholderDurationSecField';
export const isScrapEmbedding = 'isScrapEmbedding';
export const scrapLink = 'scrapLink';
export const isFountainHeader = 'isFountainHeader';
export const isFountainCentered = 'isFountainCentered';
export const isFountainTransition = 'isFountainTransition';
export const isBlank = 'isBlank';
export const isComment = 'isComment';
export const isCommentStart = 'isCommentStart';
export const isCommentEnd = 'isCommentEnd';
export const isFountainCharacter = 'isFountainCharacter';
export const character = 'character';
export const isFountainDialogue = 'isFountainDialogue';
export const isFountainParenthetical = 'isFountainParenthetical';
export const isFountainAction = 'isFountainAction';

export const FOUNTAIN_EDITOR_STYLE: React.CSSProperties = {
  border: '1px solid',
  padding: '6em',
  margin: 'auto',
  width: '49em', // PAGE_WIDTH_EM + padding
  overflowY: 'scroll',
  fontSize: '16px',
  fontFamily: 'CourierPrime, Courier, monospace',
  flex: '1'
}

export function mergeDataObject(dataObject: { [index: string]: boolean|string|number}, newData: { [index: string]: boolean|string|number}): { [index: string]: boolean|string|number} {
  return {
    ...dataObject,
    ...newData
  };
}
