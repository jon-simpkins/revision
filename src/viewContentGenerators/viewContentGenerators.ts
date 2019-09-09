import ViewContentBlock from '../app/story-details/view-panel-content/ViewContentBlock';
import generateChangelog from './generateChangelog';
import generateViewScrapDetails from './generateViewScrapDetails';
import generateStorySummaryPage from './generateStorySummaryPage';
import {generateSTCSummaryPage} from './generateSTCSummaryPage';
import ViewOption from '../types/ViewOption';
import {ScrapPile} from '../types/ScrapPile';

enum ViewOptionGenerators {
  CHANGELOG,
  SCRAP_DETAILS,
  STORY_SUMMARY,
  STC_SUMMARY,
}

export type ViewContentGeneratorFunction = (scrapPile: ScrapPile, scrapId: string) => ViewContentBlock[];

export {ViewOptionGenerators};

export function generateAppropriateGenerator(viewOption: ViewOption): ViewContentGeneratorFunction {
  switch (viewOption.generatorSpec) {
    case ViewOptionGenerators.CHANGELOG:
      return generateChangelog;
    case ViewOptionGenerators.SCRAP_DETAILS:
      return generateViewScrapDetails;
    case ViewOptionGenerators.STORY_SUMMARY:
      return generateStorySummaryPage;
    case ViewOptionGenerators.STC_SUMMARY:
      return generateSTCSummaryPage;
  }
}
