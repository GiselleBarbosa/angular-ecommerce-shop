import { RequestsInterceptor } from './request-interceptor.service';
import { TestBed } from '@angular/core/testing';

describe('RequestsInterceptor', () => {
  let service: RequestsInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestsInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
