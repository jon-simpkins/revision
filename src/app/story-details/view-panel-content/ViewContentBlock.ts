import ViewOption from '../../../types/ViewOption';
import EditOption from '../../../types/EditOption';

enum ViewContentBlockType {
  HEADER,
  PARAGRAPH,
  LIST_ENTRY,
  NEXT_PREV_NAV,
  HORIZONTAL_DIVIDER,
}

// Class to represent a single block of renderable content for viewing
class ViewContentBlock {
  type: ViewContentBlockType;
  text: string;
  editOption: EditOption; // Optional, allows initiation of arbitrary edits
  viewOption: ViewOption; // Optional, allows linkages to other views
  prevOption: ViewOption; // Also optional, used only for next / prev nav

  constructor(type: ViewContentBlockType, text?: string, viewOption?: ViewOption, editOption?: EditOption) {
    this.type = type;
    this.text = text;
    this.viewOption = viewOption;
    this.editOption = editOption;
  }
}

function buildHeader(text, viewOption?: ViewOption, editOption?: EditOption): ViewContentBlock {
  return new ViewContentBlock(ViewContentBlockType.HEADER, text, viewOption, editOption);
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
  let block = new ViewContentBlock(ViewContentBlockType.NEXT_PREV_NAV, label, nextOption);
  block.prevOption = prevOption;
  return block;
}

export {ViewContentBlockType, buildHeader, buildParagraph, buildParagraphsFromTextArea, buildListEntry, buildNexPrevNav};

export default ViewContentBlock;
