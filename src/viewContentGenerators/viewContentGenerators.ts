import ViewContentBlock from '../app/story-details/view-panel-content/ViewContentBlock';
import {ScrapPile} from '../types/ScrapPile';

enum ViewOptionGenerators {
  CHANGELOG,
  SCRAP_DETAILS,
  STORY_SUMMARY,
  CHARACTER_LISTING,
  CHARACTER_DETAILS,
  WRITING_TRACKER,
  STORY_STRUCTURE,
  DEBUG_LIST_ALL_SCRAPS,
  FLATTENED_SCRIPT,
  INDIVIDUAL_SCRIPT_SCRAP,
  TRAIT_LISTING,
  TRAIT_DETAILS
}

export type ViewContentGeneratorFunction = (scrapPile: ScrapPile, scrapId: string, refId: string) => ViewContentBlock[];

export {ViewOptionGenerators};
