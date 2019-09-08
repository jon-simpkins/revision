import {ScrapPrototype} from './Scrap';
import {MultiOption, STC_GENRES} from './getSTCGenres';
import ViewOption, {buildStorySummaryViewOption, buildSTCSummaryViewOption} from './ViewOption';

enum EditType {
  TEXT_LINE,
  TEXT_AREA,
  N_LINES,
  MULTI_CHOICE
}

class EditContext {
  editType: EditType; // What type of input to display to accept edits
  headerPrompt: string; // What header to display to guide edits
  multiOptions: MultiOption[]; // For selection entries, define the set of options
  viewOptions: ViewOption[]; // Optional, list of view options for the bottom of the edit

  constructor(editType: EditType, headerPrompt: string, multiOptions?: MultiOption[], viewOptions?: ViewOption[]) {
    this.editType = editType;
    this.headerPrompt = headerPrompt;
    this.multiOptions = multiOptions;
    this.viewOptions = viewOptions;
  }

  static fromPrototype(prototype: ScrapPrototype): EditContext {
    switch (prototype) {
      case ScrapPrototype.MOVIE_TITLE:
        return new EditContext(
          EditType.TEXT_LINE,
          'Movie Title',
          null,
          [buildStorySummaryViewOption()]
        );
      case ScrapPrototype.SIMILAR_MOVIES:
        return new EditContext(
          EditType.N_LINES,
          'Similar Movies',
          null,
          [buildStorySummaryViewOption()]
        );
      case ScrapPrototype.LOG_LINE:
        return new EditContext(
          EditType.TEXT_AREA,
          'Log Line',
          null,
          [buildStorySummaryViewOption()]
        );
      case ScrapPrototype.TIME_FRAME:
        return new EditContext(
          EditType.TEXT_LINE,
          'Time Frame',
          null,
          [buildStorySummaryViewOption()]
        );
      case ScrapPrototype.STC_GENRE:
        return new EditContext(
          EditType.MULTI_CHOICE,
          'Save The Cat Genre',
          STC_GENRES,
          [buildSTCSummaryViewOption()]
        );
      case ScrapPrototype.STC_GENRE_EXPLANATION:
        return new EditContext(
          EditType.TEXT_AREA,
          'Save The Cat Genre Explanation',
          null,
          [buildSTCSummaryViewOption()]
        );
    }
  }
}

export {EditType, MultiOption};

export default EditContext;
