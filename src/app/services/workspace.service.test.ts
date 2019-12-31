import { TestBed } from '@angular/core/testing';

import { WorkspaceService } from './workspace.service';
import { Workspace, SimilarMovie } from 'src/storyStructures';

describe('WorkspaceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkspaceService = TestBed.get(WorkspaceService);
    expect(service).toBeTruthy();
  });

  it('Should generate serializations and deserializations that are compatible', () => {
    const blankWorkspace = new Workspace();
    const improvedWorkspace = new Workspace();
    const newSimilarMovieId = improvedWorkspace.buildNewSimilarMovie();
    improvedWorkspace.similarMovies.get(newSimilarMovieId).title = 'Tenet';
  
    const diffString = WorkspaceService.determineBase64Diffs(
      blankWorkspace.toString(),
      improvedWorkspace.toString()
    );

    let blankWorkspaceProxy = JSON.parse(blankWorkspace.toString());
    blankWorkspaceProxy = WorkspaceService.applyDiffs(blankWorkspaceProxy, diffString);

    expect(JSON.stringify(blankWorkspaceProxy)).toEqual(improvedWorkspace.toString());
  });
});
