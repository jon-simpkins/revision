import { Story, Workspace } from ".";
import { generateDiffToSave, applyDiffs } from "./serialization";

import { setCurrentlyMocking, resetMockCount } from './generateUuid';

import { fullStory001, diff001, diff002 } from "./data";

describe('generateDiffToSave', () => {
    beforeEach(() => {
        setCurrentlyMocking(true);
        resetMockCount();
    });

    afterEach(() => {
        setCurrentlyMocking(false);
    });

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
        story2.logLine = 'a movie';

        const diff = generateDiffToSave(
            story1.toString(),
            story2.toString()
        );

        expect(diff).toEqual(diff001);
    });

    it('Correctly generates diff for single top-level no-change', () => {
        const story1 = new Story();
        story1.logLine = 'a movie';
        const story2 = new Story();
        story2.logLine = 'a movie';

        const diff = generateDiffToSave(
            story1.toString(),
            story2.toString()
        );

        expect(!!diff).toEqual(false);
    });

    it('Correctly generates diff for nested change', () => {
        const workspace01 = new Workspace();
        const storyId = workspace01.buildNewStory();

        workspace01.stories.get(storyId).similarMovieIds.push('abc123');

        const workspace02 = Workspace.parseFromString(workspace01.toString());

        workspace02.stories.get(storyId).similarMovieIds.push('def456');
        workspace02.buildNewSimilarMovie();

        const diff = generateDiffToSave(
            workspace01.toString(),
            workspace02.toString()
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
});
