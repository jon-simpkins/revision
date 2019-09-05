import Scrap, {ScrapPrototype} from './Scrap';
import {SINGULAR_PROTOTYPES} from './SingularPrototypes';

const SINGULAR_DEPENDENCY_MAP = new Map<ScrapPrototype, Set<ScrapPrototype>>();
SINGULAR_DEPENDENCY_MAP.set(ScrapPrototype.LOG_LINE, new Set([ScrapPrototype.SIMILAR_MOVIES]));
SINGULAR_DEPENDENCY_MAP.set(ScrapPrototype.MOVIE_TITLE, new Set([ScrapPrototype.SIMILAR_MOVIES, ScrapPrototype.LOG_LINE]));

class EditOption {
  prototype: ScrapPrototype;
  scrapId: string; // ID to start from on next edit
  iterations: number; // How many times as this scrap been iterated on?
  lastEdited: number; // Epoch of last edit

  // Function to fetch header text for list
  getHeader() : string {
    switch (this.prototype) {
      case ScrapPrototype.MOVIE_TITLE:
        return 'Movie Title';
      case ScrapPrototype.LOG_LINE:
        return 'Log Line';
      case ScrapPrototype.SIMILAR_MOVIES:
        return 'Similar Movies';
    }
  }

  static buildOptions(scraps: Map<string, Scrap>): EditOption[] {
    let allOptions = [];

    // First, just go ahead and figure out the options for prototypes which only have 1 instance for the
    let optionByPrototype = new Map<ScrapPrototype, EditOption>();
    SINGULAR_PROTOTYPES.forEach((prototype) => {
      let newOption = new EditOption();
      newOption.prototype = prototype;
      newOption.iterations = 0;
      newOption.lastEdited = 0;
      newOption.scrapId = 'null';

      optionByPrototype.set(prototype, newOption);
    });


    scraps.forEach((scrap: Scrap) => {
      if (!SINGULAR_PROTOTYPES.has(scrap.prototype)) {
        return; // Only care about singular ones now
      }

      let competingOption = optionByPrototype.get(scrap.prototype);

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
        let dependencies = SINGULAR_DEPENDENCY_MAP.get(prototype);
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

      allOptions.push(option);
    });

    // Return the sorted version, where less-iterated things are on top,
    // and recency of edit is the tiebreaker
    return allOptions.sort((a: EditOption, b: EditOption) => {
      if (b.iterations != a.iterations) {
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
}


export default EditOption;
