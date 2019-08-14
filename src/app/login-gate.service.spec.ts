import { TestBed } from '@angular/core/testing';

import { LoginGateService } from './login-gate.service';

describe('LoginGateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginGateService = TestBed.get(LoginGateService);
    expect(service).toBeTruthy();
  });
});
