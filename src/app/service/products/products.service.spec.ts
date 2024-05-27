import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProductsService } from './products.service';
import { ProductGetOptionsSchema, ProductSchema } from 'src/app/types/product.types';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService]
    });
    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return product list when calling getProducts', () => {
    const options: ProductGetOptionsSchema = {limit : 5};
    const mockProducts: ProductSchema[] = require('./../../screeens/dashboard/mock-data.json');

    service.getProducts(options).subscribe(products => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(`${service.apiUrl}?${service.objectToQueryString(options)}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });
});
