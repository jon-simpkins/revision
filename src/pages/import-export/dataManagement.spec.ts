import {loadDataFromStorage, loadDataToStorage} from './DataManagementPage';
import {addStoryToStorage, readAllStoriesFromStorage} from '../../features/storyList/storyListPersistence';
import {Duration, Scrap, Story} from '../../protos_v2';
import {addScrapToStorage, readAllScrapsFromStorage} from '../../features/scrapList/scrapListPersistence';


describe('importing / exporting', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('works with empty workspaces', () => {
    const data = loadDataFromStorage();

    localStorage.clear();

    loadDataToStorage(data);

    expect(readAllStoriesFromStorage().length).toEqual(0);
    expect(readAllScrapsFromStorage().length).toEqual(0);
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

    addScrapToStorage(Scrap.create({
      id: 'ghi789',
      intendedDurationSec: 123,
      synopsis: 'My new scrap',
      stories: ['abc123', 'def456']
    }));

    const data = loadDataFromStorage();

    localStorage.clear();

    loadDataToStorage(data);

    const allStories = readAllStoriesFromStorage();
    expect(allStories.length).toEqual(2);

    const allScraps = readAllScrapsFromStorage();
    expect(allScraps.length).toEqual(1);
  });
});
