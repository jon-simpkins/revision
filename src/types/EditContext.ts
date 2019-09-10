import {ScrapPrototype} from './Scrap';
import {MultiOption, STC_GENRES} from './getSTCGenres';
import ViewOption, {buildCharacterDetailsViewOption, buildSTCSummaryViewOption, buildStorySummaryViewOption} from './ViewOption';
import {ScrapPile} from './ScrapPile';

enum EditType {
  TEXT_LINE,
  TEXT_AREA,
  N_LINES,
  MULTI_CHOICE
}

class EditContext {
  editType: EditType; // What type of input to display to accept edits
  headerPrompt: string; // What header to display to guide edits
  userGuidance: string; // Any extra stuff to guide the user
  multiOptions: MultiOption[]; // For selection entries, define the set of options
  viewOptions: ViewOption[]; // Optional, list of view options for the bottom of the edit

  constructor(editType: EditType, headerPrompt: string, multiOptions?: MultiOption[], viewOptions?: ViewOption[]) {
    this.editType = editType;
    this.headerPrompt = headerPrompt;
    this.multiOptions = multiOptions;
    this.viewOptions = viewOptions;
  }

  static fromPrototype(prototype: ScrapPrototype, scrapPile: ScrapPile, refId: string): EditContext {
    let ctx: EditContext;

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
      case ScrapPrototype.CHARACTER_LISTING:
        ctx = new EditContext(
          EditType.N_LINES,
          'List all Characters',
          null,
          null
        );
        ctx.userGuidance = 'Give a quick summary of who\'s in the story. "The main spy" or "Marine biologist, love interest" is all the granularity you need for now. You\'ll get to come back and revise later';
        return ctx;
      case ScrapPrototype.CHARACTER_NAME:
        ctx = new EditContext(
          EditType.TEXT_LINE,
          'Character Name',
          null,
          [buildCharacterDetailsViewOption(refId)]
        );

        let characterDescription = '';
        scrapPile.newestScrapBySingularPrototype.get(ScrapPrototype.CHARACTER_LISTING).content.lines.forEach(line => {
          if (line.refId === refId) {
            characterDescription = line.text;
          }
        });

        ctx.userGuidance = 'For this character, what\'s their name in the script? "' + characterDescription + '"';
        return ctx;
    }
  }
}

export {EditType, MultiOption};

export default EditContext;
