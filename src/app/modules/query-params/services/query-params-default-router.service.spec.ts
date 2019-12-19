import { TestBed } from '@angular/core/testing';

import { QueryParamsDefaultRouterService } from './query-params-default-router.service';

describe('QueryParamsDefaultRouterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QueryParamsDefaultRouterService = TestBed.get(QueryParamsDefaultRouterService);
    expect(service).toBeTruthy();
  });
});
