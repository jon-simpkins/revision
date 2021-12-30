import {ContentBlock, ContentState} from 'draft-js';
import {durationSecContribution, isFountainTransition, ONE_LINE_DURATION_SEC, PAGE_WIDTH_EM} from './usefulConstants';
import React from 'react';
import {BaseReadOnlyComponent} from './BaseReadOnlyComponent';


export function fountainTransitionStrategy(contentBlock: ContentBlock, callback: (start: number, end: number) => void, contentState: ContentState) {
  if (!!contentBlock.getData().get(isFountainTransition)) {
    callback(0, contentBlock.getText().length);
  }
}

export function checkIsSceneTransition(blankBefore: boolean, blankAfter: boolean, blockText: string): boolean {
  return blankBefore && blankAfter && ((blockText.startsWith('>') && !blockText.endsWith('<')) || (blockText.toUpperCase() === blockText && blockText.endsWith('TO:')));
}

export function sceneTransitionDurationSec(blockText: string): number {
  return ONE_LINE_DURATION_SEC; // Assume one line per scene heading
}

export function sceneTransitionData(blockText: string): { [index: string]: boolean|string|number} {
  return {
    [isFountainTransition]: true,
    [durationSecContribution]: sceneTransitionDurationSec(blockText)
  }
}

/**
 * Component to show a Fountain transition in DraftJS.
 *
 */
export const FountainTransitionComponent = (props: any) => {
  return (
      <div style={{fontWeight: 'bold', textAlign: 'right', width: PAGE_WIDTH_EM}} >{props.children}</div>
  );
}


export class FountainTransitionReadOnlyComponent extends BaseReadOnlyComponent {
  renderSpecific(): JSX.Element {
    return FountainTransitionComponent(this.props);
  }
}
