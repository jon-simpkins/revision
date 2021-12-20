import React from 'react';
import {ContentBlock, ContentState} from 'draft-js';
import {isFountainHeader, ONE_LINE_DURATION_SEC} from './usefulConstants';

export function fountainHeaderStrategy(contentBlock: ContentBlock, callback: (start: number, end: number) => void, contentState: ContentState) {
  if (!!contentBlock.getData().get(isFountainHeader)) {
    callback(0, contentBlock.getText().length);
  }
}

export function checkIsSceneHeader(blankBefore: boolean, blankAfter: boolean, blockText: string): boolean {
  return blankBefore && blankAfter && ((/^(int|ext|est|i\/e)[\s.]/i).test(blockText) || (blockText.startsWith('.') && !blockText.startsWith('..')));
}

export function sceneHeaderDurationSec(blockText: string): number {
  return ONE_LINE_DURATION_SEC; // Assume one line per scene heading
}

export function sceneHeaderData(blockText: string): { [index: string]: boolean|string} {
  return {
    isFountainHeader: true,
  }
}

/**
 * Component to show a Fountain scene header in DraftJS.
 *
 */
export const FountainHeaderComponent = (props: any) => {
  return (
      <div style={{fontWeight: 'bold'}} >{props.children}</div>
  );
}
