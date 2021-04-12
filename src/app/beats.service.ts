import { Injectable } from '@angular/core';
import {StorageService} from './storage.service';
import {Beat, IBeat} from '../protos';
import {epochMsToTimestamp, timestampToEpochMs} from './timestamp-helpers';
import {v4 as uuidv4} from 'uuid';
import {TimelineBlock} from './timeline-chart/timeline-chart.component';
import TagReference = Beat.TagReference;

export interface BeatMapView {
  id: string;
  name: string;
  lastUpdated: number;
  parentBeats: string[]; // IDs of any beats which include this one in the structure or brainstorm
  intendedDurationMs: number;
  completeness: Beat.Completeness;
}

export interface BeatReadView {
  id: string;
  name: string;
  prose: string;
  showExpanded: boolean;
  completeness: Beat.Completeness;
}

const ALL_BEAT_MAP_KEY = 'allBeatMap';
const BEAT_KEY_PREFIX = 'beat-';

@Injectable({
  providedIn: 'root'
})
export class BeatsService {

  constructor(private storageService: StorageService) { }

  private static getInitialMapVersion(beat: IBeat): BeatMapView {
    return {
      id: beat.id,
      name: beat.synopsis,
      lastUpdated: timestampToEpochMs(beat.lastUpdated),
      parentBeats: [],
      intendedDurationMs: beat.intendedDurationMs,
      completeness: beat.completeness
    } as BeatMapView;
  }

  private static getBeatKey(uuid: string): string {
    return BEAT_KEY_PREFIX + uuid;
  }

  async setAllBeats(beats: IBeat[]): Promise<void> {
    await this.setBeatMap(
      this.generateBeatMap(beats)
    );

    for (const beat of beats) {
      await this.setBeat(beat as Beat, false, false);
    }
  }

  async createNewBeat(): Promise<string> {
    const uuid = uuidv4();

    const newBeat = Beat.create({
      id: uuid,
      synopsis: 'My new beat',
      prose: '',
      intendedDurationMs: 60 * 1000,
      structure: [],
      brainstorm: [],
    });

    await this.setBeat(newBeat, true, true);

    return uuid;
  }

  async deleteBeat(beatId: string): Promise<void> {
    const beat = await this.getBeat(beatId) as Beat;
    let beatMap = await this.getBeatMap();

    // Remove any references to this beat as child
    const parentIds = beatMap.get(beatId)?.parentBeats as string[];
    for (const parentId of parentIds) {
      const parentBeat = await this.getBeat(parentId) as Beat;
      parentBeat.brainstorm = parentBeat.brainstorm.filter(brainstormId => brainstormId !== beatId);
      parentBeat.structure = parentBeat.structure.filter(structureId => structureId !== beatId);
      await this.setBeat(parentBeat, true, true);
    }

    // Re-fetch the beat map, to pick up all the recent changes
    beatMap = await this.getBeatMap();

    // Remove this beat as "parent" in any children
    BeatsService.removeIdFromParents(
      beatMap,
      beatId,
      (beat.structure || [])
    );
    BeatsService.removeIdFromParents(
      beatMap,
      beatId,
      (beat.brainstorm || [])
    );
    beatMap.delete(beatId);
    await this.setBeatMap(beatMap);

    await this.storageService.delete(
      BeatsService.getBeatKey(beatId),
      true
    );
  }

