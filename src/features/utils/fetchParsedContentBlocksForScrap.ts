import {ScrapMap} from '../scrapList/scrapListSlice';
import {ContentBlock, ContentState} from 'draft-js';
import {parseAllProse} from '../scrapDetails/parseProse';
import {ancestorField, isComment, isScrapEmbedding, scrapIdField, scrapLink} from '../scrapDetails/usefulConstants';

export function fetchParsedContentBlocksForScrap(scrapId: string, scrapAncestors: string[], scrapMap: ScrapMap): Array<ContentBlock> {
  let prose = scrapMap[scrapId]?.prose || '';

  let newAncestors = [...scrapAncestors, scrapId];

  const initialContentState = ContentState.createFromText(prose);

  const parseResult = parseAllProse(initialContentState, scrapMap, 500, 5000);

  const allNewContentBlocks: Array<ContentBlock> = [];

  parseResult.contentState.getBlocksAsArray().forEach((block) => {
    const blockData = block.getData();

    if (blockData.get(isComment)) {
      // Skip
      return;
    }

    if (!blockData.get(isScrapEmbedding)) {
      // Simple addition, just append the ID of the scrap, and the ancestors at this point
      let updatedBlock = block.set('data', blockData.set(scrapIdField, scrapId).set(ancestorField, scrapAncestors));

      allNewContentBlocks.push(updatedBlock as ContentBlock);
      return;
    }

    const embeddedScrapId = blockData.get(scrapLink);

    if (!scrapMap[embeddedScrapId]) {
      // Scrap doesn't exist, skip
      return;
    }

    if (newAncestors.includes(embeddedScrapId)) {
      throw Error(`Replacing scrap ${embeddedScrapId} would cause infinite recursion`);
    }

    const subBlocks = fetchParsedContentBlocksForScrap(embeddedScrapId, newAncestors, scrapMap);

    allNewContentBlocks.push(...subBlocks);
  });

  return allNewContentBlocks;
}
