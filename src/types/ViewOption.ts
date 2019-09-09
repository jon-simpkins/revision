import Scrap, {ScrapPrototype} from './Scrap';
import {ViewOptionGenerators} from '../viewContentGenerators/viewContentGenerators';
import {ScrapPile} from './ScrapPile';

function buildStorySummaryViewOption() {
  return new ViewOption(ViewOptionGenerators.STORY_SUMMARY, 'Story Summary', null);
}

function buildSTCSummaryViewOption() {
  return new ViewOption(ViewOptionGenerators.STC_SUMMARY, 'STC Summary', null);
}

class ViewOption {
  generatorSpec: ViewOptionGenerators;
  label: string;
  scrapId: string;

  constructor(generatorSpec: ViewOptionGenerators, label: string, scrapId: string) {
    this.generatorSpec = generatorSpec;
    this.label = label;
    this.scrapId = scrapId;
  }

  static generateViewOptions(scrapPile: ScrapPile): ViewOption[] {
    const options = [];
    if (scrapPile.hasAnyScraps()) {
      options.push(new ViewOption(ViewOptionGenerators.CHANGELOG, 'Changelog', null));
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

    return options;
  }

  static detailsForScrap(scrap: Scrap) {
    return new ViewOption(ViewOptionGenerators.SCRAP_DETAILS, null, scrap.id);
  }
}

export {ViewOptionGenerators, buildStorySummaryViewOption, buildSTCSummaryViewOption};

export default ViewOption;
