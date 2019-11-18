import {ScrapPile, StructureIterationContent} from '../types/ScrapPile';
import ViewContentBlock, {
  buildHeader,
  buildParagraph,
  buildScrapDetailsSection,
  buildTimeline
} from '../app/story-details/view-panel-content/ViewContentBlock';
import ScrapPrototype from '../types/ScrapPrototype';
import TimelineBlock from '../types/TimelineBlock';

function generateFullTimeline(scrapPile: ScrapPile): ViewContentBlock[] {
  let blocks = [];

  blocks.push(buildHeader('Full Timeline:'));
  blocks = blocks.concat(
    buildScrapDetailsSection(scrapPile,
      ScrapPrototype.MOVIE_DURATION,
      null,
      blocks,
      'Movie Duration',
      (movieDurationScrap) => {
        return [
          buildParagraph(`${movieDurationScrap.content.text} min`)
        ];
      }
    )
  );

  const structureScrap = scrapPile.newestScrapBySingularPrototype.get(ScrapPrototype.STRUCTURE_SPEC);
  if (!structureScrap) {
    blocks.push(buildParagraph(''))
    return blocks;
  }

  const durationMin = Number(scrapPile.newestScrapBySingularPrototype.get(ScrapPrototype.MOVIE_DURATION).content.text);

  const timelineBlocks = [];
  timelineBlocks.push(
    new TimelineBlock(
      'Entire Film',
      '',
      0,
      durationMin * 60,
      null
    )
  );

  scrapPile.iterateOverStructure((contents: StructureIterationContent) => {
    if (!contents.scriptScrap) {
      timelineBlocks.push(
        contents.buildTimelineBlock(
          `Outline, depth: ${contents.depth}`,
          ''
        )
      );
    }
  });

  scrapPile.iterateOverStructure((contents: StructureIterationContent) => {
    if (!!contents.scriptScrap) {
      timelineBlocks.push(
        contents.buildTimelineBlock(
          'Script',
          ''
        )
      );
    }
  });

  blocks.push(buildTimeline(timelineBlocks));

  return blocks;
}

export default generateFullTimeline;
