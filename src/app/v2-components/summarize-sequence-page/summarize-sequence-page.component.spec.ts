import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummarizeSequencePageComponent } from './summarize-sequence-page.component';

describe('SummarizeSequencePageComponent', () => {
  let component: SummarizeSequencePageComponent;
  let fixture: ComponentFixture<SummarizeSequencePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummarizeSequencePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummarizeSequencePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
