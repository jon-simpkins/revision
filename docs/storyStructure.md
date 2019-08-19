# What does a story consist of?

The goal of this doc is to outline the general structure for storing / editing
stories in this app:

* a Story is composed of M scraps
* a Scrap is an atomic piece of writing, designed to be completable in under an hour of writing
  * e.g. an individual story beat in a scene, or a higher-level task like "name 3 movies similar to this one"
  * Scraps can have linkages to other Scraps
  * Scraps can have empty linkages to Scraps which haven't been created yet
    * A cork board for Act 3 will eventually have linkages between the index cards and the corresponding scenes
    * Each of those scenes will eventually have linkages to the individual scene beats
    * Each of those scene beats will eventually have a linkage to the corresponding snippet of script
* a View is a UI representation of N scraps, and supports optional editing mode
  * a view supports edit mode, view mode
  * multiple views can "claim" a particular scrap, there's not a specific mapping of scrap -> view
  * a view can require that P other scraps are completed before it's editable
* a Rendering is a particular output of the Story,
which stitches together the content of Q scraps into a human-readable format
  * e.g. three different Renderings of the same story might be a one-sheet summary, a 12-page treatment, and the full script
  * Renderings are the thing actually exported from the app
