import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WritingPageComponent } from './writing-page.component';

describe('WritingPageComponent', () => {
  let component: WritingPageComponent;
  let fixture: ComponentFixture<WritingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WritingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WritingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
