import { YFormData, YFormDefinition } from '@fsa/dynamicforms';
import {
  Cart,
  Category,
  Occ,
  OrderEntry,
  Price,
  Product,
  User,
  UserSignUp,
} from '@spartacus/core';

export interface ContactAgentData {
  email?: string;
  interest?: string;
  contactType?: string;
  subject?: string;
  message?: string;
}

export interface FSProduct extends Product {
  price?: FSPrice;
  cartDispalyName?: string;
  defaultCategory?: FSCategory;
}

export interface FSCategory extends Category {
  yformDefinitions?: YFormDefinition[];
}

export interface OrgUnit {
  uid: string;
  name?: string;
  active?: boolean;
}

export interface B2BAdministrator {
  orgUnit: OrgUnit;
}

export interface FSCart extends Cart {
  insuranceQuote?: InsuranceQuote;
}

export interface InsuranceQuoteList {
  insuranceQuotes: InsuranceQuote[];
}

export interface InsuranceQuote {
  quoteId?: string;
  state?: QuoteBindingState;
  defaultCategory?: Occ.Category;
  quoteStatus?: QuoteStatus;
  quotePrice?: Occ.Price;
  paymentFrequency?: string;
}

export interface QuoteBindingState {
  code?: string;
}

export interface QuoteStatus {
  code?: string;
}

export enum BindingStateType {
  BIND = 'BIND',
  UNBIND = 'UNBIND',
}

export enum RequestType {
  INSURED_OBJECT_CHANGE = 'FSINSUREDOBJECT_CHANGE',
  COVERAGE_CHANGE = 'FSCOVERAGE_CHANGE',
  FSCLAIM = 'FSCLAIM',
}

export enum ClaimStatus {
  OPEN = 'OPEN',
  SUBMITTED = 'SUBMITTED',
  PROCESSING = 'PROCESSING',
  ERROR = 'ERROR',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}
export enum ChangeRequestStatus {
  SUBMITTED = 'SUBMITTED',
  REFERRED = 'REFERRED',
}
export enum StepStatus {
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

export interface FSOrderEntry extends OrderEntry {
  formData?: any[];
}

export interface FSPrice extends Price {
  oneTimeChargeEntries?: OneTimeChargeEntry[];
  recurringChargeEntries?: RecurringChargeEntry[];
}

export interface OneTimeChargeEntry {
  code?: string;
  name?: string;
  price?: Price;
  billingTime?: BillingTime;
  chargeInformation?: string;
}

export interface RecurringChargeEntry {
  price?: Price;
}

export interface BillingTime {
  code?: string;
  name?: string;
  description?: string;
}

export interface FSUserSignUp extends UserSignUp {
  dateOfBirth?: string;
  phoneNumber?: string;
}

export interface FSContactInfo {
  code?: string;
  phoneNumber?: string;
}

export interface FSUser extends User {
  dateOfBirth?: string;
  contactInfos?: FSContactInfo[];
}

export interface FSStepData {
  name?: string;
  sequenceNumber?: string;
  pageLabelOrId?: string;
  status?: string;
  yformConfigurator?: YFormData;
}

export interface FSUserRequest {
  requestId?: string;
  configurationSteps?: FSStepData[];
  requestStatus?: string;
}

export interface FSLocationOfLoss {
  code?: string;
  countryCode?: string;
  city?: string;
  postcode?: string;
  address?: string;
  additionalDetails?: string;
}

export interface Claim extends FSUserRequest {
  claimNumber?: string;
  locationOfLoss?: FSLocationOfLoss;
  causeOfLoss?: string;
  incidentType?: FSIncidentType;
  dateOfLoss?: string;
  timeOfLoss?: string;
  claimStatus?: ClaimStatus;
}

export interface AllowedFSRequestType {
  requestType?: FSRequestType;
}

export interface FSRequestType {
  code?: string;
}

export interface FSIncidentType {
  incidentCode?: string;
}

export interface ChangedPolicyData {
  changeType?: string;
  label?: string;
  oldValue?: string;
  newValue?: string;
}
