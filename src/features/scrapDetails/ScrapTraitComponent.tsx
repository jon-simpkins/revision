import {ContentBlock, ContentState} from 'draft-js';
import {isScrapTrait, scrapTraitText} from './usefulConstants';
import React from 'react';

export function scrapTraitStrategy(contentBlock: ContentBlock, callback: (start: number, end: number) => void, contentState: ContentState) {
  if (!!contentBlock.getData().get(isScrapTrait)) {
    callback(0, contentBlock.getText().length);
  }
}

export function checkIsScrapTrait(blockText: string): boolean {
  if (!blockText.startsWith('{{') || !blockText.endsWith('}}')) {
    return false;
  }

  return blockText.includes('#');
}

export function scrapTraitData(blockText: string): { [index: string]: boolean|string|number} {
  const content = blockText.replace('{{', '').replace('}}', '').trim();

  return {
    [scrapTraitText]: content,
    [isScrapTrait]: true,
  }
}

export const ScrapTraitComponent = (props: any) => {
  return <div
      style={{
        background: '#c00',
        color: 'white',
        display: 'flex',
        padding: '8px'
      }}
  >
    <div style={{flex: 1}}>{props.children}</div>
  </div>
}

export const ScrapTraitReadonlyComponent = (props: any) => {
  return null; // Hide
}
