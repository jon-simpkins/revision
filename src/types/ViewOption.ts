import generateChangelog from '../viewContentGenerators/generateChangelog';
import generateViewScrapDetails from '../viewContentGenerators/generateViewScrapDetails';
import ViewContentBlock from '../app/story-details/view-panel-content/ViewContentBlock';
import Scrap from './Scrap';

enum ViewOptionGenerators {
  CHANGELOG,
  SCRAP_DETAILS
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
    options.push(new ViewOption(ViewOptionGenerators.CHANGELOG, 'Changelog', null));

    return options;
  }
}

export {ViewOptionGenerators};

export default ViewOption;
