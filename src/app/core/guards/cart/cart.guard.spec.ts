import { CanActivateFn } from '@angular/router';
import { CartGuard } from './cart.guard';
import { TestBed } from '@angular/core/testing';

describe('CartGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => CartGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
