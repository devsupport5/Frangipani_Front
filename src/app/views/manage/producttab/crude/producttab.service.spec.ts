import { TestBed } from '@angular/core/testing';

import { ProductTabService } from './producttab.service';

describe('ProductService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductTabService = TestBed.get(ProductTabService);
    expect(service).toBeTruthy();
  });
});
