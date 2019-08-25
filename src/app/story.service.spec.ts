import { TestBed } from '@angular/core/testing';

import { StoryService } from './story.service';

describe('StoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StoryService = TestBed.get(StoryService);
    expect(service).toBeTruthy();
  });

  it('expects to serialize and deserialize correctly', () => {
    let serialized = StoryService.generateSerialization('abc123', 'myPrototype', {
      subfield1: '1234'
    });

    let deserialized = StoryService.parseSerialization(serialized);

    expect(deserialized.scrapId).toEqual('abc123');
    expect(deserialized.prototype).toEqual('myPrototype');
    expect(deserialized.content.subfield1).toEqual('1234');

  });

  it('expects to abort deserialized content that does not parse', () => {
    let deserialized = StoryService.parseSerialization('abc1234');

    expect(deserialized).toBeFalsy();
  })
});
