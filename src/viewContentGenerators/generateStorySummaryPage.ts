import Scrap, {ScrapPrototype} from '../types/Scrap';
import ViewContentBlock, {buildHeader, buildListEntry, buildParagraph} from '../app/story-details/view-panel-content/ViewContentBlock';

const RELEVANT_PROTOTYPES = new Set([ScrapPrototype.MOVIE_TITLE, ScrapPrototype.LOG_LINE, ScrapPrototype.SIMILAR_MOVIES]);

function getLatestScrapsByPrototype(scraps: Map<string, Scrap>, relevantPrototypes: Set<ScrapPrototype>): Map<ScrapPrototype, Scrap> {
  let scrapsByPrototype = new Map <ScrapPrototype, Scrap>();

  scraps.forEach((scrap) => {
    if (!relevantPrototypes.has(scrap.prototype)) {
      return; // Move on, not relevant
    }

    // Only take if it's newer or if it's the first one of prototype we've encountered
    if (!scrapsByPrototype.has(scrap.prototype) || (scrap.completedEpoch > scrapsByPrototype.get(scrap.prototype).completedEpoch)) {
      scrapsByPrototype.set(scrap.prototype, scrap);
    }
  });

  return scrapsByPrototype;
}

function generateStorySummaryPage(scraps: Map <string, Scrap>): ViewContentBlock[] {

  let scrapsByPrototype = getLatestScrapsByPrototype(scraps, RELEVANT_PROTOTYPES);
  let blocks = [];

  blocks.push(buildHeader('Story Summary'));

  let title = 'Untitled Film';
  if (scrapsByPrototype.has(ScrapPrototype.MOVIE_TITLE)) {
    title = scrapsByPrototype.get(ScrapPrototype.MOVIE_TITLE).content.text;
  }


  blocks.push(buildHeader(`Title: ${title}`));

  if (scrapsByPrototype.has(ScrapPrototype.LOG_LINE)) {
    blocks.push(buildHeader('Log Line:'));
    let logLine = scrapsByPrototype.get(ScrapPrototype.LOG_LINE).content.text.split('\n');
    logLine.forEach(paragraph => {
      blocks.push(buildParagraph(paragraph));
    });
  }

  if (scrapsByPrototype.has(ScrapPrototype.SIMILAR_MOVIES)) {
    blocks.push(buildHeader('Similar Movies:'));
    let similarMovies = scrapsByPrototype.get(ScrapPrototype.SIMILAR_MOVIES).content.textLines;
    similarMovies.forEach(similarMovie => {
      blocks.push(buildListEntry(similarMovie));
    });
  }


  return blocks;
}

function canCreateStorySummary(scraps: Map <string, Scrap>): boolean {
  let scrapsByPrototype = getLatestScrapsByPrototype(scraps, RELEVANT_PROTOTYPES);

  return scrapsByPrototype.size > 0;
}

export {canCreateStorySummary};

export default generateStorySummaryPage;
