import { TestBed } from '@angular/core/testing';

import { QpDefaultRouterService } from './qp-default-router.service';

describe('QpDefaultRouterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QpDefaultRouterService = TestBed.get(QpDefaultRouterService);
    expect(service).toBeTruthy();
  });
});
