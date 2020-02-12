import { Injectable } from '@angular/core';
import { OccEndpointsService, GeoPoint } from '@spartacus/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { AgentAdapter } from '../../../core/agent/connectors/agent.adapter';

@Injectable()
export class OccAgentAdapter implements AgentAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointService: OccEndpointsService
  ) {}

  getAgentsByCategory(category: string): Observable<any> {
    const url = this.getAgentsEndpoint();
    const categoryParam = 'categoryCode=' + category + '&fields=DEFAULT';
    const params = new HttpParams({ fromString: categoryParam });

    return this.http
      .get(url, { params: params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  getAgentsByQuery(
    searchQuery: string,
    pageNumber: number,
    longitudeLatitude?: GeoPoint
  ): Observable<any> {
    const url = this.getAgentsEndpoint();
    const query = '&page=' + pageNumber.toString() + '&fields=DEFAULT';
    let params = new HttpParams({ fromString: query });

    if (longitudeLatitude) {
      params = params
        .set('longitude', String(longitudeLatitude.longitude))
        .set('latitude', String(longitudeLatitude.latitude))
        .set('radius', String('10000000'));
    }
    if (searchQuery) {
      params = params.set('queryParam', searchQuery);
    }

    return this.http
      .get<any>(url, { params: params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  getAgentByID(id: string) {
    const url = this.getAgentsEndpoint() + '/' + id + '?fields=DEFAULT';
    return this.http
      .get(url)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  protected getAgentsEndpoint() {
    return this.occEndpointService.getBaseEndpoint() + '/agents';
  }
}
