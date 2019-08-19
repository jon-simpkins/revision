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


## Which screens would make sense?

For starters, it seems like:

* Story list
    * Ability to create a new story
    * Ability to import existing story by pasting Google Doc link
    * Ability to select from list of stories
* Story details
    * See revision history of story
    * See list of available views of scraps
    * See list of available renders
* Scrap view
    * Rendering of N scraps
    * Links to other related views (e.g. views of related scraps)
* Scrap edit
    * Edit rendering of N scraps
    * Ideally, adjacent to the list of scrap views
    * Ideally, show some sort of sprint timer / completion button
