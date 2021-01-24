import { TestBed } from '@angular/core/testing';

import { BrainstormTemplateService } from './brainstorm-template.service';

describe('BrainstormTemplateService', () => {
  let service: BrainstormTemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrainstormTemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
