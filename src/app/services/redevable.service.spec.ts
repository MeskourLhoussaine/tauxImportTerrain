import { TestBed } from '@angular/core/testing';

import { RedevableService } from './redevable.service';

describe('RedevableService', () => {
  let service: RedevableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RedevableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
