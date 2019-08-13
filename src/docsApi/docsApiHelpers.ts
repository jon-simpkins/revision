// A set of helper functions for manipulating the Google Docs API

import { credentials } from '../credentials';

declare var gapi: any; // TODO: actually import the types for this

// Read in the credentials from a git-ignored file
const API_KEY = credentials.API_KEY;
const CLIENT_ID = credentials.CLIENT_ID;

// Function to initialize the GAPI global object
function initApi() {
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

// This isn't a particularly elegant solution, but it works
// This will attempt 'initApi' once every 250 ms until it succeeds
let initApiTimeout = setInterval(() => {
  if (!!gapi.client) {
    // Succeeded!
    clearInterval(initApiTimeout);
    return;
  }

  initApi();
}, 250);

function signIn() {
  gapi.auth2.getAuthInstance().signIn();
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

export { signIn, fetchDoc, createDoc };
