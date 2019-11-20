import ViewContentBlock, {
  buildHeader,
  buildListEntry,
  buildParagraph,
  buildScrapDetailsSection,
  buildScriptSection,
  buildSubheader,
  ViewContentBlockType
} from '../app/story-details/view-panel-content/ViewContentBlock';
import {ScrapPile} from '../types/ScrapPile';
import ViewOption, {ViewOptionGenerators} from '../types/ViewOption';
import ScrapPrototype from '../types/ScrapPrototype';
import {StoryStructure, StructureBlock} from '../types/StoryStructure/StoryStructure';
import {TARGET_CONTENT_TYPE} from '../types/ScrapTypes/ScrapContent';
import EditOption from '../types/EditOption';

function buildSubstructureContent(storyStructure: StoryStructure): ViewContentBlock[] {
  const structureBlocks = [];
  structureBlocks.push(new ViewContentBlock(ViewContentBlockType.HORIZONTAL_DIVIDER));

  storyStructure.blocks.forEach((structureBlock: StructureBlock, idx: number) => {
    const durationStr = storyStructure.getTimeRangeStr(idx);

    structureBlocks.push( new ViewContentBlock(
      ViewContentBlockType.LINK_SUBHEADER,
      structureBlock.label,
      new ViewOption(ViewOptionGenerators.STRUCTURE_BLOCK_VIEW, '', null, structureBlock.refId),
      null
    ));
    structureBlocks.push(buildParagraph(structureBlock.description));
    structureBlocks.push(buildListEntry(durationStr));

    structureBlocks.push(new ViewContentBlock(ViewContentBlockType.HORIZONTAL_DIVIDER));
  });

  return structureBlocks;
}

function generateStructureBlockView(scrapPile: ScrapPile, scrapId: string, blockRefId: string): ViewContentBlock[] {
  let viewContentBlocks = [];

  viewContentBlocks.push(buildHeader('Structure Block View'));

  let parentStructureRefId = null; // refId of the structure itself
  let parentStructureBlockRefId = null; // refId of the block whose content *is* that structure

  let parentStructure: StoryStructure = null;
  let blockDurationSec = 0;
  let blockHeaderText = '';
  let blockSubheaderText = '';
  let scriptBlocks = [];
  let substructureBlocks = [];
  let summaryBlocks = [];

  if (blockRefId) { // Only do if not top-level structure already
    parentStructureRefId = scrapPile.fetchStructureBlockParentRefId(blockRefId);
    parentStructureBlockRefId = scrapPile.fetchContentBlockByContentRefId(parentStructureRefId);

    parentStructure = scrapPile.fetchProperlyRescaledStructureScrap(parentStructureRefId).content.storyStructure;

    parentStructure.blocks.forEach((block, idx) => {
      if (block.refId === blockRefId) {
        blockDurationSec = parentStructure.getBlockEndSec(idx) - block.startTime;
        blockHeaderText = block.label;
        blockSubheaderText = block.description;
      }
    });

    summaryBlocks = buildScrapDetailsSection(scrapPile,
      ScrapPrototype.STRUCTURE_BLOCK_SUMMARY,
      blockRefId,
      [],
      'Summary',
      (summaryScrap) => {
        return [
          buildScriptSection(summaryScrap.content.script.rawText, scrapPile)
        ];
      }
    );

    const contentScrap = scrapPile.getByRefId(blockRefId, ScrapPrototype.STRUCTURE_BLOCK_CONTENT);
    if (contentScrap) {
      if (contentScrap.content.targetType === TARGET_CONTENT_TYPE.SCRIPT_SCRAP) {
        scriptBlocks = buildScrapDetailsSection(scrapPile,
          ScrapPrototype.SCRIPT,
          contentScrap.content.targetRefId,
          [],
          'Script',
          (scriptScrap) => {
            return [
              buildScriptSection(scriptScrap.content.script.rawText, scrapPile)
            ];
          }
        );
      } else if (contentScrap.content.targetType === TARGET_CONTENT_TYPE.SUB_STRUCTURE) {
        substructureBlocks = buildScrapDetailsSection(scrapPile,
          ScrapPrototype.STRUCTURE_SPEC,
          contentScrap.content.targetRefId,
          [],
          'Structure',
          (subStructureScrap) => {
            subStructureScrap = scrapPile.fetchProperlyRescaledStructureScrap(contentScrap.content.targetRefId);
            return buildSubstructureContent(subStructureScrap.content.storyStructure);
          }
        );
      }
    }


  } else {
    blockHeaderText = 'Top-Level Structure';
    blockDurationSec = Number(scrapPile.newestScrapBySingularPrototype.get(ScrapPrototype.MOVIE_DURATION).content.text) * 60;

    summaryBlocks = buildScrapDetailsSection(scrapPile,
      ScrapPrototype.LOG_LINE,
      null,
      [],
      'Summary',
      (summaryScrap) => {
        return [
          buildScriptSection(summaryScrap.content.script.rawText, scrapPile)
        ];
      }
    );

    substructureBlocks = buildScrapDetailsSection(scrapPile,
      ScrapPrototype.STRUCTURE_SPEC,
      null,
      [],
      'Structure',
      (structureScrap) => {
        structureScrap = scrapPile.fetchProperlyRescaledStructureScrap(null);

        return buildSubstructureContent(structureScrap.content.storyStructure);
      }
    );
  }

  viewContentBlocks.push(buildSubheader(blockHeaderText));
  viewContentBlocks.push(buildParagraph(blockSubheaderText));

  viewContentBlocks.push(buildParagraph(`Duration: ${StructureBlock.convertSecToStr(blockDurationSec)}`));



  if (blockRefId) {
    viewContentBlocks.push(buildListEntry(
      `Parent structure`,
      new ViewOption(ViewOptionGenerators.STRUCTURE_BLOCK_VIEW, null, null, parentStructureBlockRefId)
    ));
  }

  let assignContentBlocks = [];
  if (blockRefId) { // Skip for top-level
    assignContentBlocks = buildScrapDetailsSection(scrapPile,
      ScrapPrototype.STRUCTURE_BLOCK_CONTENT,
      blockRefId,
      [],
      'Content Assignment',
      (contentAssignment) => {
        return [];
      }
    );
  }

  viewContentBlocks = viewContentBlocks
    .concat(summaryBlocks)
    .concat(assignContentBlocks)
    .concat(scriptBlocks)
    .concat(substructureBlocks);

  return viewContentBlocks;
}

export default generateStructureBlockView;
