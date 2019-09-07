import Scrap, {ScrapPrototype} from '../types/Scrap';

export function getLatestScrapsByPrototype(
  scraps: Map<string, Scrap>, relevantPrototypes: Set<ScrapPrototype>
): Map<ScrapPrototype, Scrap> {
  let scrapsByPrototype = new Map <ScrapPrototype, Scrap>();

  scraps.forEach((scrap) => {
    if (!relevantPrototypes.has(scrap.prototype)) {
      return; // Move on, not relevant
    }

    // Only take if it's newer or if it's the first one of prototype we've encountered
    if (!scrapsByPrototype.has(scrap.prototype) || (scrap.completedEpoch > scrapsByPrototype.get(scrap.prototype).completedEpoch)) {
      scrapsByPrototype.set(scrap.prototype, scrap);
    }
  });

  return scrapsByPrototype;
}
