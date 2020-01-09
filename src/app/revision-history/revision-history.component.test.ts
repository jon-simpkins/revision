import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionHistoryComponent } from './revision-history.component';
import { WorkspaceService } from '../services/workspace.service';
import { MatTableModule } from '@angular/material';
import { Workspace } from 'src/storyStructures';

describe('RevisionHistoryComponent', () => {
  let component: RevisionHistoryComponent;
  let fixture: ComponentFixture<RevisionHistoryComponent>;
  let workspaceService : WorkspaceService;

  beforeEach(async(() => {
    workspaceService = new WorkspaceService();
    workspaceService.currentWorkspace = new Workspace();
    TestBed.configureTestingModule({
      declarations: [ RevisionHistoryComponent ],
      imports: [MatTableModule],
      providers: [
        { provide: WorkspaceService, useValue: workspaceService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
