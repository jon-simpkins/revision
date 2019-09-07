import Scrap from '../types/Scrap';
import ViewContentBlock, {
  buildHeader,
  buildListEntry,
  buildNexPrevNav,
  buildParagraph
} from '../app/story-details/view-panel-content/ViewContentBlock';
import {SINGULAR_PROTOTYPES} from '../types/SingularPrototypes';
import ViewOption, {ViewOptionGenerators} from '../types/ViewOption';
import EditOption from '../types/EditOption';
import EditContext from '../types/EditContext';

function fetchNexPrevIterations(relevantScrap: Scrap, scraps: Map <string, Scrap>) {
  let previousScrap: Scrap = null;
  let nextScrap: Scrap = null;
  if (SINGULAR_PROTOTYPES.has(relevantScrap.prototype)) {
    // Iterate through all scraps, finding the one right before and right after with the same prototype
    scraps.forEach((scrap) => {
      if (scrap.prototype !== relevantScrap.prototype) {
        return; // Move on
      }

      if (scrap.id === relevantScrap.id) {
        return; // Move on
      }

      if (scrap.completedEpoch < relevantScrap.completedEpoch) {
        if (!previousScrap || previousScrap.completedEpoch < scrap.completedEpoch) {
          previousScrap = scrap;
        }
      }
      if (scrap.completedEpoch > relevantScrap.completedEpoch) {
        if (!nextScrap || nextScrap.completedEpoch > scrap.completedEpoch) {
          nextScrap = scrap;
        }
      }

    });
  }

  return [previousScrap, nextScrap];
}

// Convenience function to build the relevant list of views for this scrap (identical to what would show in the bottom of the edit panel)
function fetchRelevantViews(scrap: Scrap): ViewOption[] {
  return EditContext.fromPrototype(scrap.prototype).viewOptions;
}

function generateViewScrapDetails(scraps: Map <string, Scrap>, scrapId: string): ViewContentBlock[] {
  let blocks = [];

  let relevantScrap = scraps.get(scrapId);
  let prevNextScraps = fetchNexPrevIterations(relevantScrap, scraps);

  let editOption : EditOption = null;
  if (!prevNextScraps[1]) {
    // If there is no next iteration of the scrap, then include the edit button
    editOption = EditOption.buildFromScrap(relevantScrap);
  }
  blocks.push(buildHeader('Scrap Details', null, editOption));

  blocks.push(buildListEntry(`Created by ${relevantScrap.editedBy} on ${new Date(relevantScrap.completedEpoch).toLocaleString()}`));

  blocks.push(buildNexPrevNav(
    'Iteration',
    prevNextScraps[1] ? new ViewOption(ViewOptionGenerators.SCRAP_DETAILS, null, prevNextScraps[1].id) : null,
    prevNextScraps[0] ? new ViewOption(ViewOptionGenerators.SCRAP_DETAILS, null, prevNextScraps[0].id) : null
  ));

  blocks.push(buildParagraph('Raw JSON content (for debugging):'));
  blocks.push(buildParagraph(relevantScrap.content.toString()));

  const relevantViews = fetchRelevantViews(relevantScrap);
  if (relevantViews && relevantViews.length) {
    blocks.push(buildHeader('Related Content'));
    relevantViews.forEach(view => {
      blocks.push(buildListEntry(view.label, view));
    });
  }

  return blocks;
}

export default generateViewScrapDetails;
