import {ContentBlock, ContentState} from 'draft-js';
import {character, durationSecContribution, isFountainDialogue, ONE_LINE_DURATION_SEC} from './usefulConstants';
import React from 'react';
import {BaseReadOnlyComponent} from './BaseReadOnlyComponent';

export function fountainDialogueStrategy(contentBlock: ContentBlock, callback: (start: number, end: number) => void, contentState: ContentState) {
  if (!!contentBlock.getData().get(isFountainDialogue)) {
    callback(0, contentBlock.getText().length);
  }
}

export function checkIsDialogue(characterBefore: string, blockText: string): boolean {
  return !!characterBefore && (!blockText.startsWith('(') || !blockText.endsWith(')'));
}

export function dialogueDurationSec(blockText: string): number {
  return ONE_LINE_DURATION_SEC * Math.ceil(blockText.length / 36); // About 36 characters per line of dialogue fit
}

export function dialogueData(characterBefore: string, blockText: string): { [index: string]: boolean|string|number} {
  return {
    [isFountainDialogue]: true,
    [character]: characterBefore,
    [durationSecContribution]: dialogueDurationSec(blockText)
  }
}

/**
 * Component to show Fountain dialogue in DraftJS.
 *
 */
export const FountainDialogueComponent = (props: any) => {
  return (
      <div style={{marginLeft: '6em', width: '23.5em'}} >{props.children}</div>
  );
}

export class FountainDialogueReadOnlyComponent extends BaseReadOnlyComponent {
  renderSpecific(): JSX.Element {
    return FountainDialogueComponent(this.props);
  }
}
