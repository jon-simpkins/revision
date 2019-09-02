import Scrap, {ScrapPrototype} from './Scrap';

const SINGULAR_PROTOTYPES = new Set([ScrapPrototype.SIMILAR_MOVIES, ScrapPrototype.MOVIE_TITLE, ScrapPrototype.LOG_LINE]);

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
      console.log(scrap); // TODO: FIGURE OUT WHY THIS DOESNT WORK

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

    optionByPrototype.forEach((option) => {
      allOptions.push(option);
    });

    return allOptions;
  }

}


export default EditOption;
