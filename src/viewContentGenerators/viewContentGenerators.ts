import ViewContentBlock from '../app/story-details/view-panel-content/ViewContentBlock';
import generateChangelog from './generateChangelog';
import generateViewScrapDetails from './generateViewScrapDetails';
import generateStorySummaryPage from './generateStorySummaryPage';
import {generateSTCSummaryPage} from './generateSTCSummaryPage';
import ViewOption from '../types/ViewOption';
import {ScrapPile} from '../types/ScrapPile';
import generateCharacterListing from './generateCharacterListing';
import generateCharacterDetails from './generateCharacterDetails';

enum ViewOptionGenerators {
  CHANGELOG,
  SCRAP_DETAILS,
  STORY_SUMMARY,
  STC_SUMMARY,
  CHARACTER_LISTING,
  CHARACTER_DETAILS,
}

export type ViewContentGeneratorFunction = (scrapPile: ScrapPile, scrapId: string, refId: string) => ViewContentBlock[];

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
    case ViewOptionGenerators.CHARACTER_LISTING:
      return generateCharacterListing;
    case ViewOptionGenerators.CHARACTER_DETAILS:
      return generateCharacterDetails;
  }
}
