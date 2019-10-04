import Scrap, {ScrapPrototype} from '../types/Scrap';
import ViewContentBlock, {
  buildHeader,
  buildParagraph,
  ViewContentBlockType,
} from '../app/story-details/view-panel-content/ViewContentBlock';

import {ScrapPile} from '../types/ScrapPile';
import {TARGET_CONTENT_TYPE} from '../types/ScrapTypes/ScrapContent';

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
  depth: number
): string {
  const storyStructure = scrapPile.fetchProperlyRescaledStructureScrap(structureScrap.refId).content.storyStructure;

  let plaintextContent = '';

  storyStructure.blocks.forEach((block, idx) => {

    plaintextContent += buildSectionHeader(depth, block.label) + '\n';
    plaintextContent += `/* ${storyStructure.getBlockDurationStr(idx)} */\n`;

    const summary = scrapPile.getByRefId(block.refId, ScrapPrototype.STRUCTURE_BLOCK_SUMMARY);
    if (summary) {
      plaintextContent += `/* Summary:\n${summary.content.text}\n*/\n`;
    }

    const contentScrap = scrapPile.getByRefId(block.refId, ScrapPrototype.STRUCTURE_BLOCK_CONTENT);
    if (contentScrap) {
      if (contentScrap.content.targetType === TARGET_CONTENT_TYPE.SCRIPT_SCRAP) {
        const scriptScrap = scrapPile.getByRefId(contentScrap.content.targetRefId, ScrapPrototype.SCRIPT);
        if (scriptScrap) {
          plaintextContent += scriptScrap.content.script.rawText;
        }
      } else {
        const subStructureScrap = scrapPile.getByRefId(contentScrap.content.targetRefId, ScrapPrototype.STRUCTURE_SPEC);
        if (subStructureScrap) {
          plaintextContent += generateFlattenedScriptFromStructure(
            scrapPile,
            subStructureScrap,
            depth + 1
          );
        }
      }
    }
  });

  return plaintextContent;
}

function generateFlattenedScript(scrapPile: ScrapPile): ViewContentBlock[] {
  const blocks = [];

  blocks.push(buildHeader('Flattened Script'));
  blocks.push(buildParagraph('Intended for export in the Fountain format:'));
  blocks.push(buildParagraph(''));

  const topStructureScrap = scrapPile.fetchProperlyRescaledStructureScrap(null);

  blocks.push(new ViewContentBlock(ViewContentBlockType.SCRIPT_SECTION,
    generateFlattenedScriptFromStructure(
      scrapPile,
      topStructureScrap,
      1
    )
  ));

  return blocks;
}

export default generateFlattenedScript;
