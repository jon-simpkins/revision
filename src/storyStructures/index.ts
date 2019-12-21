
// Base class for an existing movie out in the world
export class SimilarMovie {
    title: string;
    runtimeMin: number;
}

// Base class for a particular story
export class Story {
    id: string;

    logLine: string;
    similarMovies: SimilarMovie[] = [];
    runtimeMin: number;

    toString(): string {
        return JSON.stringify(this);
    }

    static parseFromString(serialized: string): Story {
        const story: Story = Object.assign(
            new Story(),
            JSON.parse(serialized)
        );

        // Deal with nested type for SimilarMovie
        story.similarMovies = story.similarMovies.map(similarMovie => {
            return Object.assign(
                new SimilarMovie(),
                similarMovie
            );
        });

        return story;
    }
}
