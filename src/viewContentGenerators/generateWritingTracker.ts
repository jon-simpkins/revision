import {ScrapPile} from '../types/ScrapPile';
import ViewContentBlock, {buildHeader, buildParagraph} from '../app/story-details/view-panel-content/ViewContentBlock';
import {StructureBlock} from '../types/StoryStructure/StoryStructure';

function generateWritingTracker(scrapPile: ScrapPile): ViewContentBlock[] {
  const blocks = [];

  blocks.push(buildHeader('Writing Tracker'));

  let numScraps = 0;
  let totalMs = 0;
  scrapPile.scrapById.forEach((scrap) => {
    numScraps += 1;
    totalMs += (scrap.completedEpoch - scrap.startedEpoch);
  });

  blocks.push(buildParagraph(`${numScraps} total scraps written`));
  blocks.push(buildParagraph(`${StructureBlock.convertDurationToStr(totalMs/1000)} spent writing`));

  return blocks;
}

export default generateWritingTracker;
