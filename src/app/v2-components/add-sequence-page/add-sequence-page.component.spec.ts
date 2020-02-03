import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSequencePageComponent } from './add-sequence-page.component';

describe('AddSequencePageComponent', () => {
  let component: AddSequencePageComponent;
  let fixture: ComponentFixture<AddSequencePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSequencePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSequencePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
