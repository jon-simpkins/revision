import {ContentBlock, ContentState} from 'draft-js';
import {character, durationSecContribution, isFountainCharacter, ONE_LINE_DURATION_SEC} from './usefulConstants';
import React from 'react';
import {BaseReadOnlyComponent} from './BaseReadOnlyComponent';
import {useAppSelector} from '../../app/hooks';
import {readHeaderOptions} from '../revision-header/headerOptionsSlice';

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
  const parsedCharacter = blockText
      .replace(/\(V\.O\.\)/i, '')
      .replace(/\(O\.S\.\)/i, '')
      .replace(/\(CONT'D\)/i, '')
      .replace(/\(CONT’D\)/i, '')
      .replace(/\(PRE-LAP\)/i, '')
      .trim();

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


class FountainCharacterReadOnlyClassComponent extends BaseReadOnlyComponent {
  renderSpecific(): JSX.Element {
    return FountainCharacterComponent(this.props);
  }
}

export const FountainCharacterReadOnlyComponent = (props: any) => {
  let isFilterSelected = false;
  let characterFilter = useAppSelector(readHeaderOptions).currentCharacterFilter;

  const contentState = props.contentState as ContentState;
  const data = contentState.getBlockMap().get(props.blockKey).getData();
  if (characterFilter === data.get(character)) {
    isFilterSelected = true;
  }

  return (
      <FountainCharacterReadOnlyClassComponent
          blockKey={props.blockKey}
          contentState={props.contentState}
          isFilterSelected={isFilterSelected}
          key={props.key}
          children={props.children} />
  );
}
