import {Story} from '../../protos_v2';
import {StoryMapInState} from './storyListSlice';

const allStoryIdsKey = 'story-ids';

function storyKey(id: string): string {
  return `story-${id}`;
}

export function readAllStoriesFromStorage(): Story[] {
  return readStoryIds().map((id) => {
    return readStory(id);
  });
}

function readStoryIds(): string[] {
  let storyIdString = localStorage.getItem(allStoryIdsKey) || '[]';
  return JSON.parse(storyIdString) as string[];
}

function writeStoryIds(storyIds: string[]): void {
  localStorage.setItem(allStoryIdsKey, JSON.stringify(storyIds));
}

function readStory(id: string): Story {
  let storyString = localStorage.getItem(storyKey(id));
  if (!storyString) {
    throw Error(`Unable to read story ${id} from local storage`);
  }

  return Story.create(JSON.parse(storyString));
}

export function writeStory(story: Story) {
  localStorage.setItem(storyKey(story.id), JSON.stringify(story.toJSON()));
}

export function addStoryToStorage(story: Story): void {
  writeStory(story);

  const allStoryIds = readStoryIds();
  allStoryIds.push(story.id);
  writeStoryIds(allStoryIds);
}

export function clearStoryFromStorage(idToRemove: string): void {
  let allStoryIds = readStoryIds();

  writeStoryIds(allStoryIds.filter((id) => {
    return id !== idToRemove;
  }));

  localStorage.removeItem(storyKey(idToRemove));
}

export function fetchInitialStateFromStorage() {
  const initialState = {
    storyMap: {} as StoryMapInState
  };
  readAllStoriesFromStorage().forEach((story) => {
    initialState.storyMap[story.id] = story.toJSON();
  });

  return initialState;
}

