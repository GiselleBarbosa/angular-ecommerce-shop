import { TestBed } from '@angular/core/testing';

import { FindAddressService } from './find-address.service';

describe('FindAddressService', () => {
  let service: FindAddressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindAddressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
