import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterSequenceAssignmentPageComponent } from './character-sequence-assignment-page.component';

describe('CharacterSequenceAssignmentPageComponent', () => {
  let component: CharacterSequenceAssignmentPageComponent;
  let fixture: ComponentFixture<CharacterSequenceAssignmentPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterSequenceAssignmentPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterSequenceAssignmentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
