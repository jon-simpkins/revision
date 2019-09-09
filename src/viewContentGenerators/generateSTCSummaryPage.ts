import {ScrapPrototype} from '../types/Scrap';
import ViewContentBlock, {
  buildHeader,
  buildParagraph,
  buildParagraphsFromTextArea
} from '../app/story-details/view-panel-content/ViewContentBlock';
import ViewOption from '../types/ViewOption';
import {getOptionFromValue} from '../types/getSTCGenres';
import {ScrapPile} from '../types/ScrapPile';

function generateSTCSummaryPage(scrapPile: ScrapPile): ViewContentBlock[] {

  const scrapsByPrototype = scrapPile.newestScrapBySingularPrototype;
  let blocks = [];

  blocks.push(buildHeader('Save the Cat Summary'));

  if (scrapsByPrototype.has(ScrapPrototype.STC_GENRE)) {
    const genreScrap = scrapsByPrototype.get(ScrapPrototype.STC_GENRE);

    const genreOption = getOptionFromValue(genreScrap.content.text);

    if (genreOption) {
      blocks.push(buildHeader(
        'Genre: ' + genreOption.label,
        ViewOption.detailsForScrap(genreScrap)
      ));
      blocks.push(buildParagraph(
        genreOption.desc
      ));

      if (scrapsByPrototype.has(ScrapPrototype.STC_GENRE_EXPLANATION)) {
        const explanationScrap = scrapsByPrototype.get(ScrapPrototype.STC_GENRE_EXPLANATION);

        blocks.push(buildHeader(
          'Genre Explanation:',
          ViewOption.detailsForScrap(explanationScrap)
        ));
        blocks = buildParagraphsFromTextArea(explanationScrap.content.text, blocks);
      }

    }
  }

  return blocks;
}

export {generateSTCSummaryPage};
