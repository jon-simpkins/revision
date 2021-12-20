import {ContentBlock, ContentState} from 'draft-js';
import {isFountainCentered, ONE_LINE_DURATION_SEC} from './usefulConstants';
import React from 'react';


export function fountainCenteredStrategy(contentBlock: ContentBlock, callback: (start: number, end: number) => void, contentState: ContentState) {
  if (!!contentBlock.getData().get(isFountainCentered)) {
    callback(0, contentBlock.getText().length);
  }
}

export function checkIsCentered(blockText: string): boolean {
  return blockText.startsWith('>') && blockText.endsWith('<');
}

export function sceneCenteredDurationSec(blockText: string): number {
  return ONE_LINE_DURATION_SEC; // Assume one line per scene heading
}


export function sceneCenteredData(blockText: string): { [index: string]: boolean|string} {
  return {
    isFountainCentered: true,
  }
}

/**
 * Component to show a Fountain "centered" element in DraftJS.
 *
 */
export const FountainCenteredComponent = (props: any) => {
  return (
      <div style={{fontWeight: 'bold', textAlign: 'center'}} >{props.children}</div>
  );
}
