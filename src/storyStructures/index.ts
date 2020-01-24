import { generateUuid } from './generateUuid';

// Base class for an existing movie out in the world
export class SimilarMovie {
    title: string;
    runtimeMin: number;
    id: string;
    tmbdUrl: string;

    getTitle(): string {
        return this.title ? this.title : 'New Movie';
    }

    getRuntimeStr(): string {
        return this.runtimeMin ? `${this.runtimeMin} min` : '';
    }

    getTmdbSearchUrl(): string {
        return `https://www.themoviedb.org/search?query=${encodeURIComponent(this.getTitle())}`;
    }

    getTmdbUrl(): string {
        return this.tmbdUrl ? this.tmbdUrl : this.getTmdbSearchUrl();
    }

    getNeedsCompletion(): boolean {
        return !this.title || !this.runtimeMin || !this.tmbdUrl;
    }

    toString(): string {
        return JSON.stringify(this);
    }

    static parseFromString(serialized: string): SimilarMovie {
        const story: SimilarMovie = Object.assign(
            new SimilarMovie(),
            JSON.parse(serialized)
        );

        return story;
    }
}

/**
 * Base class for a plot structure element
 * 
 * A plot structure element could be a scene, or a sequence, or the whole plot
 */
export class PlotStructureElement {
    id: string; // uuid of element
    oneLiner: string; // Single-line slug for element
    summaryRawText: string; // Plaintext summary of element
    durationMin: number; // Duration of element in minutes
    scriptRawText: string; // Optional, script content of element
    subStructureElements: string[] = []; // Optional, ordered array of ids of child structure elements

    getDurationMin(): number {
        return this.durationMin;
    }

    setDurationMin(newDuration: number): void {
        this.durationMin = newDuration;
    }

    // Allows setting duration of an element as well as recursively setting the duration of all child elements
    rescaleToDurationMin(newDuration: number, elementMap: Map<string, PlotStructureElement>): void {
        this.durationMin = newDuration;
        if (!this.subStructureElements.length) {
            return;
        }
        
        let initialSum = 0;
        this.subStructureElements.forEach(elementId => {
            initialSum += elementMap.get(elementId).getDurationMin();
        });
        this.subStructureElements.forEach(elementId => {
            const thisElement = elementMap.get(elementId);
            thisElement.rescaleToDurationMin( thisElement.getDurationMin() * (newDuration / initialSum) , elementMap);
        });
    }

    toString(): string {
        return JSON.stringify(this);
    }

    static parseFromString(serialized: string): PlotStructureElement {
        const element: PlotStructureElement = Object.assign(
            new PlotStructureElement(),
            JSON.parse(serialized)
        );

        return element;
    }
}

// Base class for a particular story
export class Story {
    logLine: string;
    similarMovieIds: string[] = []; // Array of ids referencing entries in the workspace.similarMovies map
    runtimeMin: number;

    structureElements: Map<string, PlotStructureElement> = new Map<string, PlotStructureElement>();
    plotElementId: string; // Structure element id used to represent everything "in" the plot

    toString(): string {
        const thisProxy = JSON.parse(JSON.stringify(this));
        thisProxy.structureElements = jsonifyMap(this.structureElements);
        return JSON.stringify(thisProxy);
    }

    static parseFromString(serialized: string): Story {
        const proxyObj = JSON.parse(serialized);
        const story: Story = Object.assign(
            new Story(),
            proxyObj
        );

        story.structureElements = new Map<string, PlotStructureElement>();
        Object.keys(proxyObj.structureElements).forEach(key => {
            story.structureElements.set(
                key,
                PlotStructureElement.parseFromString(
                    JSON.stringify(proxyObj.structureElements[key])
                )
            );
        });

        return story;
    }

    buildNewStructureElement(): string {
        const newId: string = generateUuid();
        const newStructure = new PlotStructureElement();
        newStructure.id = newId;
        this.structureElements.set(newId, newStructure);

        return newId;
    }
    
