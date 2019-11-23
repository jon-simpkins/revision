import {ScrapPile, StructureIterationContent} from '../types/ScrapPile';
import ViewContentBlock, {
  buildHeader,
  buildListEntry, buildParagraph,
  buildSubheader, buildTimeline
} from '../app/story-details/view-panel-content/ViewContentBlock';
import ViewOption, {ViewOptionGenerators} from '../types/ViewOption';
import ScrapPrototype from '../types/ScrapPrototype';
import {LineContent} from '../types/ScrapTypes/LineContent';

function buildTimelineBlock(scrapPile: ScrapPile, traits: LineContent[]): ViewContentBlock | null {

  const timelineBlocks = scrapPile.buildStoryTimelineBlocks();

  scrapPile.iterateOverStructure((contents: StructureIterationContent) => {
    if (contents.substructureScrap) {
      return; // Only consider the deepest level
    }

    traits.forEach(line => {
      if (!line.active) {
        return;
      }

      const substring = `{#${line.refId}}`;
      if (contents.summaryContainsSubstring(substring) || contents.scriptContainsSubstring(substring)) {
        timelineBlocks.push(
          contents.buildTimelineBlock(line.text, false)
        );
      }
    });
  });

  if (!timelineBlocks.length) {
    return null;
  }

  return buildTimeline(timelineBlocks);
}

function generateTraitListing(scrapPile: ScrapPile): ViewContentBlock[] {
  let blocks = [];

  const traitScrap = scrapPile.newestScrapBySingularPrototype.get(ScrapPrototype.TRAITS);

  blocks.push(buildSubheader('Trait Listing', traitScrap));
  if (!traitScrap) {
    blocks.push(buildParagraph('No traits listed yet'));
    return blocks;
  }

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

  const timelineBlock = buildTimelineBlock(scrapPile, traitScrap.content.lines);
  if (timelineBlock) {
    blocks.push(buildHeader('Timeline:'));
    blocks.push(timelineBlock);
  }

  return blocks;
}

export default generateTraitListing;
