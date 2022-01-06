import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {CharacterAppearance} from '../utils/fetchCharacters';

export interface HeaderOptions {
  currentScrapId: string;
  showEditLink: boolean;
  showReadLink: boolean;
  characterFilters: CharacterAppearance[];
  currentCharacterFilter?: string;
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
  } as HeaderOptions
};


const actionPrefix = 'headerOptions';

const headerOptionsSlice = createSlice({
  name: actionPrefix,
  initialState,
  reducers: {
    updateHeaderOptions(state, action: PayloadAction<HeaderOptions>) {
      state.options = action.payload;
    },
  }
});

export const readHeaderOptions = (state: headerOptionsInState|RootState): HeaderOptions => {
  return state.headerOptions.options;
}

export const { updateHeaderOptions } = headerOptionsSlice.actions;
export default headerOptionsSlice.reducer;
