import ViewOption from '../../../types/ViewOption';

enum ViewContentBlockType {
  HEADER,
  PARAGRAPH,
  LIST_ENTRY,
}

// Class to represent a single block of renderable content for viewing
class ViewContentBlock {
  type: ViewContentBlockType;
  text: string;
  viewOption: ViewOption; // Optional, allows linkages to other views

  constructor(type: ViewContentBlockType, text: string, viewOption?: ViewOption) {
    this.type = type;
    this.text = text;
    this.viewOption = viewOption;
  }
}

function buildHeader(text) {
  return new ViewContentBlock(ViewContentBlockType.HEADER, text);
}

function buildParagraph(text) {
  return new ViewContentBlock(ViewContentBlockType.PARAGRAPH, text);
}

function buildListEntry(text: string, viewOption?: ViewOption) {
  return new ViewContentBlock(ViewContentBlockType.LIST_ENTRY, text, viewOption);
}

export {ViewContentBlockType, buildHeader, buildParagraph, buildListEntry};

export default ViewContentBlock;
