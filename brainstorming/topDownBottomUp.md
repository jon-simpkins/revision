# On Top-Down and Bottom-Up Structure

We've started down this path of allowing users to specify story structure, where a structure has a few components:
  * Duration. The duration sets a constraint on the whole structure, same as choosing to paint on a canvas of specific dimensions
  * Ordered sequence of structure "blocks", where each block contains:
    * Duration: each block claims some of the parent duration, and the parent duration must be fully claimed
    * Summary: a freetext summary of what the block represents
    * Content
    
Now, the `content` bit is interesting: if you allow the content to be an actual scrap of screenplay writing, then it's easy enough to
render the final screenplay from this structure (just concat all the scraps in the corresponding block order), and it also makes it
easy to break the writing task up into small chunks (one scrap per block).

BUT, the content of a block can also be another structure element, which allows the structure to fan out like a tree, the leaves of the
tree being the eventual writing scraps.

```text
The top-down approach starts with the top-most structure definition,
and recursively defines structure elements until the blocks are
small enough to allow easy writing.
```

On the other hand, I can imagine a situation where a writer has a great idea for a scene, or part of a sequence,
and no idea what the surrounding structure would be. So it would also make sense to allow a bottom-up creation,
where sub-structures and writing scraps are allowed to be created out in the ether (with no top-level structure referencing them),
and then the "structure" creation is the definition of a higher-order structure and the assignment of completed
scraps to the leaf nodes of that structure (also, the generation of the summary at each stage, to help synthesis).

```text
The bottom-up approach starts with writing individual scenes and
composing them in sequences, then figuring out how to position those
sequences within the broader structure which can then be completed
in a top-down approach.
```

The most valuable thing, I suspect, will be to allow both: to allow a user to start to define the overall structure,
get excited to dive into one scene and just write it, then take a step back and position that writing within the larger
picture and start to fill in the gaps. Back and forth between top-down and bottom-up.
