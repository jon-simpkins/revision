import Scrap from '../types/Scrap';
import ViewContentBlock, {
  buildHeader,
  buildListEntry,
  buildNexPrevNav,
  buildParagraph
} from '../app/story-details/view-panel-content/ViewContentBlock';
import {SINGULAR_PROTOTYPES} from '../types/SingularPrototypes';
import ViewOption, {ViewOptionGenerators} from '../types/ViewOption';

function generateViewScrapDetails(scraps: Map <string, Scrap>, scrapId: string): ViewContentBlock[] {
  let blocks = [];

  blocks.push(buildHeader('Scrap Details'));

  let relevantScrap = scraps.get(scrapId);

  blocks.push(buildListEntry(`Created by ${relevantScrap.editedBy} on ${new Date(relevantScrap.completedEpoch).toLocaleString()}`));

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

  blocks.push(buildNexPrevNav(
    'Iteration',
    nextScrap ? new ViewOption(ViewOptionGenerators.SCRAP_DETAILS, null, nextScrap.id) : null,
    previousScrap ? new ViewOption(ViewOptionGenerators.SCRAP_DETAILS, null, previousScrap.id) : null
  ));

  blocks.push(buildParagraph('Raw JSON content (for debugging):'));
  blocks.push(buildParagraph(relevantScrap.content.toString()));

  return blocks;
}

export default generateViewScrapDetails;
