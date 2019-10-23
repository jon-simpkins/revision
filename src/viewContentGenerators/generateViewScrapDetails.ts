import Scrap from '../types/Scrap';
import ViewContentBlock, {
  buildHeader,
  buildListEntry,
  buildNexPrevNav,
  buildParagraph, buildSubheader
} from '../app/story-details/view-panel-content/ViewContentBlock';
import ViewOption, {ViewOptionGenerators} from '../types/ViewOption';
import EditOption from '../types/EditOption';
import EditContext from '../types/EditContext';
import {ScrapPile} from '../types/ScrapPile';

function fetchNexPrevIterations(relevantScrap: Scrap, scrapPile: ScrapPile) {
  let previousScrap: Scrap = null;
  let nextScrap: Scrap = null;
  scrapPile.scrapById.forEach((scrap) => {
    if (scrap.prototype !== relevantScrap.prototype) {
      return; // Move on
    }

    if (scrap.id === relevantScrap.id) {
      return; // Move on
    }

    if (scrap.refId && scrap.refId !== relevantScrap.refId) {
      return; // Move on, refId must match if present
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

  return [previousScrap, nextScrap];
}

// Convenience function to build the relevant list of views for this scrap (identical to what would show in the bottom of the edit panel)
function fetchRelevantViews(scrap: Scrap, scrapPile: ScrapPile): ViewOption[] {
  return EditContext.fromPrototype(scrap.prototype, scrapPile, scrap.refId).viewOptions;
}

function generateViewScrapDetails(scrapPile: ScrapPile, scrapId: string): ViewContentBlock[] {
  const blocks = [];

  const relevantScrap = scrapPile.scrapById.get(scrapId);
  const prevNextScraps = fetchNexPrevIterations(relevantScrap, scrapPile);

  let editOption: EditOption = null;
  if (!prevNextScraps[1]) {
    // If there is no next iteration of the scrap, then include the edit button
    editOption = EditOption.buildFromScrap(relevantScrap);
  }
  blocks.push(buildSubheader('Scrap Details', null, editOption));

  blocks.push(buildListEntry(`Created by ${relevantScrap.editedBy} on ${new Date(relevantScrap.completedEpoch).toLocaleString()}`));

  blocks.push(buildNexPrevNav(
    'Iteration',
    prevNextScraps[1] ? new ViewOption(ViewOptionGenerators.SCRAP_DETAILS, null, prevNextScraps[1].id) : null,
    prevNextScraps[0] ? new ViewOption(ViewOptionGenerators.SCRAP_DETAILS, null, prevNextScraps[0].id) : null
  ));

  blocks.push(buildParagraph('Raw JSON content (for debugging):'));
  blocks.push(buildParagraph(relevantScrap.content.toString()));
  blocks.push(buildParagraph('scrapId: ' + relevantScrap.id));
  blocks.push(buildParagraph('refId: ' + relevantScrap.refId));

  const relevantViews = fetchRelevantViews(relevantScrap, scrapPile);
  if (relevantViews && relevantViews.length) {
    blocks.push(buildHeader('Related Content'));
    relevantViews.forEach(view => {
      blocks.push(buildListEntry(view.label, view));
    });
  }

  return blocks;
}

export default generateViewScrapDetails;
