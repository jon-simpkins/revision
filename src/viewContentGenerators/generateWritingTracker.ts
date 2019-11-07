import {ScrapPile} from '../types/ScrapPile';
import ViewContentBlock, {buildHeader, buildParagraph} from '../app/story-details/view-panel-content/ViewContentBlock';
import {StructureBlock} from '../types/StoryStructure/StoryStructure';

function generateWritingTracker(scrapPile: ScrapPile): ViewContentBlock[] {
  const blocks = [];

  blocks.push(buildHeader('Writing Tracker'));

  let numScraps = 0;
  let totalMs = 0;
  let totalMsToday = 0;
  scrapPile.scrapById.forEach((scrap) => {
    numScraps += 1;
    const writingDuration = (scrap.completedEpoch - scrap.startedEpoch);
    totalMs += writingDuration;
    if (new Date(scrap.startedEpoch).getDate() === new Date().getDate()) {
      totalMsToday += writingDuration;
    }
  });
  const timeSpentWriting = scrapPile.determineTimeSpentWriting();

  blocks.push(buildParagraph(`${numScraps} total scraps written, including all revisions`));
  blocks.push(buildParagraph(`${StructureBlock.convertDurationToStr(timeSpentWriting.lastDay * 0.001)} spent writing today`));
  blocks.push(buildParagraph(`${StructureBlock.convertDurationToStr(timeSpentWriting.lastWeek * 0.001)} spent writing in the last week`));
  blocks.push(buildParagraph(`${StructureBlock.convertDurationToStr(timeSpentWriting.lastMonth * 0.001)} spent writing in the last month`));
  blocks.push(buildParagraph(`${StructureBlock.convertDurationToStr(timeSpentWriting.allTime * 0.001)} spent writing total`));

  const remainingWork = scrapPile.determineRemainingWork();

  blocks.push(buildParagraph(`${remainingWork.numRemainingScraps} scraps still need to be completed (${remainingWork.percentComplete.toFixed(2)}% complete)`));

  return blocks;
}

export default generateWritingTracker;
