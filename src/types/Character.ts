import ScrapPrototype from './ScrapPrototype';
import {ScrapPile} from './ScrapPile';

class Character {
  refId: string;

  summary: string;

  name: string;
  nameScrapId: string;
  gender: string;
  genderScrapId: string;
  drive: string;
  driveScrapId: string;

  static buildFromScrapPile(refId: string, scrapPile: ScrapPile) {
    let myCharacter = new Character();
    myCharacter.refId = refId;

    const listingScrap = scrapPile.newestScrapBySingularPrototype.get(ScrapPrototype.CHARACTER_LISTING);
    listingScrap.content.lines.forEach(line => {
      if (line.refId === refId && line.active) {
        myCharacter.summary = line.text;
      }
    });

    const nameScrap = scrapPile.getByRefId(refId, ScrapPrototype.CHARACTER_NAME);
    if (nameScrap) {
      myCharacter.name = nameScrap.content.text;
      myCharacter.nameScrapId = nameScrap.id;
    }

    const genderScrap = scrapPile.getByRefId(refId, ScrapPrototype.CHARACTER_GENDER);
    if (genderScrap) {
      myCharacter.gender = genderScrap.content.text;
      myCharacter.genderScrapId = genderScrap.id;
    }

    const driveScrap = scrapPile.getByRefId(refId, ScrapPrototype.CHARACTER_DRIVE);
    if (driveScrap) {
      myCharacter.drive = driveScrap.content.script.rawText;
      myCharacter.driveScrapId = driveScrap.id;
    }

    return myCharacter;
  }
}

export default Character;
