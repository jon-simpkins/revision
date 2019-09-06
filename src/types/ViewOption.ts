import generateChangelog from '../viewContentGenerators/generateChangelog';
import generateViewScrapDetails from '../viewContentGenerators/generateViewScrapDetails';
import ViewContentBlock from '../app/story-details/view-panel-content/ViewContentBlock';
import Scrap from './Scrap';
import generateStorySummaryPage, {canCreateStorySummary} from '../viewContentGenerators/generateStorySummaryPage';

enum ViewOptionGenerators {
  CHANGELOG,
  SCRAP_DETAILS,
  STORY_SUMMARY,
}

export interface ViewContentGeneratorFunction {
  (scraps: Map<string, Scrap>, scrapId: string): ViewContentBlock[];
}

export function generateAppropriateGenerator(viewOption: ViewOption): ViewContentGeneratorFunction {
  switch (viewOption.generatorSpec) {
    case ViewOptionGenerators.CHANGELOG:
      return generateChangelog;
    case ViewOptionGenerators.SCRAP_DETAILS:
      return generateViewScrapDetails;
    case ViewOptionGenerators.STORY_SUMMARY:
      return generateStorySummaryPage;
  }
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

  static generateViewOptions(scraps: Map<string, Scrap>): ViewOption[]{
    let options = [];
    if (scraps.size) {
      options.push(new ViewOption(ViewOptionGenerators.CHANGELOG, 'Changelog', null));
    }
    if (canCreateStorySummary(scraps)) {
      options.push(new ViewOption(ViewOptionGenerators.STORY_SUMMARY, 'Story Summary', null));
    }

    return options;
  }
}

export {ViewOptionGenerators};

export default ViewOption;
