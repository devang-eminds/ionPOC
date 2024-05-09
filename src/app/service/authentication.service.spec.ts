import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AuthService } from './authentication.service';

describe('AuthService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Ensure that there are no outstanding requests
  });

  it('should fetch data', () => {
    const testData = { message: 'This is a test message' };

    httpClient.get('/data').subscribe((data: any) => {
      expect(data).toEqual(testData);
    });

    const req = httpTestingController.expectOne('/data');
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
  });
});