  async setBeat(beat: Beat, affectsMapView: boolean = false, affectsLastUpdated: boolean = true): Promise<void> {
    if (affectsLastUpdated) {
      beat.lastUpdated = epochMsToTimestamp(Date.now());
    }

    if (affectsMapView) {
      const originalBeat = await this.getBeat(beat.id) as Beat;
      const beatMap = await this.getBeatMap();

      const originalBrainstorm = (originalBeat?.brainstorm || []);
      const originalStructure = (originalBeat?.structure || []);

      // Determine if there are any changes in the children
      if (!allStringsInBothArrays(beat.brainstorm, originalBrainstorm)
        || !allStringsInBothArrays(beat.structure, originalStructure)) {
        BeatsService.removeIdFromParents(
          beatMap,
          beat.id,
          originalBrainstorm
        );
        BeatsService.removeIdFromParents(
          beatMap,
          beat.id,
          originalStructure
        );

        BeatsService.addParentToChildren(
          beatMap,
          beat.id,
          beat.brainstorm
        );
        BeatsService.addParentToChildren(
          beatMap,
          beat.id,
          beat.structure
        );
      }

      const mapView = BeatsService.getInitialMapVersion(beat);
      mapView.parentBeats = beatMap.get(beat.id)?.parentBeats || [];

      beatMap.set(beat.id, mapView);
      await this.setBeatMap(beatMap);
    }

    await this.storageService.set(
      BeatsService.getBeatKey(beat.id),
      Beat.encode(beat).finish(),
      true
    );
  }

  async getBeat(uuid: string): Promise<Beat|null> {
    const fetchedData = (await this.storageService.get(BeatsService.getBeatKey(uuid))) as Uint8Array;

    if (!fetchedData) {
      console.error('Could not find beat: ' + uuid);
      return null;
    }

    return Beat.decode(
      fetchedData
    );
  }

  async getAllBeats(): Promise<Beat[]> {
    const beatMap = await this.getBeatMap();

    const allBeats: Beat[] = [];

    for (const uuid of beatMap.keys()) {
      const fetchedBeat = await this.getBeat(uuid);
      if (fetchedBeat != null) {
        allBeats.push(
          fetchedBeat
        );
      }
    }

    return allBeats;
  }

  private async setBeatMap(beatMap: Map<string, BeatMapView>): Promise<void> {
    await this.storageService.set(ALL_BEAT_MAP_KEY, beatMap, true);
  }

  private generateBeatMap(beats: IBeat[]): Map<string, BeatMapView> {
    const beatMap = new Map<string, BeatMapView>();

    beats.forEach((beat: IBeat) => {
      beatMap.set(
        beat.id as string,
        BeatsService.getInitialMapVersion(beat)
      );
    });

    // Set parent references
    beats.forEach((beat: IBeat) => {
      const id = beat.id as string;

      BeatsService.addParentToChildren(
        beatMap,
        id,
        (beat.brainstorm || [])
      );
      BeatsService.addParentToChildren(
        beatMap,
        id,
        (beat.structure || [])
      );
    });

    return beatMap;
  }

  async getBeatMap(): Promise<Map<string, BeatMapView>> {
    return (await this.storageService.get(ALL_BEAT_MAP_KEY) || new Map()) as Map<string, BeatMapView>;
  }

  subscribeToBeatMapView(handler: (newBeatMapView: Map<string, BeatMapView>) => void): string {
    return this.storageService.generateSubscription(ALL_BEAT_MAP_KEY, (fetchedValue) => {
      handler(fetchedValue || new Map<string, BeatMapView>());
    });
  }

  subscribeToBeat(beatId: string, handler: (newBeat: Beat|null) => void): string {
    return this.storageService.generateSubscription(
      BeatsService.getBeatKey(beatId),
      (fetchedValue) => {
        if (!fetchedValue) {
          // Beat no longer found, this could occur from being deleted in
          // another tab or component
          return handler(null);
        }

        handler(
          Beat.decode(
            fetchedValue as Uint8Array
          )
        );
      }
    );
  }

  cancelSubscription(subscription: string): void {
    this.storageService.cancelSubscription(subscription);
  }

