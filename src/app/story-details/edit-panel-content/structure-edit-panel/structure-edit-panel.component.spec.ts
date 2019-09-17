import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureEditPanelComponent } from './structure-edit-panel.component';

describe('StructureEditPanelComponent', () => {
  let component: StructureEditPanelComponent;
  let fixture: ComponentFixture<StructureEditPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructureEditPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureEditPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
