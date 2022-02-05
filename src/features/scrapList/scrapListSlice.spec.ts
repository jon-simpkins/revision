import {Scrap} from '../../protos_v2';
import {addScrapToStorage, clearScrapFromStorage, fetchInitialStateFromStorage, readAllScrapsFromStorage, writeScrap} from './scrapListPersistence';
import scrapSliceReducer, {createScrap, handleScrapListPersistence, removeScrap, selectScrapMap, selectSpecificScrap, updateScrap} from './scrapListSlice';
import {RootState} from '../../app/store';

describe('scrapList reducer', () => {
  it('should handle initial state', () => {
    const resultingState = scrapSliceReducer(undefined, {type: 'unknown'});

    expect(Object.keys(resultingState.scrapMap).length).toEqual(0);
  });

  it('should properly add scrap on create', () => {
    const fakeScrap = Scrap.create({
      id: 'abc123',
      synopsis: 'My new scrap'
    });

    const resultingState = scrapSliceReducer(undefined, createScrap(fakeScrap));

    expect(resultingState.scrapMap['abc123']).toBeTruthy();
  });

  it('should properly add scrap on update', () => {
    const fakeScrap = Scrap.create({
      id: 'abc123',
      synopsis: 'My new scrap'
    });

    const resultingState = scrapSliceReducer(undefined, updateScrap(fakeScrap));

    expect(resultingState.scrapMap['abc123']).toBeTruthy();
  });

  it('should properly remove stories', () => {
    const fakeStory1 = Scrap.create({
      id: 'abc123',
      synopsis: 'My new scrap'
    }).toJSON();

    const fakeStory2 = Scrap.create({
      id: 'def456',
      synopsis: 'My new scrap 2'
    }).toJSON();

    const resultingState = scrapSliceReducer(
        {
          scrapMap: {
            'abc123': fakeStory1,
            'def456': fakeStory2
          }
        },
        removeScrap('abc123')
    );

    expect(resultingState.scrapMap['abc123']).toBeFalsy();
    expect(resultingState.scrapMap['def456']).toBeTruthy();
  });

  it('should correctly parse out the scrap map', () => {
    const state = {
      scrapList: {
        scrapMap: {
          'a': {id: 'a'}
        }
      }
    } as unknown as RootState;

    const selected = selectScrapMap(state);

    expect(selected['a'].id).toEqual('a');
  });

  it('should correctly parse specific scrap', () => {
    const state = {
      scrapList: {
        scrapMap: {
          'a': {id: 'a'}
        }
      }
    } as unknown as RootState;

    const selectedPresent = selectSpecificScrap('a')(state);
    const selectedAbsent = selectSpecificScrap('b')(state);

    expect(selectedPresent?.id).toEqual('a');
    expect(selectedAbsent).toBeFalsy();
  });
});

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

  test('fetchInitialStateFromStorage loads from storage', () => {
    addScrapToStorage(Scrap.create({
      id: 'abc123',
      synopsis: 'My Scrap'
    }));

    const initialState = fetchInitialStateFromStorage();

    expect(initialState.scrapMap['abc123']).toBeTruthy();
  });

  test('handleStoryListPersistence works as expected', () => {
    handleScrapListPersistence(createScrap(Scrap.create({
      id: 'abc123',
      synopsis: 'my name'
    })));

    handleScrapListPersistence(updateScrap(Scrap.create({
      id: 'abc123',
      synopsis: 'My Scrap 2'
    })));

    const finalScraps = readAllScrapsFromStorage();
    expect(finalScraps.length).toEqual(1);
    expect(finalScraps[0].synopsis).toEqual('My Scrap 2');
    expect(finalScraps[0].id).toEqual('abc123');

    handleScrapListPersistence(removeScrap('abc123'));

    const scrapsAfterRemoval = readAllScrapsFromStorage();
    expect(scrapsAfterRemoval.length).toEqual(0);
  });
});
