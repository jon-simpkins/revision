import Scrap, {ScrapPrototype} from './Scrap';
import {ViewOptionGenerators} from '../viewContentGenerators/viewContentGenerators';
import {ScrapPile} from './ScrapPile';

function buildStorySummaryViewOption() {
  return new ViewOption(ViewOptionGenerators.STORY_SUMMARY, 'Story Summary');
}

function buildCharacterDetailsViewOption(refId: string) {
  return new ViewOption(ViewOptionGenerators.CHARACTER_DETAILS, 'Character Details', null, refId);
}

class ViewOption {
  generatorSpec: ViewOptionGenerators;
  label: string;
  scrapId: string;
  refId: string;

  constructor(generatorSpec: ViewOptionGenerators, label?: string, scrapId?: string, refId?: string) {
    this.generatorSpec = generatorSpec;
    this.label = label;
    this.scrapId = scrapId;
    this.refId = refId;
  }

  // Used to generate the view options in the left nav
  static generateViewOptions(scrapPile: ScrapPile): ViewOption[] {
    const options = [];
    options.push(new ViewOption(ViewOptionGenerators.WRITING_TRACKER, 'Writing Tracker'));
    if (scrapPile.hasAnyScraps()) {
      options.push(new ViewOption(ViewOptionGenerators.CHANGELOG, 'Changelog'));
    }
    if (scrapPile.hasOneOfSingularPrototypes([
      ScrapPrototype.SIMILAR_MOVIES,
      ScrapPrototype.MOVIE_DURATION,
      ScrapPrototype.LOG_LINE,
      ScrapPrototype.QUESTIONS_TO_EXPLORE,
      ScrapPrototype.TIME_FRAME,
      ScrapPrototype.MOVIE_TITLE
    ])) {
      options.push(buildStorySummaryViewOption());
    }
    if (scrapPile.hasOneOfSingularPrototypes([ScrapPrototype.CHARACTER_LISTING])) {
      options.push(
        new ViewOption(
          ViewOptionGenerators.CHARACTER_LISTING,
          'Character Listing'
        )
      );
    }
    if (scrapPile.hasOneOfSingularPrototypes([ScrapPrototype.STRUCTURE_SPEC])) {
      options.push(
        new ViewOption(
          ViewOptionGenerators.STORY_STRUCTURE,
          'Story Structure'
        )
      );
      options.push(new ViewOption(ViewOptionGenerators.FLATTENED_SCRIPT, 'Flattened Script'));
    }

    options.push(new ViewOption(ViewOptionGenerators.DEBUG_LIST_ALL_SCRAPS, 'Debug: List all'));

    return options;
  }

  static detailsForScrap(scrap: Scrap) {
    return new ViewOption(ViewOptionGenerators.SCRAP_DETAILS, null, scrap.id);
  }
}

export {ViewOptionGenerators, buildStorySummaryViewOption, buildCharacterDetailsViewOption};

export default ViewOption;
