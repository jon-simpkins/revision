import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { V2RouterComponent } from './v2-router.component';

describe('V2RouterComponent', () => {
  let component: V2RouterComponent;
  let fixture: ComponentFixture<V2RouterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ V2RouterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(V2RouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
