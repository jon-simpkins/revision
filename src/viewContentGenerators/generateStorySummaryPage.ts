import {ScrapPrototype} from '../types/Scrap';
import ViewContentBlock, {
  buildHeader,
  buildListEntry,
  buildParagraph,
  buildParagraphsFromTextArea
} from '../app/story-details/view-panel-content/ViewContentBlock';
import ViewOption from '../types/ViewOption';

import {ScrapPile} from '../types/ScrapPile';

function generateStorySummaryPage(scrapPile: ScrapPile): ViewContentBlock[] {

  const scrapsByPrototype = scrapPile.newestScrapBySingularPrototype;
  let blocks = [];

  blocks.push(buildHeader('Story Summary'));

  let title = 'Untitled Film';
  let titleViewOption = null;
  if (scrapsByPrototype.has(ScrapPrototype.MOVIE_TITLE)) {
    title = scrapsByPrototype.get(ScrapPrototype.MOVIE_TITLE).content.text;
    titleViewOption = ViewOption.detailsForScrap(scrapsByPrototype.get(ScrapPrototype.MOVIE_TITLE));
  }


  blocks.push(buildHeader(`Title: ${title}`, titleViewOption));

  if (scrapsByPrototype.has(ScrapPrototype.MOVIE_DURATION)) {
    const movieDurationScrap = scrapsByPrototype.get(ScrapPrototype.MOVIE_DURATION);
    blocks.push(buildHeader('Movie Duration:', ViewOption.detailsForScrap(movieDurationScrap)));
    blocks.push(buildParagraph(`${movieDurationScrap.content.text} min`));
  }

  if (scrapsByPrototype.has(ScrapPrototype.LOG_LINE)) {
    const logLineScrap = scrapsByPrototype.get(ScrapPrototype.LOG_LINE);
    blocks.push(buildHeader('Log Line:', ViewOption.detailsForScrap(logLineScrap)));
    blocks = buildParagraphsFromTextArea(logLineScrap.content.text, blocks);
  }

  if (scrapsByPrototype.has(ScrapPrototype.TIME_FRAME)) {
    const timeFrameScrap = scrapsByPrototype.get(ScrapPrototype.TIME_FRAME);
    blocks.push(buildHeader('Time Frame:', ViewOption.detailsForScrap(timeFrameScrap)));
    blocks.push(buildParagraph(timeFrameScrap.content.text));
  }

  if (scrapsByPrototype.has(ScrapPrototype.SIMILAR_MOVIES)) {
    const similarMovieScrap = scrapsByPrototype.get(ScrapPrototype.SIMILAR_MOVIES);
    blocks.push(buildHeader('Similar Movies:', ViewOption.detailsForScrap(similarMovieScrap)));
    const similarMovies = similarMovieScrap.content.lines;
    similarMovies.forEach(similarMovie => {
      if (similarMovie.active) {
        blocks.push(buildListEntry(similarMovie.text));
      }
    });
  }


  return blocks;
}

export default generateStorySummaryPage;