    hasContentToShow(): boolean {
        if (!!this.logLine) {
            return true;
        }
        if (!!this.similarMovieIds.length) {
            return true;
        }
        if (!!this.runtimeMin) {
            return true;
        }

        return false;
    }
}

export class HistoryEntry {
    userEmail: string;
    editStartEpochMs: number;
    editEndEpochMs: number;

    toString(): string {
        return JSON.stringify(this);
    }

    static parseFromString(serialized: string): HistoryEntry {
        const historyEntry: HistoryEntry = Object.assign(
            new HistoryEntry(),
            JSON.parse(serialized)
        );

        return historyEntry;
    }
}

// Class for the entire writing workspace (the stuff all represented in one giant Google Doc for a writing group)
export class Workspace {

    similarMovies: Map<string, SimilarMovie> = new Map<string, SimilarMovie>();
    structureTemplates: Map<string, PlotStructureElement> = new Map<string, PlotStructureElement>();
    stories: Map<string, Story> = new Map<string, Story>();
    history: HistoryEntry[] = [];

    // Create a new story, and return the id of it
    buildNewStory(): string {
        const newId: string = generateUuid();
        const newStory = new Story();
        this.stories.set(newId, newStory);

        return newId;
    }

    buildNewStructureTemplate(): string {
        const newId: string = generateUuid();
        const newStructure = new PlotStructureElement();
        newStructure.id = newId;
        this.structureTemplates.set(newId, newStructure);

        return newId;
    }

    buildNewSimilarMovie(): string {
        const newId: string = generateUuid();
        const newSimilarMovie = new SimilarMovie();
        newSimilarMovie.id = newId;
        this.similarMovies.set(newId, newSimilarMovie);

        return newId;
    }

    /**
     * Check for the integrity of the workspace
     */
    validate(): (string|boolean) {
        let validationError: (string|boolean) = false;
        this.stories.forEach((story: Story, storyId: string) => {
            story.similarMovieIds.forEach((similarMovieId: string) => {
                // Check to make sure the referenced similarMovieId exists
                if (!this.similarMovies.has(similarMovieId)) {
                    validationError = `Story ${storyId} references non-existent similar movie ${similarMovieId}`;
                }
            });
        });

        return validationError;
    }

    toString(): string {
        const thisProxy = JSON.parse(JSON.stringify(this));
        thisProxy.stories = jsonifyMap(this.stories);
        thisProxy.similarMovies = jsonifyMap(this.similarMovies);
        thisProxy.structureTemplates = jsonifyMap(this.structureTemplates);
        thisProxy.history = this.history.map(entry => JSON.parse(entry.toString()));

        return JSON.stringify(thisProxy);
    }

    static parseFromString(serialized: string): Workspace {
        const proxyObj = JSON.parse(serialized);
        const workspace: Workspace = Object.assign(
            new Workspace(),
            proxyObj
        );

        workspace.similarMovies = new Map<string, SimilarMovie>();
        Object.keys(proxyObj.similarMovies).forEach(key => {
            workspace.similarMovies.set(
                key,
                SimilarMovie.parseFromString(
                    JSON.stringify(proxyObj.similarMovies[key])
                )
            );
        });

        workspace.structureTemplates = new Map<string, PlotStructureElement>();
        Object.keys(proxyObj.structureTemplates).forEach(key => {
            workspace.structureTemplates.set(
                key,
                PlotStructureElement.parseFromString(
                    JSON.stringify(proxyObj.structureTemplates[key])
                )
            );
        });

        workspace.stories = new Map<string, Story>();
        Object.keys(proxyObj.stories).forEach(key => {
            workspace.stories.set(
                key,
                Story.parseFromString(
                    JSON.stringify(proxyObj.stories[key])
                )
            );
        });

        workspace.history = proxyObj.history.map(entry => HistoryEntry.parseFromString(JSON.stringify(entry)));

        return workspace;
    }

}


function jsonifyMap(map: Map<string, any>): Object {
    const proxyObj = {};
    map.forEach((value: any, key: string) => {
        proxyObj[key] = JSON.parse(value.toString());
    });

    return proxyObj;
}
