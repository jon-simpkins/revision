import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyStructureNavComponent } from './apply-structure-nav.component';

describe('ApplyStructureNavComponent', () => {
  let component: ApplyStructureNavComponent;
  let fixture: ComponentFixture<ApplyStructureNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyStructureNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyStructureNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
