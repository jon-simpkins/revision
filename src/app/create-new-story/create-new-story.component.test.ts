import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewStoryComponent } from './create-new-story.component';
import { MatProgressSpinnerModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

describe('CreateNewStoryComponent', () => {
  let component: CreateNewStoryComponent;
  let fixture: ComponentFixture<CreateNewStoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewStoryComponent ],
      imports: [MatProgressSpinnerModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
