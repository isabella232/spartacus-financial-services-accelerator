import { ValidatorFn } from '@angular/forms';

export interface FormDefinition {
  formGroups: FromGroup[];
  categoryCode: string;
  submitType: FormSubmitType;
}
export interface FromGroup {
  groupName: String;
  fieldConfigs: FieldConfig[];
}
export interface FieldConfig {
  disabled?: boolean;
  label?: string;
  name?: string;
  group?: string;
  options?: any[];
  placeholder?: string;
  type: string;
  validation?: ValidatorFn[];
  value?: any;
  hidden?: boolean;
  error?: string;
  parent?: boolean;
}

export enum FormSubmitType {
  PRICING
}
