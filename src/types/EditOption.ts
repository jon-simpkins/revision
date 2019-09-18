import Scrap, {ScrapPrototype} from './Scrap';
import {SINGULAR_PROTOTYPES} from './SingularPrototypes';
import {ScrapPile} from './ScrapPile';
import {StoryStructure} from './StoryStructure/StoryStructure';

const SINGULAR_DEPENDENCY_MAP = new Map<ScrapPrototype, Set<ScrapPrototype>>();
SINGULAR_DEPENDENCY_MAP.set(ScrapPrototype.MOVIE_DURATION, new Set([ScrapPrototype.SIMILAR_MOVIES]));
SINGULAR_DEPENDENCY_MAP.set(ScrapPrototype.LOG_LINE, new Set([ScrapPrototype.SIMILAR_MOVIES]));
SINGULAR_DEPENDENCY_MAP.set(ScrapPrototype.TIME_FRAME, new Set([ScrapPrototype.SIMILAR_MOVIES]));
SINGULAR_DEPENDENCY_MAP.set(ScrapPrototype.MOVIE_TITLE, new Set([ScrapPrototype.TIME_FRAME, ScrapPrototype.LOG_LINE]));
SINGULAR_DEPENDENCY_MAP.set(ScrapPrototype.CHARACTER_LISTING, new Set([ScrapPrototype.LOG_LINE]));
SINGULAR_DEPENDENCY_MAP.set(ScrapPrototype.STRUCTURE_SPEC, new Set([ScrapPrototype.MOVIE_DURATION]));

class EditOption {
  prototype: ScrapPrototype;
  scrapId: string; // ID to start from on next edit
  refId: string; // ID of the entity this corresponds to
  iterations: number; // How many times as this scrap been iterated on?
  lastEdited: number; // Epoch of last edit

  static buildSingularOptions(scrapPile: ScrapPile): EditOption[] {
    const singularOptions = [];

    // First, just go ahead and figure out the options for singular prototypes
    const optionByPrototype = new Map<ScrapPrototype, EditOption>();
    SINGULAR_PROTOTYPES.forEach((prototype) => {
      const newOption = new EditOption();
      newOption.prototype = prototype;
      newOption.iterations = 0;
      newOption.lastEdited = 0;
      newOption.scrapId = 'null';

      optionByPrototype.set(prototype, newOption);
    });


    scrapPile.scrapById.forEach((scrap: Scrap) => {
      if (!SINGULAR_PROTOTYPES.has(scrap.prototype)) {
        return; // Only care about singular ones now
      }

      const competingOption = optionByPrototype.get(scrap.prototype);

      competingOption.iterations += 1;
      if (scrap.completedEpoch > competingOption.lastEdited) {
        competingOption.scrapId = scrap.id;
        competingOption.lastEdited = scrap.completedEpoch;
      }
    });

    // Add only options which have the necessary dependencies
    optionByPrototype.forEach((option, prototype) => {
      if (SINGULAR_DEPENDENCY_MAP.has(prototype)) {
        // Check dependencies, proceed
        const dependencies = SINGULAR_DEPENDENCY_MAP.get(prototype);
        let hasAllDependencies = true;
        dependencies.forEach((dependency) => {
          if (!optionByPrototype.has(dependency) || !optionByPrototype.get(dependency).iterations) {
            hasAllDependencies = false;
          }
        });

        if (!hasAllDependencies) {
          return;
        }
      }

      singularOptions.push(option);
    });

    return singularOptions;
  }

  static buildStructureOptions(scrapPile: ScrapPile): EditOption[] {
    const allOptions = [];

    const allStructures: StoryStructure[] = [];

    if (scrapPile.newestScrapBySingularPrototype.has(ScrapPrototype.STRUCTURE_SPEC)) {
      allStructures.push(
        scrapPile.newestScrapBySingularPrototype.get(ScrapPrototype.STRUCTURE_SPEC).content.storyStructure
      );
    }

    // TODO: GRAB OTHER STRUCTURE OPTIONS

    const BLOCK_PROTOTYPES = new Set([
      ScrapPrototype.STRUCTURE_BLOCK_SUMMARY
    ]);

    allStructures.forEach(structure => {
      structure.blocks.forEach(block => {
        BLOCK_PROTOTYPES.forEach(prototype => {
          // yikes, 3 nested for loops is not super great

          const newOption = new EditOption();
          newOption.prototype = prototype;
          newOption.iterations = 0;
          newOption.lastEdited = 0;
          newOption.scrapId = 'null';
          newOption.refId = block.refId;

          if (scrapPile.getByRefId(block.refId, prototype)) {
            const relevantScrap = scrapPile.getByRefId(block.refId, prototype);

            newOption.scrapId = relevantScrap.id;
            newOption.lastEdited = relevantScrap.completedEpoch;
            newOption.iterations = 1; // Inaccurrate, but performant; we really just care if it has ever been completed, and when
          }

          allOptions.push(newOption);
        });
      });
    });

    return allOptions;
  }

