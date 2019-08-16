// A set of helper functions for manipulating the Google Docs API

import { credentials } from '../credentials';

declare var gapi: any; // TODO: actually import the types for this

// Read in the credentials from a git-ignored file
const API_KEY = credentials.API_KEY;
const CLIENT_ID = credentials.CLIENT_ID;

// Function to initialize the GAPI global object
function initApi() : void {
  if (typeof gapi == 'undefined') {
    return; // If GAPI didn't load, abort
  }

  if (!gapi || !gapi.load) {
    setTimeout(() => {
      initApi();
    }, 50);
    return;
  }

  const DISCOVERY_DOCS = [
    'https://docs.googleapis.com/$discovery/rest?version=v1&key=' + API_KEY];

  gapi.load('client:auth2', () => {
    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: 'https://www.googleapis.com/auth/documents'
    });
  });
}

initApi();

function signIn() : void {
  gapi.auth2.getAuthInstance().signIn();
}

function signOut() : void {
  gapi.auth2.getAuthInstance().signOut();
}

function registerSignedInListener(callback) : void {
  if (typeof gapi == 'undefined') {
    return; // If GAPI didn't load, abort
  }

  if (!gapi || !gapi.auth2) {
    setTimeout(() => {
      registerSignedInListener(callback);
    }, 50);
    return;
  }

  gapi.auth2.getAuthInstance().isSignedIn.listen(callback);
}

function getLoginEmail() {
  return gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getEmail();
}

function fetchDoc(docId) {
  return gapi.client.docs.documents.get({
    documentId: docId
  });
}

function createDoc(title) {
  return gapi.client.docs.documents.create({
    title: title
  });
}

export { signIn, signOut, registerSignedInListener, getLoginEmail, fetchDoc, createDoc };
