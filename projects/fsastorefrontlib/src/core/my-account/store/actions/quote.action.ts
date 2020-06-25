import { Action } from '@ngrx/store';

export const LOAD_QUOTES = '[Quote] Load Quotes';
export const LOAD_QUOTES_SUCCESS = '[Quote] Load Quotes Success';
export const LOAD_QUOTES_FAIL = '[Quote] Load Quotes Fail';

export const UPDATE_QUOTE = '[Quote] Update Quote';
export const UPDATE_QUOTE_SUCCESS = '[Quote] Update Quote Success';
export const UPDATE_QUOTE_FAIL = '[Quote] Update Quote Fail';

export const QUOTE_PROCESS_ACTION = '[Quote] Quote Process Action';
export const UPDATE_INSURANCE_OBJECTS = '[Quote] Update Insurance Objects';

export class LoadQuotes implements Action {
  readonly type = LOAD_QUOTES;
  constructor(public payload: any) {}
}

export class LoadQuotesSuccess implements Action {
  readonly type = LOAD_QUOTES_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadQuotesFail implements Action {
  readonly type = LOAD_QUOTES_FAIL;
  constructor(public payload: any) {}
}

export class UpdateQuote implements Action {
  readonly type = UPDATE_QUOTE;
  constructor(public payload: any) {}
}

export class UpdateQuoteSuccess implements Action {
  readonly type = UPDATE_QUOTE_SUCCESS;
  constructor(public payload: any) {}
}

export class UpdateQuoteFail implements Action {
  readonly type = UPDATE_QUOTE_FAIL;
  constructor(public payload: any) {}
}

export class QuoteProcessAction implements Action {
  readonly type = QUOTE_PROCESS_ACTION;
  constructor(public payload: any) {}
}

export class UpdateInsuranceObjects implements Action {
  readonly type = UPDATE_INSURANCE_OBJECTS;
  constructor(public payload: any) {}
}

export type QuoteAction =
  | LoadQuotes
  | LoadQuotesSuccess
  | LoadQuotesFail
  | UpdateQuote
  | UpdateQuoteSuccess
  | QuoteProcessAction
  | UpdateInsuranceObjects;
