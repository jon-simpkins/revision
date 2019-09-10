import Scrap, {ScrapPrototype} from './Scrap';
import {ViewOptionGenerators} from '../viewContentGenerators/viewContentGenerators';
import {ScrapPile} from './ScrapPile';

function buildStorySummaryViewOption() {
  return new ViewOption(ViewOptionGenerators.STORY_SUMMARY, 'Story Summary');
}

function buildSTCSummaryViewOption() {
  return new ViewOption(ViewOptionGenerators.STC_SUMMARY, 'STC Summary');
}

class ViewOption {
  generatorSpec: ViewOptionGenerators;
  label: string;
  scrapId: string;
  refId: string;

  constructor(generatorSpec: ViewOptionGenerators, label: string, scrapId?: string, refId?: string) {
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
      ScrapPrototype.LOG_LINE,
      ScrapPrototype.TIME_FRAME,
      ScrapPrototype.MOVIE_TITLE
    ])) {
      options.push(buildStorySummaryViewOption());
    }
    if (scrapPile.hasOneOfSingularPrototypes([
      ScrapPrototype.STC_GENRE,
      ScrapPrototype.STC_GENRE_EXPLANATION
    ])) {
      options.push(buildSTCSummaryViewOption());
    }
    if (scrapPile.hasOneOfSingularPrototypes([ScrapPrototype.CHARACTER_LISTING])) {
      options.push(
        new ViewOption(
          ViewOptionGenerators.CHARACTER_LISTING,
          'Character Listing'
        )
      );
    }

    return options;
  }

  static detailsForScrap(scrap: Scrap) {
    return new ViewOption(ViewOptionGenerators.SCRAP_DETAILS, null, scrap.id);
  }
}

export {ViewOptionGenerators, buildStorySummaryViewOption, buildSTCSummaryViewOption};

export default ViewOption;
