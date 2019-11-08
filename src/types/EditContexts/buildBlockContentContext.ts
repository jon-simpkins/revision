import * as uuid from 'uuid/v4';

import {TARGET_CONTENT_TYPE} from '../ScrapTypes/ScrapContent';
import ScrapPrototype from '../ScrapPrototype';
import ViewOption, {ViewOptionGenerators} from '../ViewOption';
import EditContext, {EditType} from '../EditContext';
import {ScrapPile} from '../ScrapPile';
import BlockContentRefOption from './BlockContentRefOption';

function addNewOptions(
  options: BlockContentRefOption[],
  currentRefId: string,
  currentRefType: TARGET_CONTENT_TYPE,
  currentExists: boolean
): BlockContentRefOption[] {
  if (currentRefType === TARGET_CONTENT_TYPE.SCRIPT_SCRAP) {
    options.push(
      new BlockContentRefOption(
        TARGET_CONTENT_TYPE.SCRIPT_SCRAP,
        currentExists ? 'Current Script Scrap' : 'New Script Scrap',
        currentRefId,
        currentExists
      )
    );
  } else {
    options.push(
      new BlockContentRefOption(
        TARGET_CONTENT_TYPE.SCRIPT_SCRAP,
        'Add new Script Scrap',
        uuid(),
        false
      )
    );
  }

  if (currentRefType === TARGET_CONTENT_TYPE.SUB_STRUCTURE) {
    options.push(
      new BlockContentRefOption(
        TARGET_CONTENT_TYPE.SUB_STRUCTURE,
        currentExists ? 'Current Sub-Structure' : 'New Sub-Structure',
        currentRefId,
        currentExists
      )
    );
  } else {
    options.push(
      new BlockContentRefOption(
        TARGET_CONTENT_TYPE.SUB_STRUCTURE,
        'Add new Sub-Structure',
        uuid(),
        false
      )
    );
  }
  return options;
}

function appendFloatingContent(
  scrapPile: ScrapPile,
  options: BlockContentRefOption[]
): BlockContentRefOption[] {

  scrapPile.forEachNewestByRefId(ScrapPrototype.SCRIPT, (scrap) => {
    const referencingBlockId = scrapPile.fetchContentBlockByContentRefId(scrap.refId);
    if (!referencingBlockId) {
      // We found a script scrap that's free to reference!
      options.push(new BlockContentRefOption(
        TARGET_CONTENT_TYPE.SCRIPT_SCRAP,
        new Date(scrap.completedEpoch).toLocaleString(),
        scrap.refId,
        true
      ));
    }
  });

  return options;
}

function buildBlockContentContext(refId: string, scrapPile: ScrapPile) {
  const parentStructureRefId = scrapPile.fetchStructureBlockParentRefId(refId);
  const parentStructureScrap = scrapPile.fetchProperlyRescaledStructureScrap(parentStructureRefId);

  const parentStructureBlocks = parentStructureScrap.content.storyStructure.blocks;

  let parentStructureBlockLabel = 'NOT FOUND';
  let parentStructureBlockDurationStr = '';
  parentStructureBlocks.forEach((block, idx) => {
    if (block.refId === refId) {
      parentStructureBlockLabel = block.label;
      parentStructureBlockDurationStr = parentStructureScrap.content.storyStructure.getBlockDurationStr(idx);
    }
  });

  const userGuidance = `The block is ${parentStructureBlockDurationStr} long, do you want to write that all at once, or break it up into smaller chunks?`;

  const ctx = new EditContext(
    EditType.CONTENT_ASSIGNMENT,
    `Content for Story Beat: "${parentStructureBlockLabel}"`,
    null,
    [
      new ViewOption(ViewOptionGenerators.STORY_STRUCTURE, 'Story Structure', null, parentStructureRefId)
    ],
    userGuidance
  );

  ctx.contentRefOptions = [];

  // Try getting the current version of the block content
  const currentContentRefScrap = scrapPile.getByRefId(refId, ScrapPrototype.STRUCTURE_BLOCK_CONTENT);
  if (currentContentRefScrap) {
    // A type was created, but was the corresponding content created?
    let contentCreated = false;
    if (currentContentRefScrap.content.targetType === TARGET_CONTENT_TYPE.SCRIPT_SCRAP) {
      contentCreated = !!scrapPile.getByRefId(currentContentRefScrap.content.targetRefId, ScrapPrototype.SCRIPT);
    } else {
      console.log(scrapPile.getByRefId(currentContentRefScrap.content.targetRefId, ScrapPrototype.STRUCTURE_SPEC));
      contentCreated = !!scrapPile.getByRefId(currentContentRefScrap.content.targetRefId, ScrapPrototype.STRUCTURE_SPEC);
    }

    ctx.contentRefOptions = addNewOptions(
      ctx.contentRefOptions,
      currentContentRefScrap.content.targetRefId,
      currentContentRefScrap.content.targetType,
      contentCreated
    );
  } else {
    // Brand new, let's just add the 'new' options
    ctx.contentRefOptions = addNewOptions(ctx.contentRefOptions, null, null, false);
  }

  ctx.contentRefOptions = appendFloatingContent(scrapPile, ctx.contentRefOptions);

  return ctx;
}

export {buildBlockContentContext};
