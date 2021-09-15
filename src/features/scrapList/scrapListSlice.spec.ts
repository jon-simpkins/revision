import {Scrap} from '../../protos_v2';
import {addScrapToStorage, clearScrapFromStorage, readAllScrapsFromStorage, writeScrap} from './scrapListPersistence';

describe('scrapList persistence', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('writes and reads and removes scraps as expected', () => {
    const initialScraps = readAllScrapsFromStorage();
    expect(initialScraps.length).toEqual(0);

    addScrapToStorage(Scrap.create({
      id: 'abc123'
    }));

    const updatedScraps = readAllScrapsFromStorage();
    expect(updatedScraps.length).toEqual(1);

    writeScrap(Scrap.create({
      id: 'abc123',
      synopsis: 'My Scrap'
    }));

    const finalScraps = readAllScrapsFromStorage();
    expect(finalScraps.length).toEqual(1);
    expect(finalScraps[0].synopsis).toEqual('My Scrap');
    expect(finalScraps[0].id).toEqual('abc123');

    clearScrapFromStorage('abc123');

    const scrapsAfterRemoval = readAllScrapsFromStorage();
    expect(scrapsAfterRemoval.length).toEqual(0);
  });
});
