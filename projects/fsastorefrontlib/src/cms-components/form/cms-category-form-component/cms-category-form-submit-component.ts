import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormDataService,
  FormDefinition,
  YFormData,
  YFormDefinition,
  FormConfig,
} from '@fsa/dynamicforms';
import { CmsComponentConnector, PageContext, PageType } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable, of, Subscription } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { CMSFormSubmitComponent } from '../../../occ/occ-models';
import { FormSampleConfigurations } from './form-sample-configurations';

@Component({
  selector: 'cx-fs-cms-category-form-submit-component',
  templateUrl: './cms-category-form-submit-component.html',
})
export class CmsCategoryFormSubmitComponent implements OnInit, OnDestroy {
  constructor(
    protected componentData: CmsComponentData<CMSFormSubmitComponent>,
    protected activatedRoute: ActivatedRoute,
    protected cmsComponentConnector: CmsComponentConnector,
    protected formDataService: FormDataService,
    protected generalFormConfig: FormConfig
  ) {}

  routeParamId = 'formCode';
  pageContext: PageContext;
  formConfig: FormDefinition;
  formDefintion$: Observable<YFormDefinition> = of({});
  component$: Observable<CMSFormSubmitComponent>;
  formData$: Observable<YFormData>;
  private subscription = new Subscription();

  ngOnInit() {
    this.subscription.add(
      this.activatedRoute.params
        .pipe(
          switchMap(routeParam => {
            this.pageContext = new PageContext(
              routeParam[this.routeParamId],
              PageType.CATEGORY_PAGE
            );
            return (this.component$ = this.cmsComponentConnector.get(
              this.componentData.uid,
              this.pageContext
            ));
          }),
          mergeMap(componentData => {
            if (componentData && componentData.formId) {
              this.formConfig = FormSampleConfigurations.sampleConfigurations.filter(
                item => item.formId === componentData.formId
              )[0];
              if (!this.formConfig) {
                this.formDefintion$ = this.formDataService.getFormDefinition(
                  componentData.applicationId,
                  componentData.formId
                );
                return this.formDefintion$;
              }
              return of(null);
            }
          }),
          map(formDefinition => {
            if (formDefinition && formDefinition.content) {
              this.formConfig = <FormDefinition>(
                JSON.parse(formDefinition.content)
              );
              this.addValidations();
            }
          })
        )
        .subscribe()
    );
    this.subscription.add(
      this.component$
        .pipe(
          map(componentData => {
            const formDataId = this.formDataService.getFormDataIdFromLocalStorage(
              componentData.formId
            );
            if (formDataId) {
              this.formData$ = this.formDataService.getFormData(formDataId);
            }
          })
        )
        .subscribe()
    );
  }

  addValidations() {
    this.formConfig.formGroups.forEach(group => {
      group.fieldConfigs.forEach(field => {
        if (field.validations) {
          field.validation = [];
          field.validations.forEach(validation => {
            const configValidation = this.generalFormConfig.validations[validation.name];
            if (configValidation && configValidation.function) {
              const validatorFunction = configValidation.function;
              if (validation.args) {
                const targetValidation = validatorFunction.apply(this, validation.args.map(arg =>  arg.name));
                field.validation.push(targetValidation);
              }
            }
          });
        }
      });
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
