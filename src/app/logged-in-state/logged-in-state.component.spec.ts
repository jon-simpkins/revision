import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedInStateComponent } from './logged-in-state.component';

describe('LoggedInStateComponent', () => {
  let component: LoggedInStateComponent;
  let fixture: ComponentFixture<LoggedInStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoggedInStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedInStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
