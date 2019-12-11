import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { OccEndpointsService } from '@spartacus/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  YFormData,
  YFormDefinition,
} from '../../../core/models/form-occ.models';

const FULL_PARAMS = 'fields=FULL';

@Injectable()
export class OccFormService {
  constructor(
    protected http: HttpClient,
    protected occEndpointService: OccEndpointsService
  ) {}

  public saveFormData(formData: YFormData) {
    console.log(formData);
    const url = this.getYFormsEndpoint() + '/data';
    let params = new HttpParams({
      fromString:
        FULL_PARAMS +
        '&definitionId=' +
        formData.formDefinition.formId +
        '&applicationId=' +
        formData.formDefinition.applicationId,
    });
    if (formData.id) {
      params = params.append('formDataId', formData.id);
    }
    if (formData.refId) {
      params = params.append('refId', formData.refId);
    }
    return this.http
      .put<YFormData>(url, formData.content, { params: params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  public getFormData(formDataId: string) {
    const url = this.getYFormsEndpoint() + '/data';
    const params = new HttpParams({
      fromString: FULL_PARAMS + '&formDataId=' + formDataId,
    });
    return this.http
      .get<YFormData>(url, { params: params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  public getFormDefinition(applicationId: string, formDefinitionId: string) {
    const url = this.getYFormsEndpoint() + '/definitions/' + formDefinitionId;
    const params = new HttpParams({
      fromString: FULL_PARAMS + '&applicationId=' + applicationId,
    });
    return this.http
      .get<YFormDefinition>(url, { params: params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  protected getYFormsEndpoint() {
    const formsEndpoint = '/forms';
    return this.occEndpointService.getBaseEndpoint() + formsEndpoint;
  }
}
