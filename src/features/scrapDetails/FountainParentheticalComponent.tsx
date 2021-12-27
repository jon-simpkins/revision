import {ContentBlock, ContentState} from 'draft-js';
import {isFountainParenthetical, ONE_LINE_DURATION_SEC} from './usefulConstants';
import React from 'react';
import {BaseReadOnlyComponent} from './BaseReadOnlyComponent';
import {FountainDialogueComponent} from './FountainDialogueComponent';

export function fountainParentheticalStrategy(contentBlock: ContentBlock, callback: (start: number, end: number) => void, contentState: ContentState) {
  if (!!contentBlock.getData().get(isFountainParenthetical)) {
    callback(0, contentBlock.getText().length);
  }
}

export function checkIsParenthetical(characterBefore: string, blockText: string): boolean {
  return !!characterBefore && blockText.startsWith('(') && blockText.endsWith(')');
}

export function parentheticalDurationSec(blockText: string): number {
  return ONE_LINE_DURATION_SEC; // Assume one line per dialogue
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
      <div style={{marginLeft: '350px', flex: '1', width: '200px'}} >{props.children}</div>
  );
}

export class FountainParentheticalReadOnlyComponent extends BaseReadOnlyComponent {
  constructor(props: any) {
    super(props);
  }

  renderSpecific(): JSX.Element {
    return FountainParentheticalComponent(this.props);
  }
}
