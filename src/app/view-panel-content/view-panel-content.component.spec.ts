import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPanelContentComponent } from './view-panel-content.component';

describe('ViewPanelContentComponent', () => {
  let component: ViewPanelContentComponent;
  let fixture: ComponentFixture<ViewPanelContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPanelContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPanelContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
