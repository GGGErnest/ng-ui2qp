import { TestBed } from '@angular/core/testing';

import { QpBuilderService } from './qp-builder.service';

describe('QpBuilderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QpBuilderService = TestBed.get(QpBuilderService);
    expect(service).toBeTruthy();
  });
});
