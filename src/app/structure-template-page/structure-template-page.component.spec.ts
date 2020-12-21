import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureTemplatePageComponent } from './structure-template-page.component';

describe('StructureTemplatePageComponent', () => {
  let component: StructureTemplatePageComponent;
  let fixture: ComponentFixture<StructureTemplatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StructureTemplatePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureTemplatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
