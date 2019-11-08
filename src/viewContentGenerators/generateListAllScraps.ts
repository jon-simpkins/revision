import ViewContentBlock, {
  buildHeader,
  buildParagraph,
  ViewContentBlockType
} from '../app/story-details/view-panel-content/ViewContentBlock';
import {ScrapPile} from '../types/ScrapPile';
import ScrapPrototype from '../types/ScrapPrototype';

function generateListAllScraps(scrapPile: ScrapPile): ViewContentBlock[] {
  const blocks = [];

  blocks.push(buildHeader('All Scraps'));
  blocks.push(buildParagraph('For debugging, here is an ordered list of all scraps'));

  const orderedScrapSummaries = [];
  scrapPile.scrapById.forEach((scrap) => {
    orderedScrapSummaries.push({
      created: scrap.completedEpoch,
      header: `${new Date(scrap.completedEpoch).toLocaleString()}: ${ScrapPrototype[scrap.prototype]}`,
      id: scrap.id,
      refId: scrap.refId,
      content: scrap.content.toString(),
      serialization: scrap.generateSerialization()
    });
  });

  orderedScrapSummaries.sort((a, b) => {
    return b.created - a.created;
  }).forEach(summary => {
    blocks.push(new ViewContentBlock(ViewContentBlockType.HORIZONTAL_DIVIDER));
    blocks.push(buildParagraph(summary.header));
    blocks.push(buildParagraph(`id: ${summary.id}`));
    blocks.push(buildParagraph(`refId: ${summary.refId}`));
    blocks.push(buildParagraph(summary.content));
  });

  blocks.push(new ViewContentBlock(ViewContentBlockType.SCRIPT_SECTION, JSON.stringify(orderedScrapSummaries.map(summary => {
    return summary.serialization;
  }), null, 4)));

  return blocks;
}

export default generateListAllScraps;
