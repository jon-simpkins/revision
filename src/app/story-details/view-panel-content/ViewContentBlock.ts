import ViewOption from '../../../types/ViewOption';

enum ViewContentBlockType {
  HEADER,
  PARAGRAPH,
  LIST_ENTRY,
  NEXT_PREV_NAV
}

// Class to represent a single block of renderable content for viewing
class ViewContentBlock {
  type: ViewContentBlockType;
  text: string;
  viewOption: ViewOption; // Optional, allows linkages to other views
  prevOption: ViewOption; // Also optional, used only for next / prev nav

  constructor(type: ViewContentBlockType, text: string, viewOption?: ViewOption) {
    this.type = type;
    this.text = text;
    this.viewOption = viewOption;
  }
}

function buildHeader(text) :ViewContentBlock {
  return new ViewContentBlock(ViewContentBlockType.HEADER, text);
}

function buildParagraph(text) :ViewContentBlock {
  return new ViewContentBlock(ViewContentBlockType.PARAGRAPH, text);
}

function buildListEntry(text: string, viewOption?: ViewOption) :ViewContentBlock {
  return new ViewContentBlock(ViewContentBlockType.LIST_ENTRY, text, viewOption);
}

function buildNexPrevNav(label: string, nextOption ?: ViewOption, prevOption ?: ViewOption) :ViewContentBlock {
  let block = new ViewContentBlock(ViewContentBlockType.NEXT_PREV_NAV, label, nextOption);
  block.prevOption = prevOption;
  return block;
}

export {ViewContentBlockType, buildHeader, buildParagraph, buildListEntry, buildNexPrevNav};

export default ViewContentBlock;
