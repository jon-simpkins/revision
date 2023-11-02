# Project Philosophy

I first got approval to work on this open-source project on Aug 5, 2019, and more than 4 years into the project
(and after a lengthy hiatus from me contributing to it), I wanted to take a step back and restate the intent.

I'm going to describe what Revision does, not in the current state, but in a hypothetical future state where I consider
it to be complete. The goal of the exercise is to lay out some key goals of the project, against which the project
can be evaluated as it's rebuilt for the (by my count) 5th time.

## 0) Revision is a software tool for screenwriting

I like writing, and in particular, I like screenwriting as a hobby. I'm a software engineer by profession,
this project  is the overlap in that Venn diagram.

## 1) Revision allows writers to see the script in the macro and micro, and phases in-between

In longer works, it's important to be able to see and work with both the larger structure and the smaller details,
and even something as small as a 90 page script is too big to keep in your head all at once.

Lots of screenwriting books and techniques propose rules or guides for macro structure, either as a planning step
("The first act should be ~25 pages long") or as a diagnostic step ("Oh crap, my first act is 45 pages right now").
Over the course of writing and revising a longer work, a writer will likely go back and forth between the birds-eye
view of the script or of a sequence, and the detailed view of individual scenes or moments, and Revision needs to
allow for that to happen (and for changes in the micro to be visible when zooming out to the macro).

## 2) Revision makes it easy to write a script incrementally and avoid writer's block

I've been told that when you're facing writer's block, one solution is to grab the next-easiest scene
or moment and just write that, knowing that you'll get to the rest of it eventually.

The first feature-length screenplay I ever finished, I would break sequences down in outline form into 1-3 page chunks
(e.g. "they steal the rover and race to the rocket"),
and then each writing session, I would grab one of these tasks and write those 1-3 pages in a blank document.
This also helped with another symptom of writer's block for me, which is the tendency to re-read completed parts of the
script instead of continuing to write.

Revision needs to make it easy to be task-oriented about writing, and help writers set aside distractions or things that
muddy up the view of the next available tasks.

## 3) Revision allows for easy experimenting within or across projects

The name "Revision" for the project is very intentional, the idea is not to focus on building a single perfect draft, but
instead to make it easy to explore and evolve a script over time.

If have an idea for a scene or a sub-plot and you want
to figure out the surrounding script later, Revision needs to allow you to build these fragments in isolation, and to graft
them into something more complete later.

If you have a script or a sequence that you want to make a major change to, there should be a non-destructive way for you to
try out that major change, without needing to fork the entire script into a new document.

## 4) Revision is free, does not depend on any centrally-maintained infrastructure, and can be used off-grid

If you have a laptop with power, and you're 100 miles from the nearest internet signal, you should be able to write as effectively
as if you had a typewriter and a stack of paper. And if you have access to a computer that you could install Blender on, you
should be able to install Revision for free and use it indefinitely.

## 5) Revision makes it seamless to integrate different metadata documents with the core "writing" documents

Sometimes when you're writing, it can be helpful to check with reference material (e.g. notes, scratchpads, character sketches,
images or videos or sound bites). Sometimes when you're revising, it can be helpful to look at reports about the current state of
what you're writing (e.g. a chart showing where in the current timeline the big moments are, a table showing how "rough-draft-y"
each scene is in a sequence, a condensed view of just the moments / lines for a certain character or a certain location).

In particular, it's important that Revision lets you associate or calculate metadata from each fragment of writing, lets you
generate reports from the metadata of a collection of these fragments, and that it's easy to both keep this metadata in sync and to
get this metadata the hell out of the way when you want to focus and just write.


