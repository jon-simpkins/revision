import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuntimeEditComponent } from './runtime-edit.component';

describe('RuntimeEditComponent', () => {
  let component: RuntimeEditComponent;
  let fixture: ComponentFixture<RuntimeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuntimeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuntimeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
