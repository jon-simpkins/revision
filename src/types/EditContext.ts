import {ScrapPrototype} from './Scrap';

enum EditType {
  TEXT_LINE,
  TEXT_AREA,
  THREE_LINES
}

class EditContext {
  editType: EditType; // What type of input to display to accept edits
  headerPrompt: string; // What header to display to guide edits

  constructor(editType: EditType, headerPrompt: string) {
    this.editType = editType;
    this.headerPrompt = headerPrompt;
  }

  static fromPrototype(prototype: ScrapPrototype) : EditContext {
    switch (prototype) {
      case ScrapPrototype.MOVIE_TITLE:
        return new EditContext(EditType.TEXT_LINE, 'Movie Title');
      case ScrapPrototype.SIMILAR_MOVIES:
        return new EditContext(EditType.THREE_LINES, 'Similar Movies');
      case ScrapPrototype.LOG_LINE:
        return new EditContext(EditType.TEXT_AREA, 'Log Line');
    }
  }
}

export {EditType};

export default EditContext;
