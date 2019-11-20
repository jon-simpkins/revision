import EditContext, {EditType} from '../EditContext';
import {ScrapPile} from '../ScrapPile';
import ViewOption, {buildStorySummaryViewOption, ViewOptionGenerators} from '../ViewOption';
import {ScrapContent} from '../ScrapTypes/ScrapContent';


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
      new ViewOption(ViewOptionGenerators.STRUCTURE_BLOCK_VIEW, 'Block Details', null, contentBlockRefId)
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

  ctx.prepareContentForEditing = (scrapContent: ScrapContent, editContext: EditContext) => {
    scrapContent.storyStructure.rescaleToDuraction(editContext.constraints.durationSec);
    return scrapContent;
  };

  return ctx;
}

export {buildStructureContext};
