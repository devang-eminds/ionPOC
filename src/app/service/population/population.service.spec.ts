import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PopulationService } from './population.service';

describe('PopulationService', () => {
  let service: PopulationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PopulationService]
    });
    service = TestBed.inject(PopulationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch population data', () => {
    const mockData = require('./population.json');

    service.fetchPopulationData().subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const request = httpMock.expectOne('https://mocki.io/v1/871eb4a4-7bd2-4587-a9a9-d3528262f0f0');
    expect(request.request.method).toBe('GET');
    request.flush(mockData);
  });

  it('should handle errors properly', () => {
    const errorMessage = '404 Not Found';

    service.fetchPopulationData().subscribe(
      data => fail('expected an error, not data'),
      error => {
        expect(error).toContain(errorMessage);
      }
    );

    const request = httpMock.expectOne('https://mocki.io/v1/871eb4a4-7bd2-4587-a9a9-d3528262f0f0');
    request.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });
});
