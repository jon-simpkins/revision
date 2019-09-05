import Scrap from '../types/Scrap';
import ViewContentBlock, {buildHeader, buildListEntry, buildParagraph} from '../app/story-details/view-panel-content/ViewContentBlock';


function generateViewScrapDetails(scraps: Map <string, Scrap>, scrapId: string): ViewContentBlock[] {
  let blocks = [];

  blocks.push(buildHeader('Scrap Details'));

  let relevantScrap = scraps.get(scrapId);

  blocks.push(buildListEntry(`Created by ${relevantScrap.editedBy} on ${new Date(relevantScrap.completedEpoch).toLocaleString()}`));

  blocks.push(buildParagraph('Raw JSON content (for debugging):'));
  blocks.push(buildParagraph(relevantScrap.content.toString()));

  return blocks;
}

export default generateViewScrapDetails;
