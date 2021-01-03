import { Injectable } from '@angular/core';
import {StorageService} from './storage.service';
import {Beat, IBeat} from '../protos';
import {epochMsToTimestamp, timestampToEpochMs} from './timestamp-helpers';
import {v4 as uuidv4} from 'uuid';

export interface BeatMapView {
  id: string;
  name: string;
  lastUpdated: number;
}

const ALL_BEAT_MAP_KEY = 'allBeatMap';
const BEAT_KEY_PREFIX = 'beat-';

@Injectable({
  providedIn: 'root'
})
export class BeatsService {

  constructor(private storageService: StorageService) { }

  private static getMapVersion(beat: IBeat): BeatMapView {
    return {
      id: beat.id,
      name: beat.synopsis,
      lastUpdated: timestampToEpochMs(beat.lastUpdated),
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
      structure: [],
      brainstorm: [],
    });

    await this.setBeat(newBeat, true, true);

    return uuid;
  }

  async deleteBeat(beatId: string): Promise<void> {
    await this.storageService.delete(
      BeatsService.getBeatKey(beatId)
    );

    const beatMap = await this.getBeatMap();
    beatMap.delete(beatId);
    await this.setBeatMap(beatMap);
  }

  async setBeat(beat: Beat, affectsMapView: boolean = false, affectsLastUpdated: boolean = true): Promise<void> {
    if (affectsLastUpdated) {
      beat.lastUpdated = epochMsToTimestamp(Date.now());
    }

    await this.storageService.set(
      BeatsService.getBeatKey(beat.id),
      Beat.encode(beat).finish(),
      true
    );

    if (affectsMapView) {
      const beatMap = await this.getBeatMap();
      beatMap.set(beat.id, BeatsService.getMapVersion(beat));
      await this.setBeatMap(beatMap);
    }
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
        BeatsService.getMapVersion(beat)
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
}
