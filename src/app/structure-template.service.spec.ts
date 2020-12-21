import { TestBed } from '@angular/core/testing';

import { StructureTemplateService } from './structure-template.service';

describe('StructureTemplateService', () => {
  let service: StructureTemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StructureTemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
