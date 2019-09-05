import Scrap from '../types/Scrap';
import ViewContentBlock, {buildHeader, buildListEntry, buildParagraph} from '../app/story-details/view-panel-content/ViewContentBlock';
import ViewOption, {ViewOptionGenerators} from '../types/ViewOption';

function prettyPrintDuration(completedEpoch, startEpoch) {
  return `${Math.floor((completedEpoch - startEpoch)/1000)} sec`
}

function generateChangelog(scraps: Map <string, Scrap>): ViewContentBlock[] {
  let blocks = [];

  blocks.push(buildHeader('Change Log'));
  blocks.push(buildParagraph('Here is the history of changes to this story:'));

  let orderedScrapSummaries = [];
  scraps.forEach((scrap) => {
    orderedScrapSummaries.push({
      created: scrap.completedEpoch,
      content: `${new Date(scrap.completedEpoch).toLocaleString()} ${scrap.editedBy} (${prettyPrintDuration(scrap.completedEpoch, scrap.startedEpoch)})`,
      viewOption: new ViewOption(ViewOptionGenerators.SCRAP_DETAILS, null, scrap.id)
    });
  });

  orderedScrapSummaries.sort((a,b) => {
    return b.created - a.created;
  }).forEach(summary => {
    blocks.push(buildListEntry(summary.content, summary.viewOption));
  });

  return blocks;
}

export default generateChangelog;
