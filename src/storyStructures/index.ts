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
        return `https://www.themoviedb.org/search/movie?query=${encodeURIComponent(this.getTitle())}`;
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

export class PlotTemplateBeat {
    oneLiner: string; // Slug for beat
    description: string; // Description for what the beat should entail
    durationMin: number; // Duration of beat in minutes
}

export class PlotTemplate {
    id: string; // uuid of template
    oneLiner: string; // Slug for template
    startOffset = 0; // Convenience: allow a template to have an initial offset, so that you could just type in "what time shows on the movie when X happens"
    beats: PlotTemplateBeat[] = [];

    getOneLiner(): string {
        return this.oneLiner || 'New Template';
    }

    getBeatOneLiner(idx: number) {
        if (idx >= this.beats.length) {
            throw new Error('Beat index out of bounds!');
        }

        return this.beats[idx].oneLiner || '';
    }

    setBeatOneLiner(idx: number, newValue: string) {
        if (idx >= this.beats.length) {
            throw new Error('Beat index out of bounds!');
        }

        this.beats[idx].oneLiner = newValue;
    }

    getBeatDurationMin(idx: number) {
        if (idx >= this.beats.length) {
            throw new Error('Beat index out of bounds!');
        }

        return this.beats[idx].durationMin;
    }

    setBeatDurationMin(idx: number, newDurationMin: number) {
        if (idx >= this.beats.length) {
            throw new Error('Beat index out of bounds!');
        }

        this.beats[idx].durationMin = newDurationMin;
    }

    getBeatStartMin(idx: number): number {
        let sum = this.startOffset;
        for (let i = 0; i < idx; i++) {
            sum += this.beats[i].durationMin;
        }

        return sum;
    }

    setBeatStartMin(idx: number, newStartMin: number) {
        const oldBeatStartMin = this.getBeatStartMin(idx);

        const necessaryStartOffset = newStartMin - oldBeatStartMin;
        this.startOffset += necessaryStartOffset;
    }

    getBeatEndMin(idx: number): number {
        let sum = this.startOffset;
        for (let i = 0; i <= idx; i++) {
            sum += this.beats[i].durationMin;
        }

        return sum;
    }

    setBeatEndMin(idx: number, newEndMin: number) {
        const oldBeatEndMin = this.getBeatEndMin(idx);

        const necessaryOffset = newEndMin - oldBeatEndMin;

        const newDuration = this.getBeatDurationMin(idx) + necessaryOffset;
        if (newDuration > 0) {
            this.setBeatDurationMin(idx, newDuration);
        } else {
            const newStartMin = this.getBeatStartMin(idx) + necessaryOffset;
            this.setBeatStartMin(idx, newStartMin);
        }
    }

    deleteBeat(idx: number) {
        if (idx >= this.beats.length) {
            throw new Error('Beat index out of bounds!');
        }

        this.beats.splice(idx, 1);
    }

    getTotalDurationMin(): number {
        let duration = 0;
        this.beats.forEach(beat => {
            duration += beat.durationMin;
        });
        return duration;
    }

    toString(): string {
        return JSON.stringify(this);
    }

    static parseFromString(serialized: string): PlotTemplate {
        const proxyObj = JSON.parse(serialized);
        const template: PlotTemplate = Object.assign(
            new PlotTemplate(),
            proxyObj
        );

        template.beats = proxyObj.beats.map(beatJson => {
            return Object.assign(
                new PlotTemplateBeat(),
                beatJson
            );
        });

        return template;
    }
}

/**
 * Base class for a plot structure element
 * 
 * A plot structure element could be a scene, or a sequence, or the whole plot
 */
export class PlotStructureElement {
    id: string; // uuid of element
    parentId: string | null; // uuid of parent structure element (if present)
    templateId: string; // uuid of template on which this element is based
    oneLiner: string; // Single-line slug for element
    summaryRawText: string; // Plaintext summary of element
    durationMin: number; // Duration of element in minutes
    scriptRawText: string; // Optional, script content of element
    subStructureElements: string[] = []; // Optional, ordered array of ids of child structure elements

