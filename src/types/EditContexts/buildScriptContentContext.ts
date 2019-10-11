import {ScrapPile} from '../ScrapPile';
import EditContext, {EditType} from '../EditContext';
import ViewOption, {ViewOptionGenerators} from '../ViewOption';
import {ScrapPrototype} from '../Scrap';

function buildCharacterMap(scrapPile: ScrapPile): Map<string, string> {
  const characterMap = new Map<string, string>();
  const characterListingScrap = scrapPile.newestScrapBySingularPrototype.get(ScrapPrototype.CHARACTER_LISTING);

  const characterRefIds = [];
  characterListingScrap.content.lines.forEach(line => {
    if (line.active) {
      characterRefIds.push(line.refId);
    }
  });
  characterRefIds.forEach(characterRefId => {
    const nameScrap = scrapPile.getByRefId(characterRefId, ScrapPrototype.CHARACTER_NAME);

    if (nameScrap) {
      const name = nameScrap.content.text;
      characterMap.set(name.toUpperCase(), characterRefId);
    }
  });

  return characterMap;
}

function buildScriptContentContext(refId: string, scrapPile: ScrapPile): EditContext {
  // Fetch the content block that was pointing to this script scrap
  const contentBlockRefId = scrapPile.fetchContentBlockByContentRefId(refId);

  const characterMap = buildCharacterMap(scrapPile);

  if (!contentBlockRefId) {
    // Assume new one-off scene
    const context = new EditContext(
      EditType.SCRIPT,
      'New Script Entry',
      null,
      [],
      'Feel free to write whatever scene you feel like! You can link it into a story structure later'
    );

    context.characterMap = characterMap;
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

  const userGuidance = `Expected duration: ${parentStructureBlockDurationStr}`;

  const retVal = new EditContext(
    EditType.SCRIPT,
    `Script entry for Story Beat: "${parentStructureBlockLabel}"`,
    null,
    [
      new ViewOption(ViewOptionGenerators.STORY_STRUCTURE, 'Story Structure', null, parentStructureRefId)
    ],
    userGuidance
  );
  retVal.characterMap = characterMap;

  return retVal;
}

export {buildScriptContentContext};
