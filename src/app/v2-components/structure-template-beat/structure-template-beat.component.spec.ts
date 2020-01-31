import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureTemplateBeatComponent } from './structure-template-beat.component';

describe('StructureTemplateBeatComponent', () => {
  let component: StructureTemplateBeatComponent;
  let fixture: ComponentFixture<StructureTemplateBeatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructureTemplateBeatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureTemplateBeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
