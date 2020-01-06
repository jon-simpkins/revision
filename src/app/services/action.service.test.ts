import { TestBed } from '@angular/core/testing';

import { ActionService } from './action.service';

import { RoutingService } from './routing.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('ActionService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule]  // TODO: https://angular.io/api/router/testing/RouterTestingModule#example
  }));

  it('should be created', () => {
    const service: ActionService = TestBed.get(ActionService);
    expect(service).toBeTruthy();
  });
});
