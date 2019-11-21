import { YFormDefinition } from './../../models/form-occ.models';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { YFormData } from '../../models';
import { OccFormService } from '../../../occ/services/form/occ-form.service';

@Injectable()
export class FormDataService {
  constructor(protected occYformsService: OccFormService) {}

  isSubmitted: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  submittedForm: BehaviorSubject<YFormData> = new BehaviorSubject<YFormData>(
    {}
  );

  // ***SHOULD BE REMOVED WITH FSA-4419***
  currentForm$: BehaviorSubject<YFormData> = new BehaviorSubject({});
  getCurrentFormData(): Observable<YFormData> {
    return this.currentForm$.asObservable();
  }
  // ***SHOULD BE REMOVED WITH FSA-4419***

  submit() {
    this.isSubmitted.next(false);
  }

  getSubmitted(): Observable<YFormData> {
    return this.submittedForm.asObservable();
  }

  setSubmitted(formData: YFormData) {
    this.isSubmitted.next(true);
    this.submittedForm.next(formData);
  }

  saveFormData(
    formId: string,
    applicationId: string,
    formContent: any
  ): Observable<YFormData> {
    const filteredData = this.filterData(formContent);
    return this.occYformsService.saveFormData(
      formId,
      applicationId,
      filteredData
    );
  }

  getFormData(formDataId: string): Observable<YFormData> {
    return this.occYformsService.getFormData(formDataId);
  }

  getFormDefinition(
    applicationId: string,
    formDefinitionId: string
  ): Observable<YFormDefinition> {
    return this.occYformsService.getFormDefinition(
      applicationId,
      formDefinitionId
    );
  }

  filterData(formData: { [name: string]: Object }): any {
    if (formData.button) {
      delete formData.button;
    }
    return formData;
  }
}
