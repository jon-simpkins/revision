import { TestBed } from '@angular/core/testing';

import { RoutingService } from './routing.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('RoutingService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule]  // TODO: https://angular.io/api/router/testing/RouterTestingModule#example
  }));

  it('should be created', () => {
    const service: RoutingService = TestBed.get(RoutingService);
    expect(service).toBeTruthy();
  });
});
