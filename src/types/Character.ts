import {ScrapPrototype} from './Scrap';
import {ScrapPile} from './ScrapPile';

class Character {
  refId: string;

  summary: string;

  name: string;
  nameScrapId: string;

  static buildFromScrapPile(refId: string, scrapPile: ScrapPile) {
    let myCharacter = new Character();
    myCharacter.refId = refId;

    const listingScrap = scrapPile.newestScrapBySingularPrototype.get(ScrapPrototype.CHARACTER_LISTING);
    listingScrap.content.lines.forEach(line => {
      if (line.refId === refId && line.active) {
        myCharacter.summary = line.text;
      }
    });

    let nameScrap = scrapPile.getByRefId(refId, ScrapPrototype.CHARACTER_NAME);
    if (nameScrap) {
      myCharacter.name = nameScrap.content.text;
      myCharacter.nameScrapId = nameScrap.id;
    }

    return myCharacter;
  }
}

export default Character;
