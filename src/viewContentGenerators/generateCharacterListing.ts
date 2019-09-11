import {ScrapPile} from '../types/ScrapPile';
import ViewContentBlock, {buildHeader, buildListEntry, buildParagraph} from '../app/story-details/view-panel-content/ViewContentBlock';
import ViewOption, {ViewOptionGenerators} from '../types/ViewOption';
import {ScrapPrototype} from '../types/Scrap';
import Character from '../types/Character';

function generateCharacterListing(scrapPile: ScrapPile): ViewContentBlock[] {
  let blocks = [];

  const listingScrap = scrapPile.newestScrapBySingularPrototype.get(ScrapPrototype.CHARACTER_LISTING);

  blocks.push(buildHeader('Character Listing', ViewOption.detailsForScrap(listingScrap)));

  const characterListBlocks = [];
  let characterCountByGender = {
    male: 0,
    female: 0,
    'non-binary': 0,
    unknown: 0
  };

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

    const thisCharacter = Character.buildFromScrapPile(line.refId, scrapPile);

    const nameToDisplay = thisCharacter.name ? thisCharacter.name : thisCharacter.summary;

    if (thisCharacter.gender) {
      characterCountByGender[thisCharacter.gender] += 1;
    } else {
      characterCountByGender.unknown += 1;
    }

    characterListBlocks.push(buildListEntry(nameToDisplay, detailViewOption));
  });

  blocks.push(buildHeader('Character Count by Gender:'));
  Object.keys(characterCountByGender).forEach(key => {
    if (characterCountByGender[key]) {
      blocks.push(buildListEntry(`${key}: ${characterCountByGender[key]}`));
    }
  });

  blocks.push(buildHeader('List of Characters:'));
  blocks = blocks.concat(characterListBlocks);

  return blocks;
}

export default generateCharacterListing;
