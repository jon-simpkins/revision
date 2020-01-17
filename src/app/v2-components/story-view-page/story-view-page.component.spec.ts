import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryViewPageComponent } from './story-view-page.component';

describe('StoryViewPageComponent', () => {
  let component: StoryViewPageComponent;
  let fixture: ComponentFixture<StoryViewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryViewPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
