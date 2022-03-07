import {ContactInfo} from './contactInfoSlice';


const AUTHOR_KEY = 'workspace-author';
const CONTACT_INFO_KEY = 'workspace-contact-info';

export function readContactInfoFromStorage(): ContactInfo {
  return {
    author: localStorage.getItem(AUTHOR_KEY) || '',
    contactInfo: localStorage.getItem(CONTACT_INFO_KEY) || '',
  }
}

export function setAuthor(newValue: string) {
  localStorage.setItem(AUTHOR_KEY, newValue);
}

export function setContactInfo(newValue: string) {
  localStorage.setItem(CONTACT_INFO_KEY, newValue);
}

export function writeContactInfoToStorage(contactInfo: ContactInfo): void {
  setAuthor(contactInfo.author);
  setContactInfo(contactInfo.contactInfo);
}
