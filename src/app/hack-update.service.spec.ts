import { TestBed } from '@angular/core/testing';

import { HackUpdateService } from './hack-update.service';

describe('HackUpdateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HackUpdateService = TestBed.get(HackUpdateService);
    expect(service).toBeTruthy();
  });
});
