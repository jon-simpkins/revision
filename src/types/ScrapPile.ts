import Scrap, {ScrapPrototype} from './Scrap';
import {SINGULAR_PROTOTYPES} from './SingularPrototypes';

class ScrapPile {
  scrapById = new Map<string, Scrap>();
  newestScrapBySingularPrototype = new Map<ScrapPrototype, Scrap>();
  newestScrapByRefAndPrototype = new Map<string, Map<ScrapPrototype, Scrap>>();

  importFromSerialization(serializedContent: string) {
    let newScrap = Scrap.parseSerialization(serializedContent);
    this.addScrap(newScrap);
  }

  addScrap(scrap: Scrap) {
    this.scrapById.set(scrap.id, scrap); // Always store by ID

    // If it's newest or first of a singular prototype, store it
    if (SINGULAR_PROTOTYPES.has(scrap.prototype)) {
      if (!this.newestScrapBySingularPrototype.has(scrap.prototype) ||
        (this.newestScrapBySingularPrototype.get(scrap.prototype).completedEpoch < scrap.completedEpoch)) {
        this.newestScrapBySingularPrototype.set(scrap.prototype, scrap);
      }
    } else {
      if (!this.newestScrapByRefAndPrototype.has(scrap.refId)) {
        this.newestScrapByRefAndPrototype.set(scrap.refId, new Map<ScrapPrototype, Scrap>());
      }

      const mapForRefId = this.newestScrapByRefAndPrototype.get(scrap.refId);

      if (!mapForRefId.has(scrap.prototype)
        || (mapForRefId.get(scrap.prototype).completedEpoch < scrap.completedEpoch)
      ) {
        mapForRefId.set(scrap.prototype, scrap);
      }
    }
  }

  hasAnyScraps(): boolean {
    return this.scrapById.size > 0;
  }

  hasOneOfSingularPrototypes(relevantPrototypes: ScrapPrototype[]): boolean {
    for (let i = 0; i < relevantPrototypes.length; i++) {
      if (this.newestScrapBySingularPrototype.has(relevantPrototypes[i])) {
        return true;
      }
    }
    return false;
  }

  getAllCharacterRefIds() {
    const characterListingScrap = this.newestScrapBySingularPrototype.get(ScrapPrototype.CHARACTER_LISTING);
    if (!characterListingScrap) {
      return [];
    }

    return characterListingScrap.content.lines.filter(line => {
      return line.active;
    }).map(line => {
      return line.refId;
    });
  }

  getByRefId(refId: string, scrapPrototype: ScrapPrototype): Scrap {
    if (!this.newestScrapByRefAndPrototype.get(refId)) {
      return null; // No scraps for this refId yet
    }

    return this.newestScrapByRefAndPrototype.get(refId).get(scrapPrototype);
  }
}

export {ScrapPile};
