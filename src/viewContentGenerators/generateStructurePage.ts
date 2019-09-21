import {ScrapPile} from '../types/ScrapPile';
import ViewContentBlock, {
  buildHeader,
  buildListEntry,
  buildParagraph,
  buildParagraphsFromTextArea, buildScrapDetailsSection, buildSubheader,
  ViewContentBlockType
} from '../app/story-details/view-panel-content/ViewContentBlock';
import {StructureBlock} from '../types/StoryStructure/StoryStructure';
import Scrap, {ScrapPrototype} from '../types/Scrap';
import ViewOption from '../types/ViewOption';
import EditOption from '../types/EditOption';
import {TARGET_CONTENT_TYPE} from '../types/ScrapTypes/ScrapContent';
import {StructureBlockContent} from '../types/ScrapTypes/StructureBlockContent';

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

  blocks.push(buildSubheader(
    'Story Structure',
    relevantStructureScrap
  ));

  blocks.push(buildSubheader(
    `Duration: ${StructureBlock.convertSecToStr(actualDurationSec)}`,
    relevantDurationScrap
  ));

  blocks.push(new ViewContentBlock(ViewContentBlockType.HORIZONTAL_DIVIDER));
  relevantStructureScrap.content.storyStructure.blocks.forEach((structureBlock: StructureBlock, idx: number) => {
    const durationStr = relevantStructureScrap.content.storyStructure.getTimeRangeStr(idx);

    blocks.push(buildSubheader(structureBlock.label));
    blocks.push(buildListEntry(durationStr));

    blocks = blocks.concat(
      buildScrapDetailsSection(scrapPile,
        ScrapPrototype.STRUCTURE_BLOCK_SUMMARY,
        structureBlock.refId,
        blocks,
        'Summary',
        (blockSummaryScrap) => {
          return buildParagraphsFromTextArea(blockSummaryScrap.content.text, []);
        }
      )
    );

    blocks = blocks.concat(
      buildScrapDetailsSection(scrapPile,
        ScrapPrototype.STRUCTURE_BLOCK_CONTENT,
        structureBlock.refId,
        blocks,
        'Content',
        (blockContentScrap) => {
          const additionalBlocks = [];

          const blockContent: StructureBlockContent = blockContentScrap.content as StructureBlockContent;

          let contentTypeStr = '';
          if (blockContentScrap.content.targetType === TARGET_CONTENT_TYPE.SCRIPT_SCRAP) {
            contentTypeStr = 'Script Scrap';
          } else {
            contentTypeStr = 'Sub-Structure';
          }

          const contentPrototype = blockContent.getScrapPrototypeOfTarget();
          const doesExist = !!scrapPile.getByRefId(blockContent.targetRefId, contentPrototype);
          const doesExistStr = doesExist ? 'Does Exist' : 'Does Not Exist';

          const blockContentStr = `${contentTypeStr}: (${doesExistStr})`;

          if (doesExist) {
            const contentScrap = scrapPile.getByRefId(blockContent.targetRefId, contentPrototype);
            additionalBlocks.push(buildParagraph(blockContentStr, ViewOption.detailsForScrap(contentScrap)));
          } else {
            const editOption = new EditOption();
            editOption.prototype = contentPrototype;
            editOption.refId = blockContent.targetRefId;
            additionalBlocks.push(buildParagraph(blockContentStr, null, editOption));
          }

          return additionalBlocks;
        }
      )
    );

    blocks.push(new ViewContentBlock(ViewContentBlockType.HORIZONTAL_DIVIDER));
  });

  return blocks;
}

export default generateStructurePage;
