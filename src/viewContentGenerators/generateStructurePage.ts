import {ScrapPile} from '../types/ScrapPile';
import ViewContentBlock, {
  buildHeader,
  buildListEntry,
  buildParagraph,
  buildParagraphsFromTextArea,
  ViewContentBlockType
} from '../app/story-details/view-panel-content/ViewContentBlock';
import {StructureBlock} from '../types/StoryStructure/StoryStructure';
import Scrap, {ScrapPrototype} from '../types/Scrap';
import ViewOption from '../types/ViewOption';
import EditOption from '../types/EditOption';

function generateStructurePage(scrapPile: ScrapPile, scrapId: string, refId: string): ViewContentBlock[] {
  let blocks = [];

  let relevantStructureScrap: Scrap;
  let actualDurationSec: number;
  let relevantDurationScrap: Scrap;
  if (!refId) {
    // Fetch the top-level structure
    relevantStructureScrap = scrapPile.newestScrapBySingularPrototype.get(ScrapPrototype.STRUCTURE_SPEC);
    if (relevantStructureScrap) {
      relevantDurationScrap = scrapPile.newestScrapBySingularPrototype.get(ScrapPrototype.MOVIE_DURATION);
      actualDurationSec = Number(relevantDurationScrap.content.text) * 60;
    }
  } else {
    console.error('NOT IMPLEMENTED YET!');
    return null;
  }

  if (!relevantStructureScrap) {
    blocks.push(buildHeader(
      'Story Structure not available yet'
    ));
    return blocks;
  }

  // Necessary, since the duration is determined in an independent scrap
  relevantStructureScrap.content.storyStructure.rescaleToDuraction(actualDurationSec);

  blocks.push(buildHeader(
    'Story Structure',
    ViewOption.detailsForScrap(relevantStructureScrap)
  ));

  blocks.push(buildHeader(
    `Duration: ${StructureBlock.convertSecToStr(actualDurationSec)}`,
    ViewOption.detailsForScrap(relevantDurationScrap)
  ));

  blocks.push(new ViewContentBlock(ViewContentBlockType.HORIZONTAL_DIVIDER));
  relevantStructureScrap.content.storyStructure.blocks.forEach((structureBlock: StructureBlock, idx: number) => {
    const durationStr = relevantStructureScrap.content.storyStructure.getTimeRangeStr(idx);

    const blockSummaryScrap = scrapPile.getByRefId(structureBlock.refId, ScrapPrototype.STRUCTURE_BLOCK_SUMMARY);

    blocks.push(buildHeader(structureBlock.label));
    blocks.push(buildListEntry(durationStr));

    if (blockSummaryScrap) {
      blocks.push(buildHeader('Block Summary:', ViewOption.detailsForScrap(blockSummaryScrap)));
      blocks = buildParagraphsFromTextArea(blockSummaryScrap.content.text, blocks);
    } else {
      const summaryEditOption = new EditOption();
      summaryEditOption.refId = structureBlock.refId;
      summaryEditOption.prototype = ScrapPrototype.STRUCTURE_BLOCK_SUMMARY;
      blocks.push(buildHeader('Block Summary: TBD', null, summaryEditOption));
    }

    blocks.push(new ViewContentBlock(ViewContentBlockType.HORIZONTAL_DIVIDER));
  });

  return blocks;
}

export default generateStructurePage;
