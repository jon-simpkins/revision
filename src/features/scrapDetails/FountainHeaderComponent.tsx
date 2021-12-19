import React from 'react';
import {ContentBlock, ContentState} from 'draft-js';
import {isFountainHeader} from './parseProse';

export function fountainHeaderStrategy(contentBlock: ContentBlock, callback: (start: number, end: number) => void, contentState: ContentState) {
  if (!!contentBlock.getData().get(isFountainHeader)) {
    callback(0, contentBlock.getText().length);
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
