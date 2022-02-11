import {createSlice, Middleware, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {IScrap, Scrap} from '../../protos_v2';
import {addScrapToStorage, clearScrapFromStorage, fetchInitialStateFromStorage, writeScrap} from './scrapListPersistence';
import WritingHistory = Scrap.WritingHistory;
import {fetchParsedContentBlocksForScrap} from '../utils/fetchParsedContentBlocksForScrap';
import {parseTimeline} from '../timeline/timelineParsing';

export interface ScrapMap {
  [key: string]: Scrap;
}

export interface ScrapMapInState {
  [key: string]: IScrap
}

interface ScrapListInState {
  scrapList: {
    scrapMap: ScrapMapInState
  }
}

const initialState = fetchInitialStateFromStorage();

const actionPrefix = 'scrapList';

const ScrapListSlice = createSlice({
  name: actionPrefix,
  initialState,
  reducers: {
    createScrap(state, action: PayloadAction<IScrap>) {
      state.scrapMap[action.payload.id as string] = action.payload;
    },
    updateScrap(state, action: PayloadAction<IScrap>) {
      const updatedScrap = action.payload;
      updatedScrap.writingHistory = updatedScrap.writingHistory || [];

      const writingHistory = updatedScrap.writingHistory;
      let lastUpdatedMinutesEpoch = 0;
      if (writingHistory.length) {
        lastUpdatedMinutesEpoch = writingHistory[writingHistory.length - 1].minutesSinceEpoch as number;
      }
      const newMinutesSinceEpoch = Math.floor(Date.now() / 60000);
      if (newMinutesSinceEpoch - lastUpdatedMinutesEpoch > 5) {
        // Need to update or create new entry
        const parsedTimelineBlocks = fetchParsedContentBlocksForScrap(
            updatedScrap.id as string,
            [],
            state.scrapMap as ScrapMap
        );

        const parsedTimeline = parseTimeline(parsedTimelineBlocks, state.scrapMap as ScrapMap);

        const newDurationSec = Math.floor(parsedTimeline.totalCompletedSec);

        const newHistoryEntry = {
          minutesSinceEpoch: newMinutesSinceEpoch,
          actualDurationSec: newDurationSec,
        } as WritingHistory;

        if (newMinutesSinceEpoch - lastUpdatedMinutesEpoch > 60) {
          // New entry
          updatedScrap.writingHistory.push(newHistoryEntry);
        } else {
          // Updated entry
          updatedScrap.writingHistory[writingHistory.length - 1] = newHistoryEntry;
        }
      }

      state.scrapMap[action.payload.id as string] = updatedScrap;
    },
    removeScrap(state, action: PayloadAction<string>) {
      delete state.scrapMap[action.payload];
    }
  }
});

export const scrapListPersistenceMiddleware: Middleware<{}, ScrapListInState>
    = storeAPI => next => action => {
  let result = next(action);

  if (action.type.startsWith(actionPrefix + '/')) {
    handleScrapListPersistence(action);
  }

  return result;
}

export const handleScrapListPersistence = (action: PayloadAction<string|IScrap>) => {
  switch (action.type) {
    case `${actionPrefix}/createScrap`:
      addScrapToStorage(action.payload as IScrap);
      break;
    case `${actionPrefix}/updateScrap`:
      writeScrap(action.payload as IScrap);
      break;
    case `${actionPrefix}/removeScrap`:
      clearScrapFromStorage(action.payload as string);
      break;
  }
}

// Selector for fetching full map of stories
export const selectScrapMap = (state: ScrapListInState|RootState): ScrapMap => {
  const compiledScrapMap: ScrapMap = {};

  for (const [key, value] of Object.entries(state.scrapList.scrapMap)) {
    compiledScrapMap[key] = Scrap.fromObject(value);
  }

  return compiledScrapMap;
}

// Creates selector for particular Scrap
export const selectSpecificScrap = (id: string) => (state: ScrapListInState|RootState): Scrap|null => {
  const fetchedScrap = state.scrapList.scrapMap[id];

  if (!fetchedScrap) {
    return null;
  }

  return Scrap.create(fetchedScrap);
}

export const { createScrap, updateScrap, removeScrap } = ScrapListSlice.actions;
export default ScrapListSlice.reducer;
