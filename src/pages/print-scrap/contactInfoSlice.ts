import {createSlice, Middleware} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';

export interface ContactInfo {
  author: string;
  contactInfo: string;
}

interface ContactInfoInState {
  workspaceContactInfo: ContactInfo;
}

const AUTHOR_KEY = 'workspace-author';
const CONTACT_INFO_KEY = 'workspace-contact-info';

const initialState = {
  author: localStorage.getItem(AUTHOR_KEY) || '',
  contactInfo: localStorage.getItem(CONTACT_INFO_KEY) || '',
}

const actionPrefix = 'workspaceContactInfo';

const ContactInfoSlice = createSlice({
  name: actionPrefix,
  initialState,
  reducers: {},
});

export const contactInfoPersistenceMiddleware: Middleware<{}, ContactInfoInState>
    = storeAPI => next => action => {
  let result = next(action);

  if (action.type.startsWith(actionPrefix + '/')) {
    console.log('do persistence for');
    console.log(action);
  }

  return result;
}

// Selector for fetching contact info
export const selectContactInfo = (state: ContactInfoInState|RootState): ContactInfo => {
  return state.workspaceContactInfo;
}

export default ContactInfoSlice.reducer;
