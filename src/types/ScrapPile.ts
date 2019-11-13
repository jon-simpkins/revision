import Scrap from './Scrap';
import {SINGULAR_PROTOTYPES} from './SingularPrototypes';
import {TARGET_CONTENT_TYPE} from './ScrapTypes/ScrapContent';
import {StructureBlock} from './StoryStructure/StoryStructure';
import ScrapPrototype from './ScrapPrototype';
import EditOption from './EditOption';

// Convenience class for the callback of iterateOverStructure
class StructureIterationContent {
  constructor(
    public summaryScrap: Scrap,
    public durationSec: number,
    public scriptScrap: Scrap,
    public substructureScrap: Scrap,
    public block: StructureBlock,
    public depth: number,
    public parentStructureScrap: Scrap
  ) {}
}

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
      const durationScrap = this.newestScrapBySingularPrototype.get(ScrapPrototype.MOVIE_DURATION);
      if (durationScrap) {
        return Number(durationScrap.content.text) * 60;
      }
      return null; // Not able to fetch
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

    let structureScrap = this.getByRefId(refId, ScrapPrototype.STRUCTURE_SPEC);
    if (!structureScrap || !durationSec) {
      return null;
    }

    structureScrap = structureScrap.clone();
    structureScrap.content.storyStructure.rescaleToDuraction(durationSec);

    return structureScrap;
  }

  // TODO: UPDATE THIS TO BE CONSTANT TIME INSTEAD OF LINEAR
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

  /**
   * Build out the map of upper-case character name -> {refId, name}
   */
  buildCharacterMap(): Map<string, object> {
    const characterMap = new Map<string, object>();
    const characterListingScrap = this.newestScrapBySingularPrototype.get(ScrapPrototype.CHARACTER_LISTING);

    if (!characterListingScrap) {
      return new Map<string, object>();
    }

    const characterRefIds = [];
    characterListingScrap.content.lines.forEach(line => {
      if (line.active) {
        characterRefIds.push(line.refId);
      }
    });
    characterRefIds.forEach(characterRefId => {
      const nameScrap = this.getByRefId(characterRefId, ScrapPrototype.CHARACTER_NAME);

      if (nameScrap) {
        const name = nameScrap.content.text;
        characterMap.set(name.toUpperCase(), {
          refId: characterRefId,
          name
        });
      }
    });

    return characterMap;
  }

  /**
   * Convenience function to iterate over the entire story structure
   *
   * @param callback Called at every block in the structure (before iterating into sub-blocks)
   * @param structureScrap The structure or sub-structure to iterate over
   * @param depth The current depth of iteration
   */
  iterateOverStructure(callback: (StructureIterationContent) => void, structureScrap?: Scrap, depth?: number) {
    if (!structureScrap) {
      // Start at the top if this is the first iterative call
      structureScrap = this.fetchProperlyRescaledStructureScrap(null);
      depth = 1;
    }

    if (!structureScrap) {
      return; // Entirely possible that the structure is not defined yet
    }

    const storyStructure = this.fetchProperlyRescaledStructureScrap(structureScrap.refId).content.storyStructure;

    storyStructure.blocks.forEach((block, idx) => {

      const summary = this.getByRefId(block.refId, ScrapPrototype.STRUCTURE_BLOCK_SUMMARY);
      const contentScrap = this.getByRefId(block.refId, ScrapPrototype.STRUCTURE_BLOCK_CONTENT);
      const duration = storyStructure.getBlockDurationSec(idx);

      let scriptScrap = null;
      let substructureScrap = null;

      if (contentScrap) {
        if (contentScrap.content.targetType === TARGET_CONTENT_TYPE.SCRIPT_SCRAP) {
          scriptScrap = this.getByRefId(contentScrap.content.targetRefId, ScrapPrototype.SCRIPT);
        } else {
          substructureScrap = this.getByRefId(contentScrap.content.targetRefId, ScrapPrototype.STRUCTURE_SPEC);
        }
      }

      callback(new StructureIterationContent(
        summary,
        duration,
        scriptScrap,
        substructureScrap,
        block,
        depth,
        structureScrap,
      ));

      if (substructureScrap) {
        this.iterateOverStructure(callback, substructureScrap, depth + 1);
      }
    });
  }

  validateAddition(scrap: Scrap): string | null {
    if (scrap.prototype === ScrapPrototype.MOVIE_DURATION) {
      // Validate that the duration is a number
      const parsed = Number(scrap.content.text);
      if (!parsed || parsed < 0) {
        return 'Movie duration must be a positive number';
      }
    }

    if (scrap.prototype === ScrapPrototype.TRAITS) {
      // Validate that no entries are the same
      const traitMap = {};
      let validationError = null;
      scrap.content.lines.forEach(line => {
        if (line.text) {
          if (traitMap[line.text]) {
            validationError = `Duplicate trait: "${line.text}"`;
          } else {
            traitMap[line.text] = true;
          }
        }
      });

      if (validationError) {
        return validationError;
      }
    }

    return null;
  }

  determineRemainingWork(): any {
    const editOptions = EditOption.buildOptions(this);

    const newEditOptions = editOptions.filter(option => {
      return !option.iterations;
    });

    return {
      percentComplete: (100.0 * (1.0 - newEditOptions.length / editOptions.length)),
      numRemainingScraps: newEditOptions.length
    } ;
  }

  determineTimeSpentWriting(): any {
    const timeSpentMs = {
      lastDay: 0,
      lastWeek: 0,
      lastMonth: 0,
      allTime: 0,
    };

    const now = Date.now();
    const monthCutoff = 30.5 * 24 * 3600 * 1000;
    const weekCutoff = 7 * 24 * 3600 * 1000;
    const dayCutoff = 24 * 3600 * 1000;

    this.scrapById.forEach(scrap => {
      const writingDuration = (scrap.completedEpoch - scrap.startedEpoch);
      const timeSinceCompleted = now - scrap.completedEpoch;

      timeSpentMs.allTime += writingDuration;
      if (timeSinceCompleted < monthCutoff) {
        timeSpentMs.lastMonth += writingDuration;
        if (timeSinceCompleted < weekCutoff) {
          timeSpentMs.lastWeek += writingDuration;
          if (timeSinceCompleted < dayCutoff) {
            timeSpentMs.lastDay += writingDuration;
          }
        }
      }

    });

    return timeSpentMs;
  }
}

export {ScrapPile, StructureIterationContent};
