import {ScrapPile} from '../types/ScrapPile';
import ViewContentBlock, {
  buildHeader,
  buildListEntry,
  buildParagraph,
  buildScrapDetailsSection, buildScriptSection,
  buildSubheader,
  ViewContentBlockType
} from '../app/story-details/view-panel-content/ViewContentBlock';
import {StructureBlock} from '../types/StoryStructure/StoryStructure';
import Scrap from '../types/Scrap';
import ScrapPrototype from '../types/ScrapPrototype';
import ViewOption, {ViewOptionGenerators} from '../types/ViewOption';
import EditOption from '../types/EditOption';
import {TARGET_CONTENT_TYPE} from '../types/ScrapTypes/ScrapContent';
import {StructureBlockContent} from '../types/ScrapTypes/StructureBlockContent';

function generateStructurePage(scrapPile: ScrapPile, scrapId: string, refId: string): ViewContentBlock[] {
  let blocks = [];

  const relevantStructureScrap = scrapPile.fetchProperlyRescaledStructureScrap(refId);
  const actualDurationSec = scrapPile.fetchConstraintDurationSec(refId);
  let relevantDurationScrap: Scrap;
  if (!refId) {
    relevantDurationScrap = scrapPile.newestScrapBySingularPrototype.get(ScrapPrototype.MOVIE_DURATION);
  } else {
    const contentBlockRefId = scrapPile.fetchContentBlockByContentRefId(refId);
    const parentStructureRefId = scrapPile.fetchStructureBlockParentRefId(contentBlockRefId);

    relevantDurationScrap = scrapPile.getByRefId(
      parentStructureRefId,
      ScrapPrototype.STRUCTURE_SPEC
    );
  }

  if (!relevantStructureScrap) {
    blocks.push(buildHeader(
      'Story Structure not available yet'
    ));
    return blocks;
  }

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
    blocks.push(buildParagraph(structureBlock.description));
    blocks.push(buildListEntry(durationStr));

    blocks = blocks.concat(
      buildScrapDetailsSection(scrapPile,
        ScrapPrototype.STRUCTURE_BLOCK_SUMMARY,
        structureBlock.refId,
        blocks,
        'Summary',
        (blockSummaryScrap) => {
          return [
            buildScriptSection(blockSummaryScrap.content.script.rawText, scrapPile)
          ];
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
            // TODO: include rendering of sub-structure
            let viewOption = ViewOption.detailsForScrap(contentScrap);
            if (contentScrap.prototype === ScrapPrototype.STRUCTURE_SPEC) {
              viewOption = new ViewOption(ViewOptionGenerators.STORY_STRUCTURE, null, null, contentScrap.refId);
            }

            additionalBlocks.push(buildParagraph(blockContentStr, viewOption));
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
