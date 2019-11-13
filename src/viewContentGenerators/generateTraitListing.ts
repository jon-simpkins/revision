import {ScrapPile} from '../types/ScrapPile';
import ViewContentBlock, {
  buildHeader,
  buildListEntry,
  buildSubheader
} from '../app/story-details/view-panel-content/ViewContentBlock';
import ViewOption, {ViewOptionGenerators} from '../types/ViewOption';
import ScrapPrototype from '../types/ScrapPrototype';

function generateTraitListing(scrapPile: ScrapPile): ViewContentBlock[] {
  let blocks = [];

  const traitScrap = scrapPile.newestScrapBySingularPrototype.get(ScrapPrototype.TRAITS);

  blocks.push(buildSubheader('Trait Listing', traitScrap));

  const traitListBlocks = [];

  traitScrap.content.lines.forEach(line => {
    if (!line.active) {
      return;
    }

    const detailViewOption = new ViewOption(
      ViewOptionGenerators.TRAIT_DETAILS,
      null,
      null,
      line.refId
    );

    traitListBlocks.push(buildListEntry(line.text, detailViewOption));
  });

  blocks.push(buildHeader('List of Traits:'));
  blocks = blocks.concat(traitListBlocks);

  return blocks;
}

export default generateTraitListing;
