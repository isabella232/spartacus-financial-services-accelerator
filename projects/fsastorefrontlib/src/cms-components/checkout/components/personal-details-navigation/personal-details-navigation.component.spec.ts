import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { FormDataService } from '@fsa/dynamicforms';
import { CartService, I18nTestingModule, RoutingService, Cart } from '@spartacus/core';
import { of, Observable } from 'rxjs';
import { FSCheckoutConfigService } from './../../../../core/checkout/services/fs-checkout-config.service';
import { PersonalDetailsNavigationComponent } from './personal-details-navigation.component';
import createSpy = jasmine.createSpy;

const mockCart: Cart = {
  code: '1234',
};

class MockActivatedRoute {
  params = of();
}
class MockRoutingService {
  go = createSpy();
}

class MockCheckoutConfigService {
  getNextCheckoutStepUrl(): string {
    return '';
  }
}

class MockCartService {
  getActive(): Observable<Cart> {
    return of(mockCart);
  }
}

describe('PersonalDetailsNavigationComponent', () => {
  let component: PersonalDetailsNavigationComponent;
  let fixture: ComponentFixture<PersonalDetailsNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [PersonalDetailsNavigationComponent],
      providers: [
        {
          provide: CartService,
          useClass: MockCartService,
        },
        {
          provide: FormDataService,
          useValue: FormDataService,
        },
        { 
          provide: RoutingService, 
          useClass: MockRoutingService 
        },
        {
          provide: FSCheckoutConfigService,
          useClass: MockCheckoutConfigService,
        },
        {
          provide: ActivatedRoute,
          useClass: MockActivatedRoute,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalDetailsNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
