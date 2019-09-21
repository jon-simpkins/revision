import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScriptEditPanelComponent } from './script-edit-panel.component';

describe('ScriptEditPanelComponent', () => {
  let component: ScriptEditPanelComponent;
  let fixture: ComponentFixture<ScriptEditPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScriptEditPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScriptEditPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
