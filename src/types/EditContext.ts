import {ScrapPrototype} from './Scrap';
import {MultiOption, STC_GENRES} from './getSTCGenres';

enum EditType {
  TEXT_LINE,
  TEXT_AREA,
  THREE_LINES,
  MULTI_CHOICE
}

class EditContext {
  editType: EditType; // What type of input to display to accept edits
  headerPrompt: string; // What header to display to guide edits
  multiOptions: MultiOption[]; //

  constructor(editType: EditType, headerPrompt: string, multiOptions?: MultiOption[]) {
    this.editType = editType;
    this.headerPrompt = headerPrompt;
    this.multiOptions = multiOptions;
  }

  static fromPrototype(prototype: ScrapPrototype): EditContext {
    switch (prototype) {
      case ScrapPrototype.MOVIE_TITLE:
        return new EditContext(EditType.TEXT_LINE, 'Movie Title');
      case ScrapPrototype.SIMILAR_MOVIES:
        return new EditContext(EditType.THREE_LINES, 'Similar Movies');
      case ScrapPrototype.LOG_LINE:
        return new EditContext(EditType.TEXT_AREA, 'Log Line');
      case ScrapPrototype.TIME_FRAME:
        return new EditContext(EditType.TEXT_LINE, 'Time Frame');
      case ScrapPrototype.STC_GENRE:
        return new EditContext(EditType.MULTI_CHOICE, 'Save The Cat Genre', STC_GENRES);
      case ScrapPrototype.STC_GENRE_EXPLANATION:
        return new EditContext(EditType.TEXT_AREA, 'Save The Cat Genre Explanation');
    }
  }
}

export {EditType, MultiOption};

export default EditContext;
