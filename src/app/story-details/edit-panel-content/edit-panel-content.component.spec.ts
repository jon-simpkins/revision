import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPanelContentComponent } from './edit-panel-content.component';

describe('EditPanelContentComponent', () => {
  let component: EditPanelContentComponent;
  let fixture: ComponentFixture<EditPanelContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPanelContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPanelContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
