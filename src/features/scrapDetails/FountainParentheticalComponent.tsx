import {ContentBlock, ContentState} from 'draft-js';
import {character, durationSecContribution, isFountainParenthetical, ONE_LINE_DURATION_SEC} from './usefulConstants';
import React from 'react';
import {BaseReadOnlyComponent} from './BaseReadOnlyComponent';
import {useAppSelector} from '../../app/hooks';
import {readHeaderOptions} from '../revision-header/headerOptionsSlice';

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

export function parentheticalData(characterBefore: string, blockText: string): { [index: string]: boolean|string|number} {
  return {
    [isFountainParenthetical]: true,
    [character]: characterBefore,
    [durationSecContribution]: parentheticalDurationSec(blockText)
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

class FountainParentheticalReadOnlyClassComponent extends BaseReadOnlyComponent {
  renderSpecific(): JSX.Element {
    return FountainParentheticalComponent(this.props);
  }
}

export const FountainParentheticalReadOnlyComponent = (props: any) => {
  let isFilterSelected = false;
  let characterFilter = useAppSelector(readHeaderOptions).currentCharacterFilter;

  const contentState = props.contentState as ContentState;
  const data = contentState.getBlockMap().get(props.blockKey).getData();
  if (characterFilter === data.get(character)) {
    isFilterSelected = true;
  }

  return (
      <FountainParentheticalReadOnlyClassComponent
          blockKey={props.blockKey}
          contentState={props.contentState}
          isFilterSelected={isFilterSelected}
          key={props.key}
          children={props.children} />
  );
}
