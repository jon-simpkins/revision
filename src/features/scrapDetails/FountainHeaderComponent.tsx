import React from 'react';
import {ContentBlock, ContentState} from 'draft-js';
import {durationSecContribution, isFountainHeader, ONE_LINE_DURATION_SEC, PAGE_WIDTH_EM} from './usefulConstants';
import {BaseReadOnlyComponent} from './BaseReadOnlyComponent';

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

export function sceneHeaderData(blockText: string): { [index: string]: boolean|string|number} {
  return {
    [isFountainHeader]: true,
    [durationSecContribution]: sceneHeaderDurationSec(blockText),
  }
}

/**
 * Component to show a Fountain scene header in DraftJS.
 *
 */
export const FountainHeaderComponent = (props: any) => {
  return (
      <div style={{fontWeight: 'bold', width: PAGE_WIDTH_EM}} >{props.children}</div>
  );
}

export class FountainHeaderReadOnlyComponent extends BaseReadOnlyComponent {
  renderSpecific(): JSX.Element {
    return FountainHeaderComponent(this.props);
  }
}
