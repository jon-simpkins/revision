import {ScrapMap} from '../scrapList/scrapListSlice';
import {TimelineBlock, TimelineRow} from './Timeline';
import {fetchParsedContentBlocksForScrap} from '../utils/fetchParsedContentBlocksForScrap';
import {ancestorField, durationSecContribution, scrapIdField} from '../scrapDetails/usefulConstants';

interface ParsedTimeline {
  totalDurationSec: number;
  rows: TimelineRow[];
}

export function parseTimeline(scrapId: string, scrapMap: ScrapMap): ParsedTimeline {
  let rows: TimelineRow[] = [];

  // TODO: bring this in from a common place, don't double-parse
  const parsedBlocks = fetchParsedContentBlocksForScrap(scrapId, [], scrapMap);

  let totalDurationSec = 0;
  for (let i = 0; i < parsedBlocks.length; i++) {

    const durationContribution = parsedBlocks[i].getData().get(durationSecContribution) || 0;
    if (!durationContribution) {
      continue;
    }

    const ancestors = [
        ...(parsedBlocks[i].getData().get(ancestorField) || []),
        parsedBlocks[i].getData().get(scrapIdField) || ''
    ];

    for (let j = 0; j < ancestors.length; j++) {
      if (rows.length <= j) {
        // Need to add a new row
        rows.push(new TimelineRow());
      }

      // Check to see what the last block's ID is
      const lastBlockId = rows[j].lastBlockId();

      if (ancestors[j] === lastBlockId) {
        // Extend existing block
        rows[j].blocks[rows[j].blocks.length - 1].durationSec += durationContribution;
      } else {
        rows[j].blocks.push(new TimelineBlock(
            getScrapSynopsis(ancestors[j], scrapMap),
            ancestors[j],
            totalDurationSec,
            durationContribution
        ));
      }
    }

    totalDurationSec += durationContribution;
  }

  return {
    totalDurationSec: totalDurationSec,
    rows: rows,
  }
}

function getScrapSynopsis(scrapId: string, scrapMap: ScrapMap): string {
  return scrapMap[scrapId]?.synopsis || '';
}
