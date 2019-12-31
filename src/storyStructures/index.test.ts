import { Story, SimilarMovie, Workspace, HistoryEntry } from ".";
import { fullStory001, fullWorkspace001 } from "./data";

import { setCurrentlyMocking, resetMockCount, generateUuid } from './generateUuid';

describe('Generate Uuid', () => {
    it('Generates unique values', () => {
        expect(generateUuid()).not.toEqual(generateUuid());
    })
})

describe('Story Structures', () => {
    beforeEach(() => {
        setCurrentlyMocking(true);
        resetMockCount();
    });

    afterEach(() => {
        setCurrentlyMocking(false);
    });

    it('Serializes an empty story correctly', () => {
        const blankStory = new Story();

        const serialized = blankStory.toString();

        expect(serialized).toEqual('{"similarMovieIds":[]}');
    });

    it('Serializes a full story correctly', () => {
        const newStory = new Story();
        newStory.logLine = 'A movie! That\'s full of stuff!';
        newStory.runtimeMin = 100;

        newStory.similarMovieIds = ['def456', 'ghi789'];

        const serialized = newStory.toString();

        expect(serialized).toEqual(fullStory001);

        const deserialized = Story.parseFromString(serialized);

        expect(deserialized.runtimeMin).toEqual(100);

        expect(deserialized.similarMovieIds[1]).toEqual('ghi789');
    });

    it('Serializes a workspace correctly', () => {
        const workspace = new Workspace();

        const newStoryId = workspace.buildNewStory();
        workspace.stories.get(newStoryId).logLine = 'My new log line';

        const newSimilarMovieId = workspace.buildNewSimilarMovie();
        workspace.similarMovies.get(newSimilarMovieId).title = 'Tenet';
        workspace.similarMovies.get(newSimilarMovieId).runtimeMin = 123;

        workspace.stories.get(newStoryId).similarMovieIds.push(newSimilarMovieId);

        const newHistoryEntry = new HistoryEntry();
        newHistoryEntry.userEmail = 'jon.simpkins@gmail.com';
        newHistoryEntry.editStartEpochMs = 12345;
        newHistoryEntry.editEndEpochMs = 12346;
        newHistoryEntry.msSpendAnalyzing = 1000;

        workspace.history.push(newHistoryEntry);

        const serialized = workspace.toString();

        expect(serialized).toEqual(fullWorkspace001);

        const deserialized = Workspace.parseFromString(serialized);

        expect(deserialized.stories.get('uuid1').logLine).toEqual('My new log line');
        expect(deserialized.similarMovies.get('uuid2').title).toEqual('Tenet');

        expect(deserialized.history[0].userEmail).toEqual('jon.simpkins@gmail.com');

        const serialized2 = deserialized.toString();
        expect(serialized).toEqual(serialized2);
    });
});