  async fetchAncestorView(beatId: string): Promise<BeatMapView[][]> {
    const mapView = await this.getBeatMap();

    const ancestorViews = [[mapView.get(beatId) as BeatMapView]];

    let updateRequired = true;
    while (updateRequired) {
      updateRequired = false;

      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < ancestorViews.length; i++) {
        const lastLink = ancestorViews[i][ancestorViews[i].length - 1];
        if (lastLink.parentBeats.length === 0) {
          continue;
        }
        updateRequired = true;

        if (lastLink.parentBeats.length === 1) {
          ancestorViews[i].push(mapView.get(lastLink.parentBeats[0]) as BeatMapView);
        } else {
          // Multiple parents, let's split
          const currentChainStr = JSON.stringify(ancestorViews[i]);
          ancestorViews[i].push(mapView.get(lastLink.parentBeats[0]) as BeatMapView);
          for (let j = 1; j < lastLink.parentBeats.length; j++) {
            const newChain = JSON.parse(currentChainStr) as BeatMapView[];
            newChain.push(mapView.get(lastLink.parentBeats[j]) as BeatMapView);
            ancestorViews.push(newChain);
          }
        }
      }
    }

    for (let i = 0; i < ancestorViews.length; i++) {
      ancestorViews[i] = ancestorViews[i].reverse();
    }

    return ancestorViews;
  }

  async fetchTimelineView(beatId: string): Promise<TimelineBlock[]> {
    const timelineView: TimelineBlock[] = [];

    await this.appendTimelineView(beatId, timelineView, 0, 0);

    return timelineView.sort((a, b) => {
      return a.depth - b.depth;
    });
  }

  async appendTimelineView(
    beatId: string,
    currentTimelineView: TimelineBlock[],
    currentDepth: number,
    currentStartSec: number): Promise<void> {
    const beat = await this.getBeat(beatId) as Beat;

    if (!beat) {
      return;
    }

    const beatTimelineView = {
      id: beat.id,
      depth: currentDepth,
      row: 'Depth ' + currentDepth,
      label: beat.synopsis,
      startSec: currentStartSec,
      endSec: currentStartSec + (beat.intendedDurationMs / 1000),
      completeness: beat.completeness,
      tagReferences: beat.tagReferences as TagReference[]
    } as TimelineBlock;

    currentTimelineView.push(beatTimelineView);

    let offsetSec = 0;
    for (const childBeatId of beat.structure) {
      const childBeat = await this.getBeat(childBeatId) as Beat;
      await this.appendTimelineView(childBeatId, currentTimelineView, currentDepth + 1, offsetSec);
      offsetSec += childBeat.intendedDurationMs / 1000;
    }
  }

  async fetchReadView(beatId: string): Promise<BeatReadView[]> {
    const readView: BeatReadView[] = [];

    await this.appendReadView(beatId, readView);

    return readView;
  }

  async appendReadView(beatId: string, currentReadView: BeatReadView[]): Promise<void> {
    const beat = await this.getBeat(beatId) as Beat;

    if (!beat) {
      return;
    }

    const beatReadView = {
      id: beat.id,
      name: beat.synopsis,
      prose: beat.prose,
      showExpanded: (beat.structure.length === 0),
      completeness: beat.completeness
    } as BeatReadView;

    currentReadView.push(beatReadView);

    // Recurse through child beats
    for (const childBeat of beat.structure) {
      await this.appendReadView(childBeat, currentReadView);
    }
  }

  private static removeIdFromParents(beatMap: Map<string, BeatMapView>, id: string, children: string[]): void {
    children.forEach(childId => {
      const childBeat = beatMap.get(childId) as BeatMapView;
      childBeat.parentBeats = childBeat.parentBeats.filter(parentId => parentId !== id);
    });
  }

  private static addParentToChildren(beatMap: Map<string, BeatMapView>, id: string, children: string[]): void {
    children.forEach(childId => {
      const childBeat = beatMap.get(childId) as BeatMapView;
      childBeat.parentBeats.push(id);
    });
  }
}

function allStringsInBothArrays(array1: string[], array2: string[]): boolean {
  if (array1.length !== array2.length) {
    return false;
  }

  return array1.every((value) => {
    return array2.indexOf(value) >= 0;
  });
}