  static buildCharacterOptions(scrapPile: ScrapPile): EditOption[] {
    const allOptions = [];

    const allCharRefIds = scrapPile.getAllCharacterRefIds();
    if (!allCharRefIds.length) {
      return [];
    }

    // Blindly add all character name edits
    const CHARACTER_PROTOTYPES = new Set([
      ScrapPrototype.CHARACTER_NAME,
      ScrapPrototype.CHARACTER_GENDER,
      ScrapPrototype.CHARACTER_DRIVE
    ]);

    allCharRefIds.forEach(refId => {
      CHARACTER_PROTOTYPES.forEach(prototype => {
        const newOption = new EditOption();
        newOption.prototype = prototype;
        newOption.iterations = 0;
        newOption.lastEdited = 0;
        newOption.scrapId = 'null';
        newOption.refId = refId;

        if (scrapPile.getByRefId(refId, prototype)) {
          const relevantScrap = scrapPile.getByRefId(refId, prototype);

          newOption.scrapId = relevantScrap.id;
          newOption.lastEdited = relevantScrap.completedEpoch;
          newOption.iterations = 1; // Inaccurrate, but performant; we really just care if it has ever been completed, and when
        }

        allOptions.push(newOption);
      });
    });

    return allOptions;
  }

  static buildOptions(scrapPile: ScrapPile): EditOption[] {
    const allOptions = []
      .concat(EditOption.buildSingularOptions(scrapPile))
      .concat(EditOption.buildCharacterOptions(scrapPile))
      .concat(EditOption.buildStructureOptions(scrapPile));

    // Return the sorted version, where less-iterated things are on top,
    // and recency of edit is the tiebreaker
    return allOptions.sort((a: EditOption, b: EditOption) => {
      if (b.iterations !== a.iterations) {
        return a.iterations - b.iterations;
      }

      return a.lastEdited - b.lastEdited;
    });
  }

  static selectRandom(options: EditOption[]): EditOption {
    let incompleteOptions = options.filter(option => {
      return !option.iterations;
    });

    if (incompleteOptions.length) {
      let randomIdx = Math.floor(Math.random() * incompleteOptions.length);

      return incompleteOptions[randomIdx];
    }

    let randomIdx = Math.floor(Math.random() * options.length);
    return options[randomIdx];
  }

  static buildFromScrap(scrap: Scrap): EditOption {
    let editOption = new EditOption();
    editOption.prototype = scrap.prototype;
    editOption.scrapId = scrap.id;
    editOption.refId = scrap.refId;

    return editOption;
  }

  // Function to fetch header text for list
  getHeader(): string {
    switch (this.prototype) {
      case ScrapPrototype.MOVIE_TITLE:
        return 'Movie Title';
      case ScrapPrototype.LOG_LINE:
        return 'Log Line';
      case ScrapPrototype.SIMILAR_MOVIES:
        return 'Similar Movies';
      case ScrapPrototype.TIME_FRAME:
        return 'Time Frame';
      case ScrapPrototype.MOVIE_DURATION:
        return 'Movie Duration';
      case ScrapPrototype.CHARACTER_LISTING:
        return 'Character Listing';
      case ScrapPrototype.CHARACTER_NAME:
        return 'Character Name';
      case ScrapPrototype.CHARACTER_GENDER:
        return 'Character Gender';
      case ScrapPrototype.CHARACTER_DRIVE:
        return 'Character Drive';
      case ScrapPrototype.STRUCTURE_SPEC:
        return 'Structure Spec';
      case ScrapPrototype.STRUCTURE_BLOCK_SUMMARY:
        return 'Structure Block Summary';
    }
  }
}


export default EditOption;
