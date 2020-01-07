import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSimilarMoviesComponent } from './detail-similar-movies.component';
import { MatListModule, MatFormFieldModule } from '@angular/material';
import { WorkspaceService } from '../services/workspace.service';
import { Workspace } from 'src/storyStructures';

describe('DetailSimilarMoviesComponent', () => {
  let component: DetailSimilarMoviesComponent;
  let fixture: ComponentFixture<DetailSimilarMoviesComponent>;
  let workspaceService : WorkspaceService;

  beforeEach(async(() => {
    workspaceService = new WorkspaceService();
    workspaceService.currentWorkspace = new Workspace();

    TestBed.configureTestingModule({
      declarations: [ DetailSimilarMoviesComponent ],
      imports: [MatListModule, MatFormFieldModule],
      providers: [
        { provide: WorkspaceService, useValue: workspaceService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSimilarMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
