import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormDataService,
  FormDataStorageService,
  FormDefinition,
  YFormData,
  YFormDefinition,
} from '@fsa/dynamicforms';
import { CurrentProductService } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import {
  ConfiguratorType,
  FSCategory,
  FSProduct,
} from '../../../../../occ/occ-models';

@Component({
  selector: 'cx-fs-product-configuration-form',
  templateUrl: './product-configuration-form.component.html',
})
export class ProductConfigurationFormComponent implements OnInit, OnDestroy {
  constructor(
    protected currentProductService: CurrentProductService,
    protected formDataService: FormDataService,
    protected formDataStorageService: FormDataStorageService
  ) {}

  subscription = new Subscription();
  formDefinition$: Observable<
    YFormDefinition
  > = this.formDataService.getFormDefinition();
  formData$: Observable<YFormData>;
  formConfig: YFormDefinition;
  applicationId: string;
  formDefintionId: string;
  formCategory: string;

  ngOnInit() {
    this.formDefinition$ = this.formDataService.getFormDefinition().pipe(
      map(definition => {
        if (definition.content) {
          this.formConfig = <FormDefinition>JSON.parse(definition.content);
        }
        return definition;
      })
    );

    this.subscription.add(
      this.currentProductService
        .getProduct()
        .pipe(
          filter(Boolean),
          take(1),
          map(product => {
            const fsProduct = <FSProduct>product;
            if (fsProduct && fsProduct.categories) {
              fsProduct.categories.forEach(category => {
                const fsCategory = <FSCategory>category;
                if (fsCategory.yformConfiguratorSettings) {
                  fsCategory.yformConfiguratorSettings.forEach(
                    configuratorSettings => {
                      if (
                        configuratorSettings.configuratorType &&
                        configuratorSettings.configuratorType ===
                          ConfiguratorType.PRODUCT_CONFIGURE_FORM
                      ) {
                        this.formCategory = fsProduct.defaultCategory.code;
                        this.applicationId =
                          configuratorSettings.configurationApplicationId;
                        this.formDefintionId =
                          configuratorSettings.configurationFormId;
                        this.formDataService.loadFormDefinition(
                          this.applicationId,
                          this.formDefintionId
                        );

                        const formDataId = this.formDataStorageService.getFormDataIdByDefinitionCode(
                          this.formDefintionId
                        );
                        if (formDataId) {
                          this.formDataService.loadFormData(formDataId);
                          this.formData$ = this.formDataService.getFormData();
                        }
                      }
                    }
                  );
                }
              });
            }
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}