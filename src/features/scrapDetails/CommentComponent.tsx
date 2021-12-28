import {ContentBlock, ContentState} from 'draft-js';
import {isComment, isScrapEmbedding, PAGE_WIDTH_EM} from './usefulConstants';
import React from 'react';


export function commentStrategy(contentBlock: ContentBlock, callback: (start: number, end: number) => void, contentState: ContentState) {
  if (!!contentBlock.getData().get(isComment) && !contentBlock.getData().get(isScrapEmbedding)) {
    callback(0, contentBlock.getText().length);
  }
}

export function checkIsCommentStart(blockText: string): boolean {
  return blockText.startsWith('/*');
}


export function checkIsCommentEnd(blockText: string): boolean {
  return blockText.endsWith('*/');
}

/**
 * Component to show a block component element in DraftJS.
 *
 */
export const CommentComponent = (props: any) => {
  return (
      <div style={{fontStyle: 'italic', background: '#cfead9', width: PAGE_WIDTH_EM}}>{props.children}</div>
  );
}
