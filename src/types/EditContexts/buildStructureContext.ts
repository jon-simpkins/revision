import EditContext, {EditType} from '../EditContext';
import {ScrapPile} from '../ScrapPile';
import ViewOption, {buildStorySummaryViewOption, ViewOptionGenerators} from '../ViewOption';


function buildStructureContext(refId: string, scrapPile: ScrapPile): EditContext {

  let parentStoryViewOptions: ViewOption[] = [
    buildStorySummaryViewOption()
  ];

  let headerPrompt = 'Structure Spec';

  const contentBlockRefId = scrapPile.fetchContentBlockByContentRefId(refId);
  if (contentBlockRefId) {
    const parentStructureRefId = scrapPile.fetchStructureBlockParentRefId(contentBlockRefId);
    const parentStructureScrap = scrapPile.fetchProperlyRescaledStructureScrap(parentStructureRefId);

    const parentStructureBlocks = parentStructureScrap.content.storyStructure.blocks;
    parentStructureBlocks.forEach((block) => {
      if (block.refId === contentBlockRefId) {
        headerPrompt = `Structure Spec: "${block.label}"`;
      }
    });

    parentStoryViewOptions = [
      new ViewOption(ViewOptionGenerators.STORY_STRUCTURE, 'Story Structure', null, parentStructureRefId)
    ];
  }

  const ctx = new EditContext(
    EditType.STRUCTURE_SELECTION,
    headerPrompt,
    null,
    parentStoryViewOptions
  );

  ctx.userGuidance = 'Select the structure, name the major story beats';

  ctx.constraints.durationSec = scrapPile.fetchConstraintDurationSec(refId);

  return ctx;
}

export {buildStructureContext};
