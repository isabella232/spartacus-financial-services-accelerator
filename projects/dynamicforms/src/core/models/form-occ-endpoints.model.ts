import { OccEndpoints } from '@spartacus/core';

export interface FormOccEndpoints extends OccEndpoints {
  /**
   * Get form definition by id
   *
   */
  definition?: string;
  /**
   * Get form definitions
   *
   */
  definitions?: string;
  /**
   * Get form data
   *
   */
  formData?: string;
  /**
   * Create form data
   *
   */
  createFormData?: string;
}