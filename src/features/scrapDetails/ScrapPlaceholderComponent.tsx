import {ContentBlock, ContentState} from 'draft-js';
import {durationSecContribution, isScrapPlaceholder, ONE_LINE_DURATION_SEC, scrapPlaceholderDurationSecField, scrapPlaceholderText} from './usefulConstants';
import {durationSecondsToString, durationStringToSeconds} from '../utils/durationUtils';
import React from 'react';
import {BaseReadOnlyComponent} from './BaseReadOnlyComponent';

export function scrapPlaceholderStrategy(contentBlock: ContentBlock, callback: (start: number, end: number) => void, contentState: ContentState) {
  if (!!contentBlock.getData().get(isScrapPlaceholder)) {
    callback(0, contentBlock.getText().length);
  }
}

export function checkIsScrapPlaceholder(blockText: string): boolean {
  if (!blockText.startsWith('{{') || !blockText.endsWith('}}')) {
    return false;
  }

  let splitText = blockText.split('|');
  return splitText.length === 2;
}

export function scrapPlaceholderData(blockText: string): { [index: string]: boolean|string|number} {
  const content = blockText.replace('{{', '').replace('}}', '').trim().split('|');

  const placeholderText = content[0].trim();
  let durationSec = 0;
  try {
    durationSec = durationStringToSeconds(content[1].trim());
  } catch {}

  return {
    [scrapPlaceholderText]: placeholderText,
    [scrapPlaceholderDurationSecField]: durationSec,
    [isScrapPlaceholder]: true,
    [durationSecContribution]: scrapPlaceholderDurationSec(blockText)
  }
}

export function scrapPlaceholderDurationSec(blockText: string): number {
  const content = blockText.replace('{{', '').replace('}}', '').trim();

  try {
    let durationStr = content.split('|')[1].trim();
    return durationStringToSeconds(durationStr);
  } catch {
    // Invalid duration string
  }

  return 0;
}

export const ScrapPlaceholderComponent = (props: any) => {
  return <div
      style={{
        background: '#050',
        color: 'white',
        display: 'flex',
        padding: '8px'
      }}
  >
    <div style={{flex: 1}}>{props.children}</div>
  </div>
}


export class ScrapPlaceholderReadOnlyComponent extends BaseReadOnlyComponent {
  renderSpecific(): JSX.Element {
    const contentState = this.props.contentState as ContentState;
    const data = contentState.getBlockMap().get(this.props.blockKey).getData();
    const placeholderText = data.get(scrapPlaceholderText);
    const durationSec = data.get(scrapPlaceholderDurationSecField);

    const displayText = `${placeholderText}: ${durationSecondsToString(durationSec)}`;
    const linesOfText = Math.ceil(displayText.length / 60) + 4; // 40px margin top/bottom
    const numberOfLines = Math.ceil(durationSec / ONE_LINE_DURATION_SEC);
    const heightStyle = `${20 * numberOfLines}px`;
    // line = 20px

    const numberOfInstances = Math.ceil(0.01 + numberOfLines / linesOfText);

    return <div style={{
      height: heightStyle,
      background: '#afa',
      overflow: 'hidden',
      position: 'relative'
    }}
      >{Array(numberOfInstances).fill(0).map(() => {
          return <div style={{display: 'block', padding: '40px 0'}}>{displayText}</div>
        })}
      <div style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '40px',
        background: 'linear-gradient(180deg, transparent 0%, #afa 100%)',
        zIndex: 1,
      }}>
        &nbsp;
      </div>
    </div>
  }
}
