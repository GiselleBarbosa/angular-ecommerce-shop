import { ItemsPerPageService } from './items-per-page.service';
import { TestBed } from '@angular/core/testing';

describe('ItemsPerPageService', () => {
  let service: ItemsPerPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemsPerPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
