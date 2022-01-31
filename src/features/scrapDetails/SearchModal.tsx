import {Input, Modal} from 'semantic-ui-react';
import {ScrapMap} from '../scrapList/scrapListSlice';
import {Scrap} from '../../protos_v2';
import {
  Link
} from 'react-router-dom';
import React from 'react';
import {durationSecondsToString} from '../utils/durationUtils';

export interface SearchResult {
  scrap: Scrap;
  score: number;
  preview: string;
}

const MAX_SEARCH_RESULTS = 5;
const EACH_SEARCH_RESULT_HEIGHT_PX = 120;

function computeSearchResults(scrapMap: ScrapMap, query: string): SearchResult[] {
  if (!query.length) {
    return [];
  }

  return Object.values(scrapMap)
      .map((scrap): SearchResult|null => {
        if (!scrap.prose.toLowerCase().includes(query.toLowerCase())) {
          return null;
        }

        let firstIndex = scrap.prose.toLowerCase().indexOf(query.toLowerCase());

        firstIndex = Math.max(0, firstIndex - 30);

        return {
          scrap: scrap,
          score: scrap.intendedDurationSec,
          preview: scrap.prose.substring(firstIndex, firstIndex + 150),
        };
      })
      .filter(Boolean)
      .sort((a, b) => {
        // @ts-ignore
        return b.score - a.score;
      })
      .slice(0, 5) as SearchResult[]; // Final casting required since TS doesn't understand the filter(Boolean) bit
}

function formatSearchResults(currentSearchQuery: string, currentSearchResults: SearchResult[], onSelect: () => void): JSX.Element {
  const minHeightPx = MAX_SEARCH_RESULTS * (8 + EACH_SEARCH_RESULT_HEIGHT_PX);

  if (!currentSearchQuery) {
    return <div style={{minHeight: `${minHeightPx}px`}}>&nbsp;</div>;
  }

  if (!currentSearchResults.length) {
    return <div style={{minHeight: `${minHeightPx}px`}}>No results</div>;
  }

  return <div style={{minHeight: `${minHeightPx}px`}}>
    {currentSearchResults.map((result) => {
      return <div style={{
        marginBottom: '8px',
        height: `${EACH_SEARCH_RESULT_HEIGHT_PX}px`,
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Link to={'/scrap/' + result.scrap.id}>
          <span style={{fontSize: '16px'}} onClick={onSelect}>
            {result.scrap.synopsis} ({durationSecondsToString(result.scrap.intendedDurationSec)})
          </span>
        </Link>
        <pre style={{
          background: 'lightgrey',
          flex: '1',
          overflowY: 'scroll',
        }}>
          ...{result.preview}...
        </pre>
      </div>
    })}
  </div>
}

export function getSearchModal(isOpen: boolean, currentSearchQuery: string, currentSearchResults: SearchResult[], scrapMap: ScrapMap, onSearchQueryChange: (newQuery: string, newResults: SearchResult[]) => void, onClose: () => void) {

  return <Modal
      open={isOpen}
      onClose={onClose}
      closeOnDimmerClick={true}
      closeOnEscape={true}
    >
    <Modal.Header>Search</Modal.Header>
    <Modal.Content>
      <Input
          style={{display: 'block', marginBottom: '24px'}}
          placeholder={'Search across all scraps'}
          onChange={(e) => {
            const results = computeSearchResults(scrapMap, e.target.value);
            onSearchQueryChange(e.target.value, results);}}
          value={currentSearchQuery}/>
      {formatSearchResults(currentSearchQuery, currentSearchResults, onClose)}
    </Modal.Content>
  </Modal>
}
