import { TestBed } from '@angular/core/testing';

import { StorybookService } from './storybook.service';

describe('StorybookService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StorybookService = TestBed.get(StorybookService);
    expect(service).toBeTruthy();
  });
});
