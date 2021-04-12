import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WritingAncestorComponent } from './writing-ancestor.component';

describe('WritingAncestorComponent', () => {
  let component: WritingAncestorComponent;
  let fixture: ComponentFixture<WritingAncestorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WritingAncestorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WritingAncestorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
