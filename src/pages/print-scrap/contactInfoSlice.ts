import {createSlice, Middleware, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {readContactInfoFromStorage, setAuthor, setContactInfo} from './contactInfoPersistence';

export interface ContactInfo {
  author: string;
  contactInfo: string;
}

interface ContactInfoInState {
  workspaceContactInfo: ContactInfo;
}

const initialState = readContactInfoFromStorage();

const actionPrefix = 'workspaceContactInfo';

const ContactInfoSlice = createSlice({
  name: actionPrefix,
  initialState,
  reducers: {
    updateAuthor(state, action: PayloadAction<string>) {
      state.author = action.payload;
    },
    updateContactInfo(state, action: PayloadAction<string>) {
      state.contactInfo = action.payload;
    }
  },
});

export const contactInfoPersistenceMiddleware: Middleware<{}, ContactInfoInState>
    = storeAPI => next => action => {
  let result = next(action);

  if (action.type.startsWith(actionPrefix + '/')) {
    handleContactInfoPersistence(action);
  }

  return result;
}

export const handleContactInfoPersistence = (action: PayloadAction<string>) => {
  switch (action.type) {
    case `${actionPrefix}/updateAuthor`:
      setAuthor(action.payload);
      break;
    case `${actionPrefix}/updateContactInfo`:
      setContactInfo(action.payload);
      break;
  }
}

// Selector for fetching contact info
export const selectContactInfo = (state: ContactInfoInState|RootState): ContactInfo => {
  return state.workspaceContactInfo;
}

export const { updateAuthor, updateContactInfo } = ContactInfoSlice.actions;
export default ContactInfoSlice.reducer;
