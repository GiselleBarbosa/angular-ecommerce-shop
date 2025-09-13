import { PriceOrderService } from './price-order.service';
import { TestBed } from '@angular/core/testing';

describe('PriceOrderService', () => {
  let service: PriceOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriceOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
