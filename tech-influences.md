# Tech Influences

This is just a brainstorm doc, containing all the prior art I can think of that this project either builds upon or is influenced by.

## [LaTeX](https://www.latex-project.org/)

I used LaTeX extensively in grad school, and it was a phenomenal writing tool in a few different ways:

* It separates writing content from writing presentation. You can write a journal article, agnostic of where it's going to be published,
and then apply a journal-specific set of formatting rules later to generate something that matches the intended style.

* It lets you break up very large documents into smaller manageable files. When I was working on a book chapter or a full dissertation,
there was a parent document for "the whole thing" that mostly just contained references to child documents in the order they should appear,
and those in turn could reference smaller constituent docs. If you wanted to remove a section or rearrange chapters, you just moved the references
or commented them out, rather than moving the contents of that section or chapters.

* It lets you reference common metadata from multiple works. I could have a giant library of referenced works, and my bibliographies in Article A
and Dissertation B could both reference common entries library without me having to re-enter all the bibliography details in each separate work

## [Fountain](https://fountain.io/)

The Fountain spec is a brilliant markdown syntax for screenwriting, and this project would be one of many, many open-source projects that
are based on Fountain.

Leveraging the Fountain format for exporting a final script also lets folks leverage other established tools in conjunction with Revision as we
build up functionality.

I suspect that a key part of Revision will be layering in additonal syntax to Fountain files (which is ignored by other Fountain-supporting tools),
and by leveraging adjacent metadata files.

## [Bazel](https://bazel.build/)

I can't overstate how much my day-to-day depends on this build system, and I really like the paradigm of having explicit smaller build targets that
are dependent on other explicit smaller build targets + some specific files. For a screenwriting audience I would expect these build files / definitions
to need to be managed through a simpler UI, but having the UI generate or maintain build files that are then used to actually generate the cool
outputs seems like a pattern that would be easier to layer other tools on later.

## [Git](https://git-scm.com/)

When it comes to the aspect of change management and non-destructively allowing alternative versions or merging of different contributions, it would
seem silly to try and re-invent that functionality. However, the UI treatement to make Git management more approachable seems necessary.

## [Better Fountain](https://marketplace.visualstudio.com/items?itemName=piersdeseilligny.betterfountain)

There are some key benefits of "[VS Code](https://code.visualstudio.com/) extension for screenwriting" that this project really highlights that
VS Code already supports great text editing, including customization and online collaboration. Revision as a VS Code extension would clearly
be based on the learnings from Better Fountain, and it would be good to figure out how best to not duplicate efforts.
