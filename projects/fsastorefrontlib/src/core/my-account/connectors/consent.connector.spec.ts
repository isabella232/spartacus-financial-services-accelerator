import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ConsentAdapter } from './consent.adapter';
import { ConsentConnector } from './consent.connector';
import createSpy = jasmine.createSpy;

class MockConsentAdapter extends ConsentAdapter {
  getConsents = createSpy('ConsentAdapter.getConsents').and.callFake(userId =>
    of('getConsents' + userId)
  );
  getOBOCustomerList = createSpy(
    'ConsentAdapter.getOBOCustomerList'
  ).and.callFake(userId => of('getOBOCustomerList' + userId));
}

const user = 'user';

describe('ConsentConnector', () => {
  let consentConnector: ConsentConnector;
  let consentAdapter: ConsentAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: ConsentAdapter, useClass: MockConsentAdapter }],
    });

    consentConnector = TestBed.inject(ConsentConnector);
    consentAdapter = TestBed.inject(ConsentAdapter);
  });

  it('should be created', () => {
    expect(consentConnector).toBeTruthy();
  });
  it('should call adapter for getConsents', () => {
    consentConnector.getConsents(user);
    expect(consentAdapter.getConsents).toHaveBeenCalledWith(user);
  });
  it('should call adapter to get OBO Customer List', () => {
    consentConnector.getOBOCustomerList(user);
    expect(consentAdapter.getOBOCustomerList).toHaveBeenCalledWith(user);
  });
});