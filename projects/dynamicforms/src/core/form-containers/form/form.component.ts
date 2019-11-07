import { Component, Input, ViewChild } from '@angular/core';
import { RoutingService } from '@spartacus/core';

import { FormDefinition } from '../../models/field-config.interface';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { OccYformService } from '../../../occ/services/yform/occ-yform.service';
import { FormDataService } from '../../services/data/form-data.service';

@Component({
  selector: 'cx-form-component',
  templateUrl: './form.component.html',
})
export class FormComponent {
  constructor(
    protected routingService: RoutingService,
    protected yformService: OccYformService,
    protected formDataService: FormDataService
  ) {}

  @ViewChild(DynamicFormComponent, { static: false })
  form: DynamicFormComponent;
  @Input()
  formCategoryCode: string;
  @Input()
  formId: string;
  @Input()
  formConfig: FormDefinition;

  submit(formData: { [name: string]: any }) {
    if (this.form.valid) {
      const filteredData = this.formDataService.buildFormData(formData);
      this.yformService
        .saveFormData(this.formId, 'insurance', '', filteredData)
        .subscribe(response => {
          this.formDataService.currentForm$.next({
            id: response.id,
            formDefinitionId: this.formId,
            content: response.content,
          });
        });
      this.navigateNext();
    }
  }

  // Should be more configurable to support other routes/pages
  navigateNext() {
    this.routingService.go({
      cxRoute: 'category',
      params: { code: this.formCategoryCode },
    });
  }
}
