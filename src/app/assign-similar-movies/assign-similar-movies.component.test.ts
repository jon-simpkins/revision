import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignSimilarMoviesComponent } from './assign-similar-movies.component';

import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule, MatListModule, MatButtonModule } from '@angular/material';
import { WorkspaceService } from '../services/workspace.service';
import { Workspace } from 'src/storyStructures';

describe('AssignSimilarMoviesComponent', () => {
  let component: AssignSimilarMoviesComponent;
  let fixture: ComponentFixture<AssignSimilarMoviesComponent>;
  let workspaceService : WorkspaceService;

  beforeEach(async(() => {
    workspaceService = new WorkspaceService();
    workspaceService.currentWorkspace = new Workspace();
    const storyId = workspaceService.currentWorkspace.buildNewStory();
    workspaceService.setCurrentStoryId(storyId);

    TestBed.configureTestingModule({
      declarations: [AssignSimilarMoviesComponent],
      imports: [RouterTestingModule, MatIconModule, MatListModule, MatButtonModule],
      providers: [
        { provide: WorkspaceService, useValue: workspaceService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignSimilarMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
