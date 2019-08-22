import { TestBed } from '@angular/core/testing';

import { StoryDetailsViewService } from './story-details-view.service';

describe('StoryDetailsViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StoryDetailsViewService = TestBed.get(StoryDetailsViewService);
    expect(service).toBeTruthy();
  });
});
