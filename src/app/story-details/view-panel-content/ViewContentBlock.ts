
enum ViewContentBlockType {
  HEADER,
  PARAGRAPH,
  LIST_ENTRY
}

// Class to represent a single block of renderable content for viewing
class ViewContentBlock {
  type: ViewContentBlockType;
  text: string;

  constructor(type: ViewContentBlockType, text: string) {
    this.type = type;
    this.text = text;
  }
}

export {ViewContentBlockType};

export default ViewContentBlock;
