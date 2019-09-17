import {ScrapPile} from '../types/ScrapPile';
import ViewContentBlock, {buildHeader, buildListEntry, buildParagraph} from '../app/story-details/view-panel-content/ViewContentBlock';
import {StructureBlock} from '../types/StoryStructure/StoryStructure';
import Scrap, {ScrapPrototype} from '../types/Scrap';
import ViewOption from '../types/ViewOption';

function generateStructurePage(scrapPile: ScrapPile, scrapId: string, refId: string): ViewContentBlock[] {
  const blocks = [];

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

  relevantStructureScrap.content.storyStructure.blocks.forEach((structureBlock: StructureBlock, idx: number) => {
    const durationStr = relevantStructureScrap.content.storyStructure.getTimeRangeStr(idx);

    blocks.push(buildParagraph(structureBlock.label));
    blocks.push(buildListEntry(durationStr));
    blocks.push(buildParagraph(''));

    const blockRefId = structureBlock.refId; // TODO: USE THIS TO FETCH SUMMARY AND CONTENT OR OFFER TO EDIT
  });

  return blocks;
}

export default generateStructurePage;
