import ViewContentBlock from '../app/story-details/view-panel-content/ViewContentBlock';
import generateChangelog from './generateChangelog';
import generateViewScrapDetails from './generateViewScrapDetails';
import generateStorySummaryPage from './generateStorySummaryPage';
import ViewOption from '../types/ViewOption';
import {ScrapPile} from '../types/ScrapPile';
import generateCharacterListing from './generateCharacterListing';
import generateCharacterDetails from './generateCharacterDetails';
import generateWritingTracker from './generateWritingTracker';

enum ViewOptionGenerators {
  CHANGELOG,
  SCRAP_DETAILS,
  STORY_SUMMARY,
  CHARACTER_LISTING,
  CHARACTER_DETAILS,
  WRITING_TRACKER,
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
    case ViewOptionGenerators.CHARACTER_LISTING:
      return generateCharacterListing;
    case ViewOptionGenerators.CHARACTER_DETAILS:
      return generateCharacterDetails;
    case ViewOptionGenerators.WRITING_TRACKER:
      return generateWritingTracker;
  }
}
