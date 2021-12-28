import {ContentBlock, ContentState} from 'draft-js';
import {isFountainParenthetical, ONE_LINE_DURATION_SEC} from './usefulConstants';
import React from 'react';
import {BaseReadOnlyComponent} from './BaseReadOnlyComponent';

export function fountainParentheticalStrategy(contentBlock: ContentBlock, callback: (start: number, end: number) => void, contentState: ContentState) {
  if (!!contentBlock.getData().get(isFountainParenthetical)) {
    callback(0, contentBlock.getText().length);
  }
}

export function checkIsParenthetical(characterBefore: string, blockText: string): boolean {
  return !!characterBefore && blockText.startsWith('(') && blockText.endsWith(')');
}

export function parentheticalDurationSec(blockText: string): number {
  return ONE_LINE_DURATION_SEC * Math.ceil(blockText.length / 30); // About 30 characters per line
}

export function parentheticalData(characterBefore: string, blockText: string): { [index: string]: boolean|string} {
  return {
    isFountainParenthetical: true,
    character: characterBefore,
  }
}

/**
 * Component to show Fountain parenthetical in DraftJS.
 *
 */
export const FountainParentheticalComponent = (props: any) => {
  return (
      <div style={{marginLeft: '8.5em', width: '19.5em'}} >{props.children}</div>
  );
}

export class FountainParentheticalReadOnlyComponent extends BaseReadOnlyComponent {
  renderSpecific(): JSX.Element {
    return FountainParentheticalComponent(this.props);
  }
}
