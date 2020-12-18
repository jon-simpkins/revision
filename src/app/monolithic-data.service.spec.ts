import { TestBed } from '@angular/core/testing';

import { MonolithicDataService } from './monolithic-data.service';

describe('MonolithicDataService', () => {
  let service: MonolithicDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonolithicDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
