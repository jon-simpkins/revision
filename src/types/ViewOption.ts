import Scrap from './Scrap';
import {canCreateStorySummary} from '../viewContentGenerators/generateStorySummaryPage';
import {ViewOptionGenerators} from '../viewContentGenerators/viewContentGenerators';
import {canCreateSTCStorySummary} from '../viewContentGenerators/generateSTCSummaryPage';

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

  static generateViewOptions(scraps: Map<string, Scrap>): ViewOption[] {
    const options = [];
    if (scraps.size) {
      options.push(new ViewOption(ViewOptionGenerators.CHANGELOG, 'Changelog', null));
    }
    if (canCreateStorySummary(scraps)) {
      options.push(buildStorySummaryViewOption());
    }
    if (canCreateSTCStorySummary(scraps)) {
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
