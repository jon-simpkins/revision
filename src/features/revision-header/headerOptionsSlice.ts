import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {CharacterAppearance} from '../utils/fetchCharacters';
import {TraitAppearance} from '../utils/fetchTraits';

export interface HeaderOptions {
  currentScrapId: string;
  showEditLink: boolean;
  showReadLink: boolean;
  characterFilters: CharacterAppearance[];
  currentCharacterFilter?: string;
  currentCompletionFilter?: string;
  traitFilters: TraitAppearance[];
  currentTraitFilter?: string;
  isCurrentlyInSession: boolean; // In a timed writing session
  currentWritingSessionStartEpoch: number;
  lastCheckedWritingSessionEpoch: number;
}

interface headerOptionsInState {
  headerOptions: {
    options: HeaderOptions
  }
}

const initialState = {
  options: {
    currentScrapId: '',
    showEditLink: false,
    showReadLink: false,
    characterFilters: [],
    currentCharacterFilter: '',
    currentCompletionFilter: '',
    traitFilters: [],
    currentTraitFilter: '',
    isCurrentlyInSession: false,
    currentWritingSessionStartEpoch: 0,
    lastCheckedWritingSessionEpoch: 0,
  } as HeaderOptions
};


const actionPrefix = 'headerOptions';

const headerOptionsSlice = createSlice({
  name: actionPrefix,
  initialState,
  reducers: {
    updateHeaderOptions(state, action: PayloadAction<object>) {
      state.options = {
        ...state.options,
        ...action.payload
      } as HeaderOptions;
    },
  }
});

export const readHeaderOptions = (state: headerOptionsInState|RootState): HeaderOptions => {
  return state.headerOptions.options;
}

export const { updateHeaderOptions } = headerOptionsSlice.actions;
export default headerOptionsSlice.reducer;
