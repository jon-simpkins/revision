import { TestBed } from '@angular/core/testing';

import { WorkspaceMetadataService } from './workspace-metadata.service';

describe('WorkspaceMetadataService', () => {
  let service: WorkspaceMetadataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkspaceMetadataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
