import {IScrap, Scrap} from '../../protos_v2';

const allScrapIdsKey = 'scrap-ids';

function scrapKey(id: string): string {
  return `scrap-${id}`;
}

export function readAllScrapsFromStorage(): Scrap[] {
  return readScrapIds().map((id) => {
    return readScrap(id);
  });
}

function readScrapIds(): string[] {
  let storyIdString = localStorage.getItem(allScrapIdsKey) || '[]';
  return JSON.parse(storyIdString) as string[];
}

function writeScrapIds(scrapIds: string[]): void {
  localStorage.setItem(allScrapIdsKey, JSON.stringify(scrapIds));
}

function readScrap(id: string): Scrap {
  let scrapString = localStorage.getItem(scrapKey(id));
  if (!scrapString) {
    throw Error(`Unable to read scrap ${id} from local storage`);
  }

  return Scrap.create(JSON.parse(scrapString));
}

export function writeScrap(scrap: IScrap) {
  localStorage.setItem(scrapKey(scrap.id as string), JSON.stringify(scrap));
}

export function addScrapToStorage(scrap: IScrap): void {
  writeScrap(scrap);

  const allScrapIds = readScrapIds();
  allScrapIds.push(scrap.id as string);
  writeScrapIds(allScrapIds);
}


export function clearScrapFromStorage(idToRemove: string): void {
  let allScrapIds = readScrapIds();

  writeScrapIds(allScrapIds.filter((id) => {
    return id !== idToRemove;
  }));

  localStorage.removeItem(scrapKey(idToRemove));
}
