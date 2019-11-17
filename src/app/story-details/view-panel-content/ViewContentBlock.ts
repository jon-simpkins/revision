import ViewOption from '../../../types/ViewOption';
import EditOption from '../../../types/EditOption';
import Scrap from '../../../types/Scrap';
import ScrapPrototype from '../../../types/ScrapPrototype';
import {ScrapPile} from '../../../types/ScrapPile';
import {Script} from '../../../types/Script/Script';
import TimelineBlock from '../../../types/TimelineBlock';

enum ViewContentBlockType {
  HEADER,
  SUB_HEADER,
  LINK_SUBHEADER, // Used for referencing where content came from
  PARAGRAPH,
  LIST_ENTRY,
  NEXT_PREV_NAV,
  HORIZONTAL_DIVIDER,
  SCRIPT_SECTION,
  TIMELINE,
}

// Class to represent a single block of renderable content for viewing
class ViewContentBlock {
  type: ViewContentBlockType;
  text: string;
  editOption: EditOption; // Optional, allows initiation of arbitrary edits
  viewOption: ViewOption; // Optional, allows linkages to other views
  prevOption: ViewOption; // Also optional, used only for next / prev nav
  timelineBlocks: TimelineBlock[];

  constructor(type: ViewContentBlockType, text?: string, viewOption?: ViewOption, editOption?: EditOption) {
    this.type = type;
    this.text = text;
    this.viewOption = viewOption;
    this.editOption = editOption;
  }
}

function buildTimeline(timelineBlocks: TimelineBlock[]): ViewContentBlock {
  const newBlock = new ViewContentBlock(ViewContentBlockType.TIMELINE);
  newBlock.timelineBlocks = timelineBlocks;
  return newBlock;
}

function buildHeader(text): ViewContentBlock {
  return new ViewContentBlock(ViewContentBlockType.HEADER, text);
}

function buildSubheader(text: string, scrap?: Scrap, fallbackEditOption?: EditOption): ViewContentBlock {
  let editOption;
  if (!!scrap) {
    // Create the corresponding edit from the scrap
    editOption = new EditOption();
    editOption.prototype = scrap.prototype;
    editOption.scrapId = scrap.id;
    editOption.refId = scrap.refId;
  } else if (!!fallbackEditOption) {
    editOption = fallbackEditOption;
  }

  if (!editOption) {
    return new ViewContentBlock(ViewContentBlockType.SUB_HEADER, text);
  }

  return new ViewContentBlock(
    ViewContentBlockType.LINK_SUBHEADER,
    text,
    scrap ? ViewOption.detailsForScrap(scrap) : null,
    editOption
  );
}

function buildParagraph(text: string, viewOption?: ViewOption, editOption?: EditOption): ViewContentBlock {
  return new ViewContentBlock(ViewContentBlockType.PARAGRAPH, text, viewOption, editOption);
}

function buildParagraphsFromTextArea(text: string, viewContent: ViewContentBlock[]): ViewContentBlock[] {
  text.split('\n').forEach(line => {
    viewContent.push(buildParagraph(line));
  });

  return viewContent;
}

function buildListEntry(text: string, viewOption?: ViewOption): ViewContentBlock {
  return new ViewContentBlock(ViewContentBlockType.LIST_ENTRY, text, viewOption);
}

function buildNexPrevNav(label: string, nextOption ?: ViewOption, prevOption ?: ViewOption): ViewContentBlock {
  const block = new ViewContentBlock(ViewContentBlockType.NEXT_PREV_NAV, label, nextOption);
  block.prevOption = prevOption;
  return block;
}

// Convenience function for creating a sub-section of a view page which shows some scrap content,
// and appropriately links out to view / edit buttons
function buildScrapDetailsSection(
  scrapPile: ScrapPile,
  prototype: ScrapPrototype,
  refId: string,
  viewContent: ViewContentBlock[],
  headerText: string,
  ifFoundCallback: (scrap: Scrap) => ViewContentBlock[]
): ViewContentBlock[] {
  let outputBlocks = [];

  const foundScrap = scrapPile.getByRefId(refId, prototype);
  const fallbackEditOption = new EditOption();
  fallbackEditOption.refId = refId;
  fallbackEditOption.prototype = prototype;

  outputBlocks.push(buildSubheader(headerText + ':', foundScrap, fallbackEditOption));

  if (foundScrap) {
    outputBlocks = outputBlocks.concat(ifFoundCallback(foundScrap));
  }

  return outputBlocks;
}

function buildScriptSection(rawText: string, scrapPile: ScrapPile): ViewContentBlock {
  const formattedScript = Script.convertTraitRefIdsToNames(
    Script.convertCharacterRefIdsToNames(rawText, scrapPile.buildCharacterMap()),
    scrapPile.buildTraitMap()
  );

  return new ViewContentBlock(ViewContentBlockType.SCRIPT_SECTION,
    formattedScript
  );
}

export {ViewContentBlockType, buildTimeline, buildHeader, buildParagraph, buildParagraphsFromTextArea, buildScrapDetailsSection, buildListEntry, buildNexPrevNav, buildSubheader, buildScriptSection};

export default ViewContentBlock;
