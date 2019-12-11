import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OccFormService } from '../../../occ/services/form/occ-form.service';
import { FormStorageObject, YFormData } from '../../models';
import { YFormDefinition } from './../../models/form-occ.models';

@Injectable()
export class FormDataService {
  private formsLocalStorageKey = 'dynamicFormsData';
  submittedForm = new BehaviorSubject<YFormData>(null);
  constructor(protected occYformsService: OccFormService) {}

  // ***SHOULD BE REMOVED WITH FSA-4419***
  currentForm$: BehaviorSubject<YFormData> = new BehaviorSubject({});
  getCurrentFormData(): Observable<YFormData> {
    return this.currentForm$.asObservable();
  }
  // ***SHOULD BE REMOVED WITH FSA-4419***

  submit(form: YFormData) {
    this.submittedForm.next(form);
  }

  getSubmittedForm(): Observable<YFormData> {
    return this.submittedForm.asObservable();
  }

  setSubmittedForm(formData?: YFormData) {
    this.submittedForm.next(formData);
  }

  getFormDataIdFromLocalStorage(formDefinitionId: string): string {
    const formLocalStorageData = JSON.parse(
      localStorage.getItem(this.formsLocalStorageKey)
    );
    if (formLocalStorageData) {
      return formLocalStorageData
        .filter(formObj => formObj.formDefinitionId === formDefinitionId)
        .map(formObj => formObj.formDataId)[0];
    }
    return null;
  }

  getFormDataIdByCategory(categoryCode: string): string {
    const formLocalStorageData = JSON.parse(
      localStorage.getItem(this.formsLocalStorageKey)
    );
    if (formLocalStorageData) {
      return formLocalStorageData
        .filter(formObj => formObj.categoryCode === categoryCode)
        .map(formObj => formObj.formDataId)[0];
    }
    return null;
  }

  setFormDataToLocalStorage(
    formDefinitionId: string,
    formDataId: string,
    categoryCode?: string
  ) {
    let formLocalStorageData = JSON.parse(
      localStorage.getItem(this.formsLocalStorageKey)
    );
    if (
      formLocalStorageData === undefined ||
      formLocalStorageData === null ||
      formLocalStorageData.length === 0
    ) {
      formLocalStorageData = [
        this.createDataForLocalStorage(
          formDataId,
          formDefinitionId,
          categoryCode
        ),
      ];
    } else {
      const index = formLocalStorageData
        .map(sessionData => sessionData.formDefinitionId)
        .indexOf(formDefinitionId);
      index !== -1
        ? (formLocalStorageData[index].formDataId = formDataId)
        : formLocalStorageData.push(
            this.createDataForLocalStorage(
              formDataId,
              formDefinitionId,
              categoryCode
            )
          );
    }
    localStorage.setItem(
      this.formsLocalStorageKey,
      JSON.stringify(formLocalStorageData)
    );
  }

  createDataForLocalStorage(
    formDataId,
    formDefinitionId,
    categoryCode
  ): FormStorageObject {
    return {
      formDataId: formDataId,
      formDefinitionId: formDefinitionId,
      categoryCode: categoryCode,
    };
  }

  saveFormData(formData: YFormData): Observable<YFormData> {
    return this.occYformsService.saveFormData(formData);
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
}
