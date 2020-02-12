import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OccEndpointsService } from '@spartacus/core';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import { PolicyAdapter } from '../../../core/my-account/connectors/policy.adapter';

const FULL_PARAMS = 'fields=FULL';

@Injectable()
export class OccPolicyAdapter implements PolicyAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointService: OccEndpointsService
  ) {}

  protected getPoliciesEndpoint(userId: string) {
    const policiesEndpoint = '/users/' + userId + '/policies';
    return this.occEndpointService.getBaseEndpoint() + policiesEndpoint;
  }

  protected getPolicyEndpoint(
    userId: string,
    policyId: string,
    contractId: string
  ) {
    const policyEndpoint =
      '/users/' + userId + '/policies/' + policyId + '/contracts/' + contractId;
    return this.occEndpointService.getBaseEndpoint() + policyEndpoint;
  }

  getPolicies(userId: string): Observable<any> {
    const url = this.getPoliciesEndpoint(userId);
    const params = new HttpParams();

    return this.http
      .get(url, { params: params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  getPoliciesByCategory(
    userId: string,
    policyCategoryCode: string
  ): Observable<any> {
    const url = this.getPoliciesEndpoint(userId);
    const date = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    const categoryAndCurrentDate =
      'category=' + policyCategoryCode + '&date=' + date + '&fields=DEFAULT';
    const params = new HttpParams({ fromString: categoryAndCurrentDate });

    return this.http
      .get(url, { params: params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  getPremiumCalendar(userId: string): Observable<any> {
    const url = this.getPoliciesEndpoint(userId) + '/premium-calendar';
    const params = new HttpParams({ fromString: FULL_PARAMS });

    return this.http
      .get(url, { params: params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  getPolicy(
    userId: string,
    policyId: string,
    contractId: string
  ): Observable<any> {
    const url = this.getPolicyEndpoint(userId, policyId, contractId);
    const params = new HttpParams();

    return this.http
      .get(url, { params: params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}
