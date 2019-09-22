import {ScrapPile} from '../ScrapPile';
import EditContext, {EditType} from '../EditContext';
import ViewOption, {ViewOptionGenerators} from '../ViewOption';

function buildScriptContentContext(refId: string, scrapPile: ScrapPile): EditContext {
  // Fetch the content block that was pointing to this script scrap
  const contentBlockRefId = scrapPile.fetchContentBlockByContentRefId(refId);

  if (!contentBlockRefId) {
    throw new Error('Could not find referencing block');
  }

  const parentStructureRefId = scrapPile.fetchStructureBlockParentRefId(contentBlockRefId);
  const parentStructureScrap = scrapPile.fetchProperlyRescaledStructureScrap(parentStructureRefId);

  const parentStructureBlocks = parentStructureScrap.content.storyStructure.blocks;
  let parentStructureBlockLabel = 'NOT FOUND';
  let parentStructureBlockDurationStr = '';
  parentStructureBlocks.forEach((block, idx) => {
    if (block.refId === contentBlockRefId) {
      parentStructureBlockLabel = block.label;
      parentStructureBlockDurationStr = parentStructureScrap.content.storyStructure.getBlockDurationStr(idx);
    }
  });

  const userGuidance = `Expected duration: ${parentStructureBlockDurationStr}`;

  return new EditContext(
    EditType.SCRIPT,
    `Script entry for Story Beat: "${parentStructureBlockLabel}"`,
    null,
    [
      new ViewOption(ViewOptionGenerators.STORY_STRUCTURE, 'Story Structure', null, parentStructureRefId)
    ],
    userGuidance
  );
}

export {buildScriptContentContext};
