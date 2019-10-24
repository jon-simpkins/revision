import {ScrapPile} from '../ScrapPile';
import EditContext, {EditType} from '../EditContext';
import ViewOption, {ViewOptionGenerators} from '../ViewOption';
import {ScrapContent} from '../ScrapTypes/ScrapContent';
import {Script} from '../Script/Script';

const CONVERT_CHARACTER_REFID_TO_NAME = (scrapContent: ScrapContent, editContext: EditContext) => {
  scrapContent.script.rawText = Script.convertCharacterRefIdsToNames(scrapContent.script.rawText, editContext.characterMap);
  return scrapContent;
};

const CONVERT_CHARACTER_NAME_TO_REFID = (scrapContent: ScrapContent, editContext: EditContext) => {
  scrapContent.script.convertCharacterNamesToRefIds(editContext.characterMap);
  return scrapContent;
};

function buildScriptContentContext(refId: string, scrapPile: ScrapPile): EditContext {
  // Fetch the content block that was pointing to this script scrap
  const contentBlockRefId = scrapPile.fetchContentBlockByContentRefId(refId);

  const characterMap = scrapPile.buildCharacterMap();

  const context = new EditContext(
    EditType.SCRIPT,
    'New Script Entry',
    null,
    [],
    'Feel free to write whatever scene you feel like! You can link it into a story structure later'
  );
  context.characterMap = characterMap;
  context.prepareContentForEditing = CONVERT_CHARACTER_REFID_TO_NAME;
  context.prepareContentForPersistence = CONVERT_CHARACTER_NAME_TO_REFID;

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
