import {loadDataFromStorage, loadDataToStorage} from './DataManagementPage';
import {addStoryToStorage, readAllStoriesFromStorage} from '../../features/storyList/storyListPersistence';
import {Duration, Story} from '../../protos_v2';


describe('importing / exporting', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('works with empty workspaces', () => {
    const data = loadDataFromStorage();

    localStorage.clear();

    loadDataToStorage(data);

    expect(readAllStoriesFromStorage().length).toEqual(0);
  });

  test('works with non-empty workspaces', () => {

    addStoryToStorage(Story.create({
      id: 'abc123',
      name: 'My Story',
      description: 'something here'
    }));
    addStoryToStorage(Story.create({
      id: 'def456',
      name: 'My Story 2',
      duration: Duration.create({
        seconds: 3788
      })
    }));

    const data = loadDataFromStorage();

    localStorage.clear();

    loadDataToStorage(data);

    const allStories = readAllStoriesFromStorage();
    expect(allStories.length).toEqual(2);
  });
});
