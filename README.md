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

# Boilerplate from yeoman scaffolding README

This is the README for your extension "revision". After writing up a brief description, we recommend including the following sections.

## Features

Describe specific features of your extension including screenshots of your extension in action. Image paths are relative to this README file.

For example if there is an image subfolder under your extension project workspace:

\!\[feature X\]\(images/feature-x.png\)

> Tip: Many popular extensions utilize animations. This is an excellent way to show off your extension! We recommend short, focused animations that are easy to follow.

## Requirements

If you have any requirements or dependencies, add a section describing those and how to install and configure them.

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: enable/disable this extension
* `myExtension.thing`: set to `blah` to do something

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of ...

### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z.

-----------------------------------------------------------------------------------------------------------
## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

**Note:** You can author your README using Visual Studio Code.  Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux)
* Toggle preview (`Shift+CMD+V` on macOS or `Shift+Ctrl+V` on Windows and Linux)
* Press `Ctrl+Space` (Windows, Linux) or `Cmd+Space` (macOS) to see a list of Markdown snippets

### For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
