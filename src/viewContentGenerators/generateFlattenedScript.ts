import Scrap, {ScrapPrototype} from '../types/Scrap';
import ViewContentBlock, {
  buildHeader,
  buildParagraph,
  buildParagraphsFromTextArea,
  buildSubheader,
} from '../app/story-details/view-panel-content/ViewContentBlock';

import {ScrapPile} from '../types/ScrapPile';
import {TARGET_CONTENT_TYPE} from '../types/ScrapTypes/ScrapContent';

function appendSummary(summaryText: string, contentBlocks: ViewContentBlock[]): ViewContentBlock[] {
  contentBlocks.push(buildParagraph('/* Summary:'));
  contentBlocks = buildParagraphsFromTextArea(summaryText, contentBlocks);
  contentBlocks.push(buildParagraph('*/'));
  return contentBlocks;
}

function buildSectionHeader(depth: number, headerText: string): string {
  let output = '';
  for (let i = 0; i < depth; i++) {
    output += '#';
  }

  return output + ' ' + headerText;
}

function generateFlattenedScriptFromStructure(
  scrapPile: ScrapPile,
  structureScrap: Scrap,
  contentBlocks: ViewContentBlock[],
  depth: number
): ViewContentBlock[] {
  const storyStructure = scrapPile.fetchProperlyRescaledStructureScrap(structureScrap.refId).content.storyStructure;

  storyStructure.blocks.forEach((block, idx) => {

    contentBlocks.push(buildSubheader(buildSectionHeader(depth, block.label)));
    contentBlocks.push(buildParagraph(`/* ${storyStructure.getBlockDurationStr(idx)} */`));

    const summary = scrapPile.getByRefId(block.refId, ScrapPrototype.STRUCTURE_BLOCK_SUMMARY);
    if (summary) {
      contentBlocks = appendSummary(summary.content.text, contentBlocks);
    }
    contentBlocks.push(buildParagraph(''));

    const contentScrap = scrapPile.getByRefId(block.refId, ScrapPrototype.STRUCTURE_BLOCK_CONTENT);
    if (contentScrap) {
      if (contentScrap.content.targetType === TARGET_CONTENT_TYPE.SCRIPT_SCRAP) {
        const scriptScrap = scrapPile.getByRefId(contentScrap.content.targetRefId, ScrapPrototype.SCRIPT);
        if (scriptScrap) {
          contentBlocks = buildParagraphsFromTextArea(scriptScrap.content.script.rawText, contentBlocks);
        }
      } else {
        const subStructureScrap = scrapPile.getByRefId(contentScrap.content.targetRefId, ScrapPrototype.STRUCTURE_SPEC);
        if (subStructureScrap) {
          contentBlocks = generateFlattenedScriptFromStructure(
            scrapPile,
            subStructureScrap,
            contentBlocks,
            depth + 1
          );
        }
      }
    }
  });

  return contentBlocks;
}

function generateFlattenedScript(scrapPile: ScrapPile): ViewContentBlock[] {
  let blocks = [];

  blocks.push(buildHeader('Flattened Script'));
  blocks.push(buildParagraph('Intended for export in the Fountain format:'));
  blocks.push(buildParagraph(''));

  const topStructureScrap = scrapPile.fetchProperlyRescaledStructureScrap(null);
  blocks = generateFlattenedScriptFromStructure(
    scrapPile,
    topStructureScrap,
    blocks,
    1
  );

  return blocks;
}

export default generateFlattenedScript;
