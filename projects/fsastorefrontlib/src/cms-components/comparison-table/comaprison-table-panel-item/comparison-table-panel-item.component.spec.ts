import { DebugElement, Pipe, PipeTransform, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  CmsConfig,
  I18nTestingModule,
  Product,
  RoutingService,
} from '@spartacus/core';
import { MediaModule, SpinnerModule } from '@spartacus/storefront';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { FSCartService } from './../../../core/cart/facade/cart.service';
import { FSCheckoutConfigService } from './../../../core/checkout/services/checkout-config.service';
import { FSProductService } from './../../../core/product-pricing/facade/product.service';
import { FSProduct } from './../../../occ/occ-models/occ.models';
import { ComparisonTablePanelItemComponent } from './comparison-table-panel-item.component';

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

const billingTimes = [
  {
    code: 'paynow',
    name: 'Paynow',
    helpContent: 'Test help content',
    orderNumber: 1,
  },
  {
    code: 'hospitalbenefit',
    name: 'Hospital Benefit',
    helpContent: 'Test help content',
    orderNumber: 2,
  },
];

const product: FSProduct = {
  code: 'TEST_PRODUCT',
  name: 'Test Product',
  price: {
    currencyIso: 'EUR',
    oneTimeChargeEntries: [
      {
        billingTime: {
          code: 'paynow',
        },
        price: {
          formattedValue: '€25.00',
        },
      },
    ],
  },
};
class MockCartService {
  createCartForProduct(): void {}
}

const mockCmsConfig: CmsConfig = {
  backend: {
    occ: {
      baseUrl: 'base-url',
      prefix: '/rest/v2/',
    },
  },

  context: {
    baseSite: ['test-site'],
  },
};

class MockRoutingService {
  go() {}
}

const nextStep = 'nextStep';

class MockFSCheckoutConfigService {
  getNextCheckoutStepUrl(): string {
    return nextStep;
  }
}

const mockActivatedRoute = {
  snapshot: {
    url: ['checkout', 'test'],
  },
};

class MockFSProductService {
  getCalculatedProductData(): Observable<Product> {
    return of();
  }
}

describe('ComparisonTablePanelItemComponent', () => {
  let comparisonTablePanelItemComponent: ComparisonTablePanelItemComponent;
  let fixture: ComponentFixture<ComparisonTablePanelItemComponent>;
  let mockCartService: FSCartService;
  let mockRoutingService: RoutingService;
  let mockCheckoutConfigService: FSCheckoutConfigService;
  let mockProductService: FSProductService;

  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        SpinnerModule,
        MediaModule,
        RouterTestingModule,
      ],
      providers: [
        {
          provide: FSCartService,
          useClass: MockCartService,
        },
        {
          provide: CmsConfig,
          useValue: mockCmsConfig,
        },
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        {
          provide: FSCheckoutConfigService,
          useClass: MockFSCheckoutConfigService,
        },
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute,
        },
        {
          provide: FSProductService,
          useClass: MockFSProductService,
        },
      ],
      declarations: [ComparisonTablePanelItemComponent, MockUrlPipe],
    }).compileComponents();
    mockCartService = TestBed.get(FSCartService as Type<FSCartService>);
    mockRoutingService = TestBed.get(RoutingService as Type<RoutingService>);
    mockCheckoutConfigService = TestBed.get(FSCheckoutConfigService as Type<
      FSCheckoutConfigService
    >);
    mockProductService = TestBed.get(FSProductService as Type<
      FSProductService
    >);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparisonTablePanelItemComponent);
    comparisonTablePanelItemComponent = fixture.componentInstance;
    comparisonTablePanelItemComponent.billingTimes = billingTimes;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(comparisonTablePanelItemComponent).toBeTruthy();
  });

  it('should create comparison panel item with product data', () => {
    spyOn(mockProductService, 'getCalculatedProductData').and.returnValue(
      of(product)
    );
    comparisonTablePanelItemComponent.ngOnInit();
    comparisonTablePanelItemComponent.product$
      .subscribe(productData => {
        expect(productData).toEqual(product);
      })
      .unsubscribe();
  });

  it('should not define price when product of comparison table panel item is not initialized', () => {
    spyOn(mockProductService, 'getCalculatedProductData').and.returnValue(
      of({})
    );
    comparisonTablePanelItemComponent.ngOnInit();
    expect(comparisonTablePanelItemComponent.productPrice).not.toBeTruthy();
  });

  it('should not define price when billing times are invalid', () => {
    const invalidProduct: FSProduct = {
      code: 'TEST_PRODUCT',
      name: 'Test Product',
      price: {
        currencyIso: 'EUR',
        oneTimeChargeEntries: [
          {
            billingTime: {
              code: 'invalid_billingTime_code',
            },
            price: {
              formattedValue: '€0.00',
            },
          },
        ],
      },
    };
    spyOn(mockProductService, 'getCalculatedProductData').and.returnValue(
      of(invalidProduct)
    );
    comparisonTablePanelItemComponent.ngOnInit();
    expect(comparisonTablePanelItemComponent.productPrice).not.toBeTruthy();
  });

  it('should create and start bundle for product', () => {
    spyOn(mockCartService, 'createCartForProduct').and.stub();
    comparisonTablePanelItemComponent.createCartAndStartBundleForProduct(
      'TEST_PRODUCT',
      'bundleTemplateId'
    );

    expect(mockCartService.createCartForProduct).toHaveBeenCalled();
  });

  it('should get base url', () => {
    const baseUrl = comparisonTablePanelItemComponent.getBaseUrl();
    expect(baseUrl).toEqual('base-url');
  });
});