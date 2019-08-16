import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedOutStateComponent } from './logged-out-state.component';

describe('LoggedOutStateComponent', () => {
  let component: LoggedOutStateComponent;
  let fixture: ComponentFixture<LoggedOutStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoggedOutStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedOutStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
