import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnInit,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../core/models/form-config.interface';
import { AbstractFormComponent } from './abstract-form/abstract-form.component';
import { DynamicFormsConfig } from '../core/config/form-config';

@Directive({
  selector: '[cxFormComponent]',
})
export class FormComponentDirective implements OnInit {
  @Input()
  config: FieldConfig;
  @Input()
  group: FormGroup;
  component: ComponentRef<AbstractFormComponent>;
  components: { [fieldType: string]: Type<AbstractFormComponent> } = {};

  constructor(
    protected resolver: ComponentFactoryResolver,
    protected container: ViewContainerRef,
    protected formConfig: DynamicFormsConfig
  ) {}

  ngOnInit() {
    for (const [name, obj] of Object.entries(
      this.formConfig.dynamicForms.components
    )) {
      this.components[name] = obj.component;
    }
    console.log(this.components[this.config.fieldType]);
    if (!this.components[this.config.fieldType]) {
      const supportedTypes = Object.keys(this.components).join(', ');
      console.log(supportedTypes);
      throw new Error(
        `Trying to use an unsupported type (${this.config.fieldType}).
        Supported types: ${supportedTypes}`
      );
    }
    const component = this.resolver.resolveComponentFactory<
      AbstractFormComponent
    >(this.components[this.config.fieldType]);
    this.component = this.container.createComponent(component);
    this.component.instance.config = this.config;
    this.component.instance.group = this.group;
  }
}
