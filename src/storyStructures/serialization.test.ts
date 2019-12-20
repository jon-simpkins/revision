import { Story, SimilarMovie } from ".";
import { generateDiffToSave, applyDiffs } from "./serialization";

import { fullStory001, diff001, diff002 } from "./data";

describe('generateDiffToSave', () => {
    it('Correctly generates diff for no diff', () => {
        const story1 = new Story();
        const story2 = new Story();

        const diff = generateDiffToSave(
            story1.toString(),
            story2.toString()
        );

        expect(!!diff).toEqual(false);
    });

    it('Correctly generates diff for single top-level change', () => {
        const story1 = new Story();
        const story2 = new Story();
        story2.id = 'abc123';

        const diff = generateDiffToSave(
            story1.toString(),
            story2.toString()
        );

        expect(diff).toEqual(diff001);
    });

    it('Correctly generates diff for single top-level no-change', () => {
        const story1 = new Story();
        story1.id = 'abc123';
        const story2 = new Story();
        story2.id = 'abc123';

        const diff = generateDiffToSave(
            story1.toString(),
            story2.toString()
        );

        expect(!!diff).toEqual(false);
    });

    it('Correctly generates diff for nested change', () => {
        const story1 = new Story();
        story1.logLine = 'Log Line 1';
        const story2 = new Story();
        story2.logLine = 'Log Line 2';

        const similarMovie1 = new SimilarMovie();
        similarMovie1.title = 'Tenet';
        similarMovie1.runtimeMin = 123;
        story2.similarMovies = [similarMovie1];

        const diff = generateDiffToSave(
            story1.toString(),
            story2.toString()
        );

        expect(diff).toEqual(diff002);
    });

    it('Correctly applies the difference', () => {
        const oldStory = Story.parseFromString(fullStory001);

        const fullDiff = generateDiffToSave(
            (new Story()).toString(),
            oldStory.toString()
        );

        const reconstructedStoryStr = JSON.stringify(
            applyDiffs({}, JSON.parse(fullDiff))
        );

        const reconstructionDiff = generateDiffToSave(
            fullStory001,
            reconstructedStoryStr
        );

        expect(!!reconstructionDiff).toEqual(false);
    });

    it('Correctly computes nested difference', () => {
        const story1 = new Story();

        const similarMovie1 = new SimilarMovie();
        similarMovie1.title = 'Tenet';

        story1.similarMovies.push(similarMovie1);

        const serialized01 = story1.toString();

        story1.similarMovies[0].runtimeMin = 140;

        const serialized02 = story1.toString();

        const diff = generateDiffToSave(
            serialized01,
            serialized02
        );

        console.log(diff);
    })
});
