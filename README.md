# Revision

Revision is a tool to allow screenwriters to juggle projects at
different levels of completion, and help encourage incremental progress.

No more staring at a blank page: now you can chip away at the stories that you
know you want to write, bit by bit.

# Disclaimer
This is **not** an official Google product.

# What's the current phase of the project?

*sigh*

Ok, this is yet yet another rewrite (v5). There's a functional web app at

https://jon-simpkins.github.io/revision/

but this most recent rewrite is focused on instead implementing as an extension for VS Code, drawing inspiration from [Better Fountain](https://github.com/piersdeseilligny/betterfountain).

## Why a VS Code extension?

There's a ton of base functionality that can be leveraged from VS Code. It's a great text editor, it **already** has support for all the window mangament / contextual actions / hotkey stuff that would be good for future iterations, it allows for remote collaboration, and the model that we've kind of landed on here is one where all data is just stored locally anyway, so filestorage sounds great.

There's also a ton of interesting stuff to explore, I think, regarding using different file types for different aspects of the story, and using the folder structure to represent each "scrap":

``` bash
my-story/
    first-act/ # Folder represents the 
        script.fountain # The stuff that renders into the final script
        notes.md # Scratchpad, notes and brainstorming stuff for just this part of the script
        metadata.write # Metadata about the scrap,
                       # stuff like "intended duration"
                       # or "progress level" / "todos"
        generated_stats # Auto-generated file, could be used to track stuff like
                        # list of actors / characters / locations for faster lookup
    script.fountain # Includes a reference to "first-act" as a scrap, which pulls in that scrap
    ... # same file structure as first-act/
my-other-story/
    script.fountain # Might include a reference to "../first-act"
```
