import ViewContentBlock, {buildHeader, buildListEntry, buildParagraph} from '../app/story-details/view-panel-content/ViewContentBlock';
import ViewOption, {ViewOptionGenerators} from '../types/ViewOption';
import {ScrapPile} from '../types/ScrapPile';

function prettyPrintDuration(completedEpoch, startEpoch) {
  return `${Math.floor((completedEpoch - startEpoch) / 1000)} sec`;
}

function generateChangelog(scrapPile: ScrapPile): ViewContentBlock[] {
  const blocks = [];

  blocks.push(buildHeader('Change Log'));
  blocks.push(buildParagraph('Here is the history of changes to this story:'));

  const orderedScrapSummaries = [];
  scrapPile.scrapById.forEach((scrap) => {
    orderedScrapSummaries.push({
      created: scrap.completedEpoch,
      content: `${new Date(scrap.completedEpoch).toLocaleString()} ${scrap.editedBy} (${prettyPrintDuration(scrap.completedEpoch, scrap.startedEpoch)})`,
      viewOption: new ViewOption(ViewOptionGenerators.SCRAP_DETAILS, null, scrap.id)
    });
  });

  orderedScrapSummaries.sort((a, b) => {
    return b.created - a.created;
  }).forEach(summary => {
    blocks.push(buildListEntry(summary.content, summary.viewOption));
  });

  return blocks;
}

export default generateChangelog;
