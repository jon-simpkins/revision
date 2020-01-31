import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureTemplateToolComponent } from './structure-template-tool.component';

describe('StructureTemplateToolComponent', () => {
  let component: StructureTemplateToolComponent;
  let fixture: ComponentFixture<StructureTemplateToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructureTemplateToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureTemplateToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
