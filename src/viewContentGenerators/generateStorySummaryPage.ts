import Scrap, {ScrapPrototype} from '../types/Scrap';
import ViewContentBlock, {
  buildHeader,
  buildListEntry,
  buildParagraph,
  buildParagraphsFromTextArea
} from '../app/story-details/view-panel-content/ViewContentBlock';
import ViewOption from '../types/ViewOption';

import {getLatestScrapsByPrototype} from './getLatestScrapsByPrototype';

const RELEVANT_PROTOTYPES = new Set([ScrapPrototype.MOVIE_TITLE, ScrapPrototype.LOG_LINE, ScrapPrototype.TIME_FRAME, ScrapPrototype.SIMILAR_MOVIES]);

function generateStorySummaryPage(scraps: Map <string, Scrap>): ViewContentBlock[] {

  let scrapsByPrototype = getLatestScrapsByPrototype(scraps, RELEVANT_PROTOTYPES);
  let blocks = [];

  blocks.push(buildHeader('Story Summary'));

  let title = 'Untitled Film';
  let titleViewOption = null;
  if (scrapsByPrototype.has(ScrapPrototype.MOVIE_TITLE)) {
    title = scrapsByPrototype.get(ScrapPrototype.MOVIE_TITLE).content.text;
    titleViewOption = ViewOption.detailsForScrap(scrapsByPrototype.get(ScrapPrototype.MOVIE_TITLE));
  }


  blocks.push(buildHeader(`Title: ${title}`, titleViewOption));

  if (scrapsByPrototype.has(ScrapPrototype.LOG_LINE)) {
    let logLineScrap = scrapsByPrototype.get(ScrapPrototype.LOG_LINE);
    blocks.push(buildHeader('Log Line:', ViewOption.detailsForScrap(logLineScrap)));
    blocks = buildParagraphsFromTextArea(logLineScrap.content.text, blocks);
  }

  if (scrapsByPrototype.has(ScrapPrototype.TIME_FRAME)) {
    let timeFrameScrap = scrapsByPrototype.get(ScrapPrototype.TIME_FRAME);
    blocks.push(buildHeader('Time Frame:', ViewOption.detailsForScrap(timeFrameScrap)));
    blocks.push(buildParagraph(timeFrameScrap.content.text));
  }

  if (scrapsByPrototype.has(ScrapPrototype.SIMILAR_MOVIES)) {
    let similarMovieScrap = scrapsByPrototype.get(ScrapPrototype.SIMILAR_MOVIES);
    blocks.push(buildHeader('Similar Movies:', ViewOption.detailsForScrap(similarMovieScrap)));
    let similarMovies = similarMovieScrap.content.lines;
    similarMovies.forEach(similarMovie => {
      if (similarMovie.active) {
        blocks.push(buildListEntry(similarMovie.text));
      }
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
