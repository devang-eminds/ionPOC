import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductsService } from 'src/app/service/products/products.service';


describe('Dashboard', () => {
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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch products from product service', () => {
    const mockProducts =  require('./mock-data.json');

    service.getProducts({ limit: 5 }).subscribe((products: string | any[]) => {
      expect(products.length).toBe(mockProducts.length);
      expect(products).toEqual(mockProducts);
    });

  const req = httpMock.expectOne('https://fakestoreapi.com/products?limit=5');
    expect(req.request.method).toBe('GET');
  req.flush(mockProducts);
  });
});
