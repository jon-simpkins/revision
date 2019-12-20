# New Date Structures

As of Dec 2019, this is where we're putting the new data specification code, and new code to serialize / deserialize. It's frustrating, but [here](https://github.com/jon-simpkins/revision/commit/0c8111d7f6d836bac9b9b250fa36cbfc3ef6cb1a#diff-56338fb28a8db72a6cc0f2574c150355), we realized that our approach to storing the data isn't going to scale the way we need it to, and it requires taking a step sideways to address it.

In the meantime, `ng test` is our friend, as we rely mostly on unit testing and small scaffolding as we build up a baseline experience again.