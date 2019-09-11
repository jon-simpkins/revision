import {ScrapPile} from '../types/ScrapPile';
import ViewContentBlock, {buildHeader, buildParagraph} from '../app/story-details/view-panel-content/ViewContentBlock';
import ViewOption, {ViewOptionGenerators} from '../types/ViewOption';
import Character from '../types/Character';
import {ScrapPrototype} from '../types/Scrap';
import EditOption from '../types/EditOption';

function generateCharacterDetails(scrapPile: ScrapPile, scrapId: string, refId: string): ViewContentBlock[] {
  const blocks = [];

  const myCharacter = Character.buildFromScrapPile(refId, scrapPile);

  blocks.push(buildHeader('Character Details'));
  blocks.push(buildParagraph(myCharacter.refId));

  if (myCharacter.nameScrapId) {
    blocks.push(buildHeader('Name:', new ViewOption(ViewOptionGenerators.SCRAP_DETAILS, null, myCharacter.nameScrapId)));
    blocks.push(buildParagraph(myCharacter.name));
  } else {
    const nameEditOption = new EditOption();
    nameEditOption.refId = myCharacter.refId;
    nameEditOption.prototype = ScrapPrototype.CHARACTER_NAME;

    blocks.push(buildHeader('Unknown Name', null, nameEditOption));
  }

  if (myCharacter.genderScrapId) {
    blocks.push(buildHeader('Gender:', new ViewOption(ViewOptionGenerators.SCRAP_DETAILS, null, myCharacter.genderScrapId)));
    blocks.push(buildParagraph(myCharacter.gender));
  } else {
    const genderEditOption = new EditOption();
    genderEditOption.refId = myCharacter.refId;
    genderEditOption.prototype = ScrapPrototype.CHARACTER_GENDER;

    blocks.push(buildHeader('Unknown Gender', null, genderEditOption));
  }

  blocks.push(buildHeader('Summary:', new ViewOption(ViewOptionGenerators.SCRAP_DETAILS, null, scrapPile.newestScrapBySingularPrototype.get(ScrapPrototype.CHARACTER_LISTING).id)));
  blocks.push(buildParagraph(myCharacter.summary));

  blocks.push(buildHeader('See all characters', new ViewOption(ViewOptionGenerators.CHARACTER_LISTING, null)));

  return blocks;
}

export default generateCharacterDetails;
