import {ContentBlock, ContentState} from 'draft-js';
import {isFountainDialogue, ONE_LINE_DURATION_SEC} from './usefulConstants';
import React from 'react';
import {BaseReadOnlyComponent} from './BaseReadOnlyComponent';
import {FountainHeaderComponent} from './FountainHeaderComponent';

export function fountainDialogueStrategy(contentBlock: ContentBlock, callback: (start: number, end: number) => void, contentState: ContentState) {
  if (!!contentBlock.getData().get(isFountainDialogue)) {
    callback(0, contentBlock.getText().length);
  }
}

export function checkIsDialogue(characterBefore: string, blockText: string): boolean {
  return !!characterBefore && (!blockText.startsWith('(') || !blockText.endsWith(')'));
}

export function dialogueDurationSec(blockText: string): number {
  return ONE_LINE_DURATION_SEC; // Assume one line per dialogue
}

export function dialogueData(characterBefore: string, blockText: string): { [index: string]: boolean|string} {
  return {
    isFountainDialogue: true,
    character: characterBefore,
  }
}

/**
 * Component to show Fountain dialogue in DraftJS.
 *
 */
export const FountainDialogueComponent = (props: any) => {
  return (
      <div style={{marginLeft: '250px', flex: '1', width: '400px'}} >{props.children}</div>
  );
}

export class FountainDialogueReadOnlyComponent extends BaseReadOnlyComponent {
  constructor(props: any) {
    super(props);
  }

  renderSpecific(): JSX.Element {
    return FountainDialogueComponent(this.props);
  }
}
