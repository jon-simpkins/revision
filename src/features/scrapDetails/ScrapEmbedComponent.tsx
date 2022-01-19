// Props are:
// https://github.com/facebook/draft-js/blob/main/src/model/decorators/DraftDecorator.js#L54-L71
import {ContentBlock, ContentState} from 'draft-js';
import React, {Component} from 'react';
import {useAppSelector} from '../../app/hooks';
import {ScrapMap, selectScrapMap} from '../scrapList/scrapListSlice';
import {Scrap} from '../../protos_v2';
import {
  useHistory, useLocation
} from 'react-router-dom';
import {durationSecondsToString} from '../utils/durationUtils';
import {Button, Icon} from 'semantic-ui-react';
import {isComment, isScrapEmbedding, scrapLink} from './usefulConstants';


export function createChildScrap(parentScrapId: string, scrapMap: ScrapMap, scrapId: string): Scrap {
  return Scrap.create({
    id: scrapId,
    synopsis: 'New Scrap created in editor',
    prose: 'this has placeholder content for now',
  });
}

export function scrapEmbeddingStrategy(contentBlock: ContentBlock, callback: (start: number, end: number) => void, contentState: ContentState) {
  if (!!contentBlock.getData().get(isScrapEmbedding)) {
    callback(0, contentBlock.getText().length);
  }
}

export function checkIsScrapEmbed(blockText: string): boolean {
  if (!blockText.startsWith('{{') || !blockText.endsWith('}}')) {
    return false;
  }

  return !(blockText.includes('|') || blockText.includes('@') || blockText.includes('#'));
}

export function scrapEmbedData(blockText: string): { [index: string]: boolean|string} {
  const scrapId = blockText.replace('{{', '').replace('}}', '').trim();

  return {
    [scrapLink]: scrapId,
    [isScrapEmbedding]: true,
  }
}

/**
 * Embedded component to show a scrap in a DraftJS editor.
 *
 * Assumes that `scrapLink` on the block's data contains the ID
 * */
export const ScrapEmbedComponent = (props: any) => {
  const contentState = props.contentState as ContentState;
  const data = contentState.getBlockMap().get(props.blockKey).getData();
  const scrapId = data.get(scrapLink);
  const inComment = data.get(isComment);

  const scrapMap = useAppSelector(selectScrapMap);
  const history = useHistory();
  const currentLocation = useLocation();

  const parentScrapId = getScrapIdFromUrl(currentLocation.pathname);

  const backgroundColor = inComment ? '#cfead9' : '#555';

  return (
      <div
          style={{
            background: backgroundColor,
            fontWeight: 'bold',
            display: 'flex',
            padding: '8px'
          }}
      >
        <div style={{
          margin: '0',
          fontSize: '1px',
          height: '2px',
          width: '2px',
          overflow: 'hidden',
          color: backgroundColor
        }} >{props.children}</div>
        <div style={{flex: '1', cursor: 'pointer', padding: '8px', border: '1px solid', background: 'white', fontWeight: 'normal'}}>
          <ScrapEmbedSummary
            parentScrapId={parentScrapId}
            scrapId={scrapId}
            scrapMap={scrapMap}
            onGotoScrap={() => { history.push(`/scrap/${scrapId}`) }}
          />
        </div>
      </div>
  );
}

function getScrapIdFromUrl(url: string): string {
  return url.replace('/scrap/', '');
}


interface ScrapEmbedSummaryProps {
  parentScrapId: string;
  scrapId: string;
  scrapMap: ScrapMap;
  onGotoScrap: () => void;
}

export class ScrapEmbedSummary extends Component<ScrapEmbedSummaryProps> {
  render() {
    const scrap = this.props.scrapMap[this.props.scrapId];

    if (!scrap) {
      return (<div>
        Scrap "{this.props.scrapId}" does not exist.
      </div>)
    }

    if (this.props.scrapId === this.props.parentScrapId) {
      return (<div style={{color: 'red'}}>
        Scraps shouldn't include themselves
      </div>);
    }

    return (<div style={{display: 'flex'}}>
      <Button icon color='blue'
              onClick={() => {this.props.onGotoScrap();}}
      >
        <Icon name='angle right' />
      </Button>
      <div style={{marginLeft: '24px', flex: '1'}}>
        <div>{scrap.synopsis}</div>
        <div>{durationSecondsToString(scrap.intendedDurationSec)}</div>
      </div>
    </div>);
  }
}
