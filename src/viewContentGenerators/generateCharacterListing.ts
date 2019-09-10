import {ScrapPile} from '../types/ScrapPile';
import ViewContentBlock, {buildHeader, buildListEntry, buildParagraph} from '../app/story-details/view-panel-content/ViewContentBlock';
import ViewOption, {ViewOptionGenerators} from '../types/ViewOption';
import {ScrapPrototype} from '../types/Scrap';

function generateCharacterListing(scrapPile: ScrapPile): ViewContentBlock[] {
  const blocks = [];

  const listingScrap = scrapPile.newestScrapBySingularPrototype.get(ScrapPrototype.CHARACTER_LISTING);

  blocks.push(buildHeader('Character Listing', ViewOption.detailsForScrap(listingScrap)));
  blocks.push(buildParagraph('Here are all the characters:'));

  listingScrap.content.lines.forEach(line => {
    if (!line.active) {
      return;
    }

    const detailViewOption = new ViewOption(
      ViewOptionGenerators.CHARACTER_DETAILS,
      null,
      null,
      line.refId
    );

    const nameScrap = scrapPile.getByRefId(line.refId, ScrapPrototype.CHARACTER_NAME);
    let nameToDisplay = line.text;
    if (nameScrap) {
      nameToDisplay = nameScrap.content.text;
    }

    blocks.push(buildListEntry(nameToDisplay, detailViewOption));
  });

  return blocks;
}

export default generateCharacterListing;
