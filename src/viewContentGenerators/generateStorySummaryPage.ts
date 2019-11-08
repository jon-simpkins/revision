import ScrapPrototype from '../types/ScrapPrototype';
import ViewContentBlock, {
  buildHeader,
  buildListEntry,
  buildParagraph,
  buildScrapDetailsSection, buildScriptSection,
} from '../app/story-details/view-panel-content/ViewContentBlock';

import {ScrapPile} from '../types/ScrapPile';

function generateStorySummaryPage(scrapPile: ScrapPile): ViewContentBlock[] {
  let blocks = [];

  blocks.push(buildHeader('Story Summary'));

  blocks = blocks.concat(
    buildScrapDetailsSection(scrapPile,
      ScrapPrototype.MOVIE_TITLE,
      null,
      blocks,
      'Title',
      (titleScrap) => {
        return [
          buildParagraph(titleScrap.content.text)
        ];
      }
    )
  );

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

  blocks = blocks.concat(
    buildScrapDetailsSection(scrapPile,
      ScrapPrototype.LOG_LINE,
      null,
      blocks,
      'Log Line',
      (logLineScrap) => {
        return [
          buildScriptSection(logLineScrap.content.script.rawText, scrapPile)
        ];
      }
    )
  );

  blocks = blocks.concat(
    buildScrapDetailsSection(scrapPile,
      ScrapPrototype.TIME_FRAME,
      null,
      blocks,
      'Time Frame',
      (timeFrameScrap) => {
        return [
          buildParagraph(timeFrameScrap.content.text)
        ];
      }
    )
  );

  blocks = blocks.concat(
    buildScrapDetailsSection(scrapPile,
      ScrapPrototype.QUESTIONS_TO_EXPLORE,
      null,
      blocks,
      'Questions to Explore',
      (questionsToExploreScrap) => {
        return [
          buildScriptSection(questionsToExploreScrap.content.script.rawText, scrapPile)
        ];
      }
    )
  );

  blocks = blocks.concat(
    buildScrapDetailsSection(scrapPile,
      ScrapPrototype.SIMILAR_MOVIES,
      null,
      blocks,
      'Similar Movies',
      (similarMovieScrap) => {
        const movieBlocks = [];
        const similarMovies = similarMovieScrap.content.lines;
        similarMovies.forEach(similarMovie => {
          if (similarMovie.active) {
            movieBlocks.push(buildListEntry(similarMovie.text));
          }
        });
        return movieBlocks;
      }
    )
  );

  return blocks;
}

export default generateStorySummaryPage;
