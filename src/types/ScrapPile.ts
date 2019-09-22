import Scrap, {ScrapPrototype} from './Scrap';
import {SINGULAR_PROTOTYPES} from './SingularPrototypes';

class ScrapPile {
  scrapById = new Map<string, Scrap>();
  newestScrapBySingularPrototype = new Map<ScrapPrototype, Scrap>();
  newestScrapByRefAndPrototype = new Map<string, Map<ScrapPrototype, Scrap>>();

  importFromSerialization(serializedContent: string) {
    this.addScrap(
      Scrap.parseSerialization(serializedContent)
    );
  }

  addScrap(scrap: Scrap) {
    this.scrapById.set(scrap.id, scrap); // Always store by ID

    // If it's newest or first of a singular prototype, store it
    if (SINGULAR_PROTOTYPES.has(scrap.prototype) && !scrap.refId) {
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
    if (!refId) {
      return this.newestScrapBySingularPrototype.get(scrapPrototype);
    }

    if (!this.newestScrapByRefAndPrototype.get(refId)) {
      return null; // No scraps for this refId yet
    }

    return this.newestScrapByRefAndPrototype.get(refId).get(scrapPrototype);
  }

  forEachNewestByRefId(scrapPrototype: ScrapPrototype, callback: (foundScrap: Scrap) => void) {
    this.newestScrapByRefAndPrototype.forEach((refIdMap) => {
      if (refIdMap.has(scrapPrototype)) {
        callback(refIdMap.get(scrapPrototype));
      }
    });
  }

  // Convenience function for fetching the constraining duration for a structure
  fetchConstraintDurationSec(refId: string): number {
    if (!refId) {
      // If not a reference to a child structure, fetch the top-level story duration
      return Number(this.newestScrapBySingularPrototype.get(ScrapPrototype.MOVIE_DURATION).content.text) * 60;
    }

    // Grab the content block that's pointing to this refId
    let contentBlockScrap: Scrap;
    this.forEachNewestByRefId(ScrapPrototype.STRUCTURE_BLOCK_CONTENT, (scrap) => {
      if (scrap.content.targetRefId === refId) {
        contentBlockScrap = scrap;
      }
    });

    if (!contentBlockScrap) {
      throw new Error('Could not find content block referencing this sub-structure');
    }

    const parentStructureRefId = this.fetchStructureBlockParentRefId(contentBlockScrap.refId);

    const parentStructure = this.fetchProperlyRescaledStructureScrap(parentStructureRefId).content.storyStructure;
    let durationSec = 0;
    parentStructure.blocks.forEach((block, idx) => {
      if (block.refId === contentBlockScrap.refId) {
        durationSec = parentStructure.getBlockDurationSec(idx);
      }
    });

    return durationSec;
  }

  // Given a block refId, fetch the corresponding structure's refId
  fetchStructureBlockParentRefId(blockRefId: string): string {
    // First off check if this block is referenced in the top-level structure
    if (this.newestScrapBySingularPrototype.has(ScrapPrototype.STRUCTURE_SPEC)) {
      const topLevelStructure = this.newestScrapBySingularPrototype
        .get(ScrapPrototype.STRUCTURE_SPEC).content.storyStructure;
      for (let i = 0; i < topLevelStructure.blocks.length; i++) {
        if (topLevelStructure.blocks[i].refId === blockRefId) {
          return null; // Since the refId of the top-level structure is null
        }
      }
    }

    // Next, check every sub-structure floating around, until #33 lands and this is more efficient
    let foundParentRefId = null;
    this.forEachNewestByRefId(ScrapPrototype.STRUCTURE_SPEC, (scrap) => {
      if (foundParentRefId) {
        return;
      }
      const structureBlocks = scrap.content.storyStructure.blocks;
      for (let i = 0; i < structureBlocks.length; i++) {
        if (structureBlocks[i].refId === blockRefId) {
          foundParentRefId = scrap.refId;
        }
      }
    });

    if (foundParentRefId) {
      return foundParentRefId;
    }

    throw new Error('Unable to find refId of structure containing block: ' + blockRefId);
  }

  // This is to deal with the fact that the duration of the structure is determined elsewhere by a parent entity
  fetchProperlyRescaledStructureScrap(refId: string): Scrap {
    const durationSec = this.fetchConstraintDurationSec(refId);

    const structureScrap = this.getByRefId(refId, ScrapPrototype.STRUCTURE_SPEC).clone();
    structureScrap.content.storyStructure.rescaleToDuraction(durationSec);

    return structureScrap;
  }

  fetchContentBlockByContentRefId(refId: string): string {
    let contentBlockRefId: string = null;

    this.forEachNewestByRefId(
      ScrapPrototype.STRUCTURE_BLOCK_CONTENT,
      (scrap: Scrap) => {
        if (scrap.content.targetRefId === refId) {
          contentBlockRefId = scrap.refId;
        }
      }
    );

    return contentBlockRefId;
  }
}

export {ScrapPile};
