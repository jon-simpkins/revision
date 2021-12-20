
export const LINES_PER_PAGE = 55;
export const ONE_LINE_DURATION_SEC = 1.0909; // (1 / LINES_PER_PAGE * 60);

/** Fields on the data for a block of parsed text */
export const isScrapEmbedding = 'isScrapEmbedding';
export const scrapLink = 'scrapLink';
export const isFountainHeader = 'isFountainHeader';
export const isFountainCentered = 'isFountainCentered';
export const isFountainTransition = 'isFountainTransition';
export const isBlank = 'isBlank';
export const isComment = 'isComment';
export const isCommentStart = 'isCommentStart';
export const isCommentEnd = 'isCommentEnd';

export function mergeDataObject(dataObject: { [index: string]: boolean|string}, newData: { [index: string]: boolean|string}): { [index: string]: boolean|string} {
  return {
    ...dataObject,
    ...newData
  };
}
