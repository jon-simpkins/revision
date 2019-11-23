import {ScrapPile, StructureIterationContent} from '../types/ScrapPile';
import ViewContentBlock, {
  buildHeader,
  buildListEntry,
  buildParagraph,
  buildSubheader, buildTimeline
} from '../app/story-details/view-panel-content/ViewContentBlock';
import ScrapPrototype from '../types/ScrapPrototype';
import {FountainElements, FountainElementType} from '../app/story-details/edit-panel-content/script-edit-panel/FountainElements';
import ViewOption, {ViewOptionGenerators} from '../types/ViewOption';

function buildTimelineBlock(scrapPile: ScrapPile, traitRefId: string, traitName: string, blocks: ViewContentBlock[]): ViewContentBlock[] {
  blocks.push(buildSubheader('Script Appearances'));

  blocks.push(buildTimeline(scrapPile.buildScriptAppearanceBlocks(`{#${traitRefId}}`, traitName)));

  return blocks;
}

function generateTraitDetails(scrapPile: ScrapPile, scrapId: string, refId: string): ViewContentBlock[] {
  let blocks = [];

  blocks.push(buildHeader('Trait Details'));
  blocks.push(buildListEntry('Trait Listing', new ViewOption(ViewOptionGenerators.TRAIT_LISTING)));

  const traitListingScrap = scrapPile.newestScrapBySingularPrototype.get(ScrapPrototype.TRAITS);
  let traitName = null;
  traitListingScrap.content.lines.forEach(line => {
    if (line.refId === refId && line.active) {
      traitName = line.text;
    }
  });

  blocks.push(buildParagraph(`#${traitName}:`));
  blocks = buildTimelineBlock(scrapPile, refId, traitName, blocks);

  return blocks;
}

export default generateTraitDetails;
