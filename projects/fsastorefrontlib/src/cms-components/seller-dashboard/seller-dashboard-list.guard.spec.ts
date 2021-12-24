import { TestBed } from '@angular/core/testing';
import { GlobalMessageService, RoutingService } from '@spartacus/core';
import { FSUser } from '@spartacus/fsa-storefront';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { of } from 'rxjs';

import { SellerDashboardListGuard } from './seller-dashboard-list.guard';
import createSpy = jasmine.createSpy;

const mockUserDetails: FSUser = {
  uid: 'test@tester.com',
  active: true,
};

class MockUserAccountFacade implements Partial<UserAccountFacade> {
  get = createSpy('get').and.returnValue(of(mockUserDetails));
}

class MockGlobalMessageService {
  add(arg) {}
}

class MockRoutingService {
  go() {}
}

describe('SellerDashboardListGuard', () => {
  let routingService: RoutingService;
  let mockedUserAccountFacade: UserAccountFacade;
  let globalMessageService: GlobalMessageService;
  let guard: SellerDashboardListGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        { provide: UserAccountFacade, useClass: MockUserAccountFacade },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
      ],
    });
    guard = TestBed.inject(SellerDashboardListGuard);
    routingService = TestBed.inject(RoutingService);
    globalMessageService = TestBed.inject(GlobalMessageService);
    mockedUserAccountFacade = TestBed.inject(UserAccountFacade);
    spyOn(routingService, 'go').and.stub();
  });

  it('should return true when admin role found', () => {
    let result: boolean;
    mockUserDetails.roles = ['sellergroup'];

    guard
      .canActivate()
      .subscribe(value => (result = value))
      .unsubscribe();

    expect(result).toEqual(true);
  });

  it('should return false when customergroup role not found', () => {
    let result: boolean;
    mockUserDetails.roles = ['customergroup'];

    guard
      .canActivate()
      .subscribe(value => (result = value))
      .unsubscribe();

    expect(result).toEqual(false);
  });

  it('should make redirect and show global message when no roles', () => {
    let result: boolean;
    mockUserDetails.roles = [];

    guard
      .canActivate()
      .subscribe(value => (result = value))
      .unsubscribe();

    expect(routingService.go).toHaveBeenCalledWith({ cxRoute: '/' });
    expect(result).toEqual(false);
  });
});