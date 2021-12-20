import {ContentBlock, ContentState} from 'draft-js';
import {isFountainCharacter, ONE_LINE_DURATION_SEC} from './usefulConstants';
import React from 'react';

export function fountainCharacterStrategy(contentBlock: ContentBlock, callback: (start: number, end: number) => void, contentState: ContentState) {
  if (!!contentBlock.getData().get(isFountainCharacter)) {
    callback(0, contentBlock.getText().length);
  }
}

export function checkIsCharacter(blankBefore: boolean, blankAfter: boolean, blockText: string): boolean {
  return blankBefore && !blankAfter && (blockText.toUpperCase() === blockText || blockText.startsWith('@'));
}

export function characterDurationSec(blockText: string): number {
  return ONE_LINE_DURATION_SEC; // Assume one line per character
}

export function characterData(blockText: string): { [index: string]: boolean|string} {
  const parsedCharacter = blockText.trim();
  // TODO: actually parse out things like  (v.o) and (cont'd)

  return {
    isFountainCharacter: true,
    character: parsedCharacter,
  }
}

/**
 * Component to show a Fountain character in DraftJS.
 *
 */
export const FountainCharacterComponent = (props: any) => {
  return (
      <div style={{fontWeight: 'bold', marginLeft: '400px'}} >{props.children}</div>
  );
}
