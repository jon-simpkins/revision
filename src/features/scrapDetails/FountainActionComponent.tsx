import {ContentBlock, ContentState} from 'draft-js';
import {isFountainAction, ONE_LINE_DURATION_SEC, PAGE_WIDTH_EM} from './usefulConstants';
import React from 'react';
import {BaseReadOnlyComponent} from './BaseReadOnlyComponent';

export function fountainActionStrategy(contentBlock: ContentBlock, callback: (start: number, end: number) => void, contentState: ContentState) {
  if (!!contentBlock.getData().get(isFountainAction)) {
    callback(0, contentBlock.getText().length);
  }
}

export function actionDurationSec(blockText: string): number {
  return ONE_LINE_DURATION_SEC * Math.ceil(blockText.length / 56); // About 56 characters per line of action
}

export function actionData(blockText: string): { [index: string]: boolean|string} {
  return {
    [isFountainAction]: true,
  }
}

/**
 * Component to show a Fountain action line in DraftJS.
 *
 */
export const FountainActionComponent = (props: any) => {
  return (
      <div style={{width: PAGE_WIDTH_EM}} >{props.children}</div>
  );
}

export class FountainActionReadOnlyComponent extends BaseReadOnlyComponent {
  renderSpecific(): JSX.Element {
    return FountainActionComponent(this.props);
  }
}
