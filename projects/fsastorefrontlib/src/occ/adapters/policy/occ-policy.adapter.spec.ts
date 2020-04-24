import { HttpClientModule, HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { OccPolicyAdapter } from './occ-policy.adapter';
import { OccEndpointsService } from '@spartacus/core';

const userId = '123';

const policyId = '00000023';
const contractId = '00000023';

const policiesEndpoint = 'policies';
const policyEndpoint = 'policy';
const premiumCalendarEndpoint = 'premiumCalendar';

class MockOccEndpointsService {
  getUrl(endpoint: string, _urlParams?: object, _queryParams?: object) {
    return this.getEndpoint(endpoint);
  }
  getEndpoint(url: string) {
    return url;
  }
}

describe('OccPolicyAdapter', () => {
  let adapter: OccPolicyAdapter;
  let httpMock: HttpTestingController;
  let occEndpointService: OccEndpointsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        OccPolicyAdapter,
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
      ],
    });

    adapter = TestBed.get(OccPolicyAdapter);
    httpMock = TestBed.get(HttpTestingController);
    occEndpointService = TestBed.get(OccEndpointsService);
    spyOn(occEndpointService, 'getUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getPolicies', () => {
    it('should fetch user Policies', async(() => {
      adapter.getPolicies(userId).subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return req.url === policiesEndpoint && req.method === 'GET';
      }, `GET method and url`);
      expect(occEndpointService.getUrl).toHaveBeenCalledWith(policiesEndpoint, {
        userId,
      });
    }));
  });

  describe('getPolicy', () => {
    it('should fetch a single policy', async(() => {
      adapter.getPolicy(userId, policyId, contractId).subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return req.url === policyEndpoint && req.method === 'GET';
      }, `GET a single policy`);
      expect(occEndpointService.getUrl).toHaveBeenCalledWith(policyEndpoint, {
        userId,
        policyId,
        contractId,
      });
    }));
  });

  describe('getPremiumCalendar', () => {
    it('should fetch user premium calendar', async(() => {
      adapter.getPremiumCalendar(userId).subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return req.url === premiumCalendarEndpoint && req.method === 'GET';
      }, `GET method and url`);
      expect(occEndpointService.getUrl).toHaveBeenCalledWith(
        premiumCalendarEndpoint,
        {
          userId,
        }
      );
    }));
  });
});
