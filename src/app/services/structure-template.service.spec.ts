import { TestBed } from '@angular/core/testing';

import { StructureTemplateService } from './structure-template.service';

describe('StructureTemplateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StructureTemplateService = TestBed.get(StructureTemplateService);
    expect(service).toBeTruthy();
  });
});
