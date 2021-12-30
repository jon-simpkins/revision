import {ContentBlock, ContentState} from 'draft-js';
import {character, durationSecContribution, isFountainCharacter, ONE_LINE_DURATION_SEC} from './usefulConstants';
import React from 'react';
import {BaseReadOnlyComponent} from './BaseReadOnlyComponent';

export function fountainCharacterStrategy(contentBlock: ContentBlock, callback: (start: number, end: number) => void, contentState: ContentState) {
  if (!!contentBlock.getData().get(isFountainCharacter)) {
    callback(0, contentBlock.getText().length);
  }
}

export function checkIsCharacter(blankBefore: boolean, blankAfter: boolean, blockText: string): boolean {
  return blankBefore && !blankAfter && (blockText.toUpperCase() === blockText || blockText.startsWith('@'));
}

export function characterDurationSec(blockText: string): number {
  return ONE_LINE_DURATION_SEC * Math.ceil(blockText.length / 28); // About 28 characters per line
}

export function characterData(blockText: string): { [index: string]: boolean|string|number} {
  const parsedCharacter = blockText.trim();
  // TODO: actually parse out things like  (v.o) and (cont'd)

  return {
    [isFountainCharacter]: true,
    [character]: parsedCharacter,
    [durationSecContribution]: characterDurationSec(blockText)
  }
}

/**
 * Component to show a Fountain character in DraftJS.
 *
 */
export const FountainCharacterComponent = (props: any) => {
  return (
      <div style={{fontWeight: 'bold', marginLeft: '12em', width: '17em'}} >{props.children}</div>
  );
}


export class FountainCharacterReadOnlyComponent extends BaseReadOnlyComponent {
  renderSpecific(): JSX.Element {
    return FountainCharacterComponent(this.props);
  }
}