    characterAppearances: string[] = []; // Optional, ordered array of ids for characters that appear in this sequence

    getOneLiner(): string {
        return this.oneLiner || 'New Structure Element';
    }

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
            thisElement.rescaleToDurationMin(thisElement.getDurationMin() * (newDuration / initialSum), elementMap);
        });
    }

    anyUnassignedBeats(): boolean {
        let anyUnassignedBeats = this.subStructureElements.length === 0;

        this.subStructureElements.forEach(beatId => {
            if (!beatId) {
                anyUnassignedBeats = true;
            }
        });

        return anyUnassignedBeats;
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

export class Character {
    id: string;
    name: string;

    getName(): string {
        return this.name || '';
    }

    toString(): string {
        return JSON.stringify(this);
    }

    static parseFromString(serialized: string): Character {
        return Object.assign(
            new Character(),
            JSON.parse(serialized)
        );
    }
}

// Base class for a particular story
export class Story {
    logLine: string;
    similarMovieIds: string[] = []; // Array of ids referencing entries in the workspace.similarMovies map
    runtimeMin: number;

    structureElements: Map<string, PlotStructureElement> = new Map<string, PlotStructureElement>();
    plotElementId: string; // Structure element id used to represent everything "in" the plot
    characters: Map<string, Character> = new Map<string, Character>();

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
        parseMap(proxyObj, story, PlotStructureElement.parseFromString, 'structureElements');

        story.characters = new Map<string, Character>();
        parseMap(proxyObj, story, Character.parseFromString, 'characters');

        return story;
    }

    buildNewStructureElement(): string {
        const newId: string = generateUuid();
        const newStructure = new PlotStructureElement();
        newStructure.id = newId;
        this.structureElements.set(newId, newStructure);

        return newId;
    }

    buildNewCharacter(): string {
        const newId: string = generateUuid();
        const newCharacter = new Character();
        newCharacter.id = newId;
        this.characters.set(newId, newCharacter);

        return newId;
    }

    setNewRuntimeMin(newRuntimeMin: number): void {
        this.runtimeMin = newRuntimeMin;
        if (!!this.plotElementId) {
            this.rescalePlotElement(this.plotElementId, newRuntimeMin);
        }
    }

    rescalePlotElement(plotElementId: string, newRuntimeMin: number): void {
        const oldRuntimeMin = this.structureElements.get(plotElementId).durationMin;
        const scaleFactor = newRuntimeMin / oldRuntimeMin;

        this.structureElements.get(plotElementId).durationMin = newRuntimeMin;

        this.structureElements.get(plotElementId).subStructureElements.forEach((beatId) => {
            if (!!beatId) {
                this.rescalePlotElement(beatId, scaleFactor * this.structureElements.get(beatId).durationMin);
            }
        });
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
    structureTemplates: Map<string, PlotTemplate> = new Map<string, PlotTemplate>();
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
        const newStructure = new PlotTemplate();
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
    validate(): (string | boolean) {
        let validationError: (string | boolean) = false;
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
        parseMap(proxyObj, workspace, SimilarMovie.parseFromString, 'similarMovies');

        workspace.structureTemplates = new Map<string, PlotTemplate>();
        parseMap(proxyObj, workspace, PlotTemplate.parseFromString, 'structureTemplates');

        workspace.stories = new Map<string, Story>();
        parseMap(proxyObj, workspace, Story.parseFromString, 'stories');

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

function parseMap(proxyObj: Object, target: any, parseFunction: (str: string) => any, key: string) {
    if (!proxyObj[key]) {
        return;
    }

    Object.keys(proxyObj[key]).forEach(subKey => {
        target[key].set(
            subKey,
            parseFunction(
                JSON.stringify(proxyObj[key][subKey])
            )
        );
    })
}
