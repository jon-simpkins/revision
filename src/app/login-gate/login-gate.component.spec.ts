import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginGateComponent } from './login-gate.component';

describe('LoginGateComponent', () => {
  let component: LoginGateComponent;
  let fixture: ComponentFixture<LoginGateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginGateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginGateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
