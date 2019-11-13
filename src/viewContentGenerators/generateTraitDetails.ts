import {ScrapPile} from '../types/ScrapPile';
import ViewContentBlock, {
  buildHeader,
  buildParagraph
} from '../app/story-details/view-panel-content/ViewContentBlock';

function generateTraitDetails(scrapPile: ScrapPile, scrapId: string, refId: string): ViewContentBlock[] {
  const blocks = [];

  blocks.push(buildHeader('Trait Details'));
  blocks.push(buildParagraph(refId));
  blocks.push(buildParagraph('Actual content coming soon'));

  return blocks;
}

export default generateTraitDetails;
