import {ScrapPile} from '../types/ScrapPile';
import ViewContentBlock, {buildHeader, buildParagraph} from '../app/story-details/view-panel-content/ViewContentBlock';
import {StructureBlock} from '../types/StoryStructure/StoryStructure';
import EditOption from '../types/EditOption';

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

  const editOptions = EditOption.buildOptions(scrapPile);

  blocks.push(buildParagraph(`${numScraps} total scraps written, including all revisions`));
  blocks.push(buildParagraph(`${StructureBlock.convertDurationToStr(totalMs * 0.001)} spent writing`));
  blocks.push(buildParagraph(`${StructureBlock.convertDurationToStr(totalMsToday * 0.001)} spent writing today`));

  const newEditOptions = editOptions.filter(option => {
    return !option.iterations;
  });

  const percentComplete = 100.0 * (1.0 - newEditOptions.length / editOptions.length);

  blocks.push(buildParagraph(`${newEditOptions.length} scraps still need to be completed (${percentComplete.toFixed(2)}% complete)`));

  return blocks;
}

export default generateWritingTracker;
