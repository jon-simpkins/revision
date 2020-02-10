import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecSubstructurePageComponent } from './spec-substructure-page.component';

describe('SpecSubstructurePageComponent', () => {
  let component: SpecSubstructurePageComponent;
  let fixture: ComponentFixture<SpecSubstructurePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecSubstructurePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecSubstructurePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
