import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureBlockContentEditPanelComponent } from './structure-block-content-edit-panel.component';

describe('StructureBlockContentEditPanelComponent', () => {
  let component: StructureBlockContentEditPanelComponent;
  let fixture: ComponentFixture<StructureBlockContentEditPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructureBlockContentEditPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureBlockContentEditPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
