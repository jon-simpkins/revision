import {ScrapPile} from '../ScrapPile';
import EditContext, {EditType} from '../EditContext';
import ViewOption, {ViewOptionGenerators} from '../ViewOption';

function buildScriptContentContext(refId: string, scrapPile: ScrapPile): EditContext {
  // Fetch the content block that was pointing to this script scrap
  const contentBlockRefId = scrapPile.fetchContentBlockByContentRefId(refId);

  const context = new EditContext(
    EditType.SCRIPT,
    'New Script Entry',
    null,
    [],
    'Feel free to write whatever scene you feel like! You can link it into a story structure later'
  );

  if (!contentBlockRefId) {
    // Assume new one-off scene
    return context;
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


  context.headerPrompt = `Script entry for Story Beat: "${parentStructureBlockLabel}"`;
  context.userGuidance = `Expected duration: ${parentStructureBlockDurationStr}`;
  context.viewOptions = [
    new ViewOption(ViewOptionGenerators.STORY_STRUCTURE, 'Story Structure', null, parentStructureRefId)
  ];

  return context;
}

export {buildScriptContentContext};
