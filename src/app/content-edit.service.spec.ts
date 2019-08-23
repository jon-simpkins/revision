import { TestBed } from '@angular/core/testing';

import { ContentEditService } from './content-edit.service';

describe('ContentEditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContentEditService = TestBed.get(ContentEditService);
    expect(service).toBeTruthy();
  });
});
