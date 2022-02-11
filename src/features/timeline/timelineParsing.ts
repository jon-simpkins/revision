import {ScrapMap} from '../scrapList/scrapListSlice';
import {TimelineBlock, TimelineRow} from './Timeline';
import {ancestorField, character, durationSecContribution, pendingDurationSecContribution, scrapIdField, scrapTraitText} from '../scrapDetails/usefulConstants';
import {ContentBlock} from 'draft-js';
import {Scrap} from '../../protos_v2';

interface ParsedTimeline {
  totalDurationSec: number;
  totalCompletedSec: number;
  percentComplete: number;
  rows: TimelineRow[];
}

export function parseTimeline(parsedBlocks: ContentBlock[], scrapMap: ScrapMap): ParsedTimeline {
  let rows: TimelineRow[] = [];

  let totalDurationSec = 0;
  let totalPendingSec = 0;
  for (let i = 0; i < parsedBlocks.length; i++) {

    const durationContribution = parsedBlocks[i].getData().get(durationSecContribution) || 0;
    const incompleteContribution = parsedBlocks[i].getData().get(pendingDurationSecContribution) || 0;
    if (!durationContribution) {
      //continue;
    }

    const characterContribution = parsedBlocks[i].getData().get(character) || null;

    const traitString = (parsedBlocks[i].getData().get(scrapTraitText) || '') as string;
    const parsedTraits = traitString.split('#').filter(Boolean).map((untrimmed) => { return untrimmed.trim(); });

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
            durationContribution,
            getScrapCompleteness(ancestors[j], scrapMap),
        ));
      }

      if (!!characterContribution) {
        rows[j].blocks[rows[j].blocks.length - 1].characters.add(characterContribution);
      }
      parsedTraits.forEach((trait) => {
        rows[j].blocks[rows[j].blocks.length - 1].traits.add(trait);
      });
    }

    totalDurationSec += durationContribution;
    totalPendingSec += incompleteContribution;
  }

  return {
    totalDurationSec: totalDurationSec,
    totalCompletedSec: totalDurationSec - totalPendingSec,
    percentComplete: Math.ceil(1000 * (1 - (totalPendingSec / totalDurationSec))) / 10,
    rows: rows,
  }
}

function getScrapSynopsis(scrapId: string, scrapMap: ScrapMap): string {
  return scrapMap[scrapId]?.synopsis || '';
}

function getScrapCompleteness(scrapId: string, scrapMap: ScrapMap): Scrap.Completeness {
  return scrapMap[scrapId]?.completeness || Scrap.Completeness.NOT_STARTED
}
