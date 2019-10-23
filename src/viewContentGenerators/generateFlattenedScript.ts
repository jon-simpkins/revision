import ViewContentBlock, {
  buildHeader,
  buildParagraph,
  ViewContentBlockType,
} from '../app/story-details/view-panel-content/ViewContentBlock';

import {ScrapPile, StructureIterationContent} from '../types/ScrapPile';
import {Script} from '../types/Script/Script';
import {StructureBlock} from '../types/StoryStructure/StoryStructure';

function buildSectionHeader(depth: number, headerText: string): string {
  let output = '';
  for (let i = 0; i < depth; i++) {
    output += '#';
  }

  return output + ' ' + headerText;
}

function generateFlattenedScript(scrapPile: ScrapPile): ViewContentBlock[] {
  const blocks = [];

  blocks.push(buildHeader('Flattened Script'));
  blocks.push(buildParagraph('Intended for export in the Fountain format:'));
  blocks.push(buildParagraph(''));

  let flattenedScript = '';
  scrapPile.iterateOverStructure((contents: StructureIterationContent) => {
    flattenedScript += buildSectionHeader(contents.depth, contents.block.label) + '\n';
    flattenedScript += `/* ${StructureBlock.convertDurationToStr(contents.durationSec)} */\n`;

    if (contents.summaryScrap) {
      flattenedScript += `/* Summary:\n${contents.summaryScrap.content.text}\n*/\n`;
    }

    if (contents.scriptScrap) {
      flattenedScript += contents.scriptScrap.content.script.rawText;
    }
  });

  flattenedScript = Script.convertCharacterRefIdsToNames(flattenedScript, scrapPile.buildCharacterMap());

  blocks.push(new ViewContentBlock(ViewContentBlockType.SCRIPT_SECTION,
    flattenedScript
  ));

  return blocks;
}

export default generateFlattenedScript;
