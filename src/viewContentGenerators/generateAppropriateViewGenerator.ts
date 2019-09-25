import ViewContentBlock from '../app/story-details/view-panel-content/ViewContentBlock';
import generateChangelog from './generateChangelog';
import generateViewScrapDetails from './generateViewScrapDetails';
import generateStorySummaryPage from './generateStorySummaryPage';
import ViewOption, {ViewOptionGenerators} from '../types/ViewOption';
import generateCharacterListing from './generateCharacterListing';
import generateCharacterDetails from './generateCharacterDetails';
import generateWritingTracker from './generateWritingTracker';
import generateStructurePage from './generateStructurePage';
import generateListAllScraps from './generateListAllScraps';
import generateFlattenedScript from './generateFlattenedScript';
import generateIndividualScriptScrap from './generateIndividualScriptScrap';
import {ViewContentGeneratorFunction} from './viewContentGenerators';

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
    case ViewOptionGenerators.STORY_STRUCTURE:
      return generateStructurePage;
    case ViewOptionGenerators.DEBUG_LIST_ALL_SCRAPS:
      return generateListAllScraps;
    case ViewOptionGenerators.FLATTENED_SCRIPT:
      return generateFlattenedScript;
    case ViewOptionGenerators.INDIVIDUAL_SCRIPT_SCRAP:
      return generateIndividualScriptScrap;
  }
}
