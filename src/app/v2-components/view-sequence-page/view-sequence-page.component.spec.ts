import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSequencePageComponent } from './view-sequence-page.component';

describe('ViewSequencePageComponent', () => {
  let component: ViewSequencePageComponent;
  let fixture: ComponentFixture<ViewSequencePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSequencePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSequencePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
