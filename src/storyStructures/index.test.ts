import { Story, SimilarMovie } from ".";
import { fullStory001 } from "./data";

describe('Story Structures', () => {
    it('Serializes an empty story correctly', () => {
        const blankStory = new Story();

        const serialized = blankStory.toString();

        expect(serialized).toEqual('{"similarMovies":[]}');
    });

    it('Serializes a full story correctly', () => {
        const newStory = new Story();
        newStory.id = 'abc123';
        newStory.logLine = 'A movie! That\'s full of stuff!';
        newStory.runtimeMin = 100;

        let similarMovie1 = new SimilarMovie();
        similarMovie1.title = 'Tenet';
        similarMovie1.runtimeMin = 145;

        let similarMovie2 = new SimilarMovie();
        similarMovie2.title = 'The Grinch';
        similarMovie2.runtimeMin = 90;

        newStory.similarMovies = [similarMovie1, similarMovie2];

        const serialized = newStory.toString();

        expect(serialized).toEqual(fullStory001);

        const deserialized = Story.parseFromString(serialized);

        expect(deserialized.id).toEqual('abc123');
        expect(deserialized.runtimeMin).toEqual(100);

        expect(deserialized.similarMovies[1] instanceof SimilarMovie).toEqual(true);
        expect(deserialized.similarMovies[0].title).toEqual('Tenet');
        expect(deserialized.similarMovies[1].runtimeMin).toEqual(90);
    });
});
