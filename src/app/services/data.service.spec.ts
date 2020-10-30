import { inject, TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { environment } from 'src/environments/environment';
describe('DataService', () => {

  beforeEach(() => TestBed.configureTestingModule({
    providers: [DataService],
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: DataService = TestBed.get(DataService);
    expect(service).toBeTruthy();
  });

  it('expects service to fetch data with get and return correct response',
    inject([HttpTestingController, DataService],
      (httpMock: HttpTestingController, service: DataService) => {
        // We call the service
        service.get<{data: string}>('hello').subscribe( data => {
          expect(data.data).toEqual('world');
        })
        // We set the expectations for the HttpClient mock
        const req = httpMock.expectOne(environment.API_BASE_URL + 'hello');
        expect(req.request.method).toEqual('GET');
        // Then we set the fake data to be returned by the mock
        req.flush({ data: 'world'});
      })
  );

  it('expects service to post data with post and return correct response',
  inject([HttpTestingController, DataService],
    (httpMock: HttpTestingController, service: DataService) => {
      // We call the service
      service.post<{data: string}>('hello').subscribe( data => {
        expect(data.data).toEqual('world');
      })
      // We set the expectations for the HttpClient mock
      const req = httpMock.expectOne(environment.API_BASE_URL + 'hello');
      expect(req.request.method).toEqual('POST');
      // Then we set the fake data to be returned by the mock
      req.flush({ data: 'world'});
    })
);

});
