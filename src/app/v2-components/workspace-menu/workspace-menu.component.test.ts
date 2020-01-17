import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceMenuComponent } from './workspace-menu.component';
import { MatProgressSpinnerModule, MatListModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

describe('WorkspaceMenuComponent', () => {
  let component: WorkspaceMenuComponent;
  let fixture: ComponentFixture<WorkspaceMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkspaceMenuComponent ],
      imports: [MatProgressSpinnerModule, MatListModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
