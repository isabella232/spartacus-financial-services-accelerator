import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { I18nTestingModule, OccConfig, RoutingService } from '@spartacus/core';
import { ModalService, SpinnerModule } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { FSCartService } from './../../../../core/cart/facade/cart.service';
import { FSCheckoutConfigService } from './../../../../core/checkout/services/checkout-config.service';
import { FSTranslationService } from './../../../../core/i18n/facade/translation.service';
import { AccordionModule } from './../../../../shared/accordion/accordion.module';
import { BindQuoteDialogComponent } from './../bind-quote-dialog/bind-quote-dialog.component';
import { ReferredQuoteDialogComponent } from './../refffered-quote/referred-quote-dialog.component';
import { QuoteReviewComponent } from './quote-review.component';

const formDataContent = '{"content":"formContent"}';
const categoryCode = 'insurances_auto';

class MockActivatedRoute {
  params = of();
}

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
      legacy: false,
    },
  },
};

class FSCartServiceStub {
  getActive() {}
  isStable() {}
}
class MockCategoryService {
  getActiveCategory(): Observable<string> {
    return of(categoryCode);
  }
}
class MockRoutingService {
  go() {}
}

class FSCheckoutConfigServiceStub {
  getNextCheckoutStepUrl() {}
  getPreviousCheckoutStepUrl() {
    return 'url/:formCode';
  }
}

class MockFSTranslationService {
  getTranslationValue() {}
}

const modalInstance: any = {
  componentInstance: {
    cartCode: '',
    nextStepUrl: '',
    quoteBinding$: of(false),
    referredQuote$: of(false),
  },
};

const modalService = jasmine.createSpyObj('ModalService', ['open']);

describe('Quote Review Component', () => {
  let component: QuoteReviewComponent;
  let fixture: ComponentFixture<QuoteReviewComponent>;
  let routingService: RoutingService;
  let translationService: FSTranslationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SpinnerModule, AccordionModule, I18nTestingModule],
      declarations: [QuoteReviewComponent],
      providers: [
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        {
          provide: ActivatedRoute,
          useValue: MockActivatedRoute,
        },
        {
          provide: FSCheckoutConfigService,
          useClass: FSCheckoutConfigServiceStub,
        },
        {
          provide: OccConfig,
          useValue: MockOccModuleConfig,
        },
        {
          provide: FSCartService,
          useClass: FSCartServiceStub,
        },
        {
          provide: ModalService,
          useValue: modalService,
        },
        {
          provide: FSTranslationService,
          useClass: MockFSTranslationService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    routingService = TestBed.inject(RoutingService);
    translationService = TestBed.inject(FSTranslationService);
    spyOn(routingService, 'go').and.stub();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should continue to next step when quote is in state BIND', () => {
    component.cart$ = of({
      code: 'cartCode',
      insuranceQuote: {
        state: {
          code: 'BIND',
        },
        quoteWorkflowStatus: {
          code: 'APPROVED',
        },
      },
    });
    component.continue();
    expect(routingService.go).toHaveBeenCalled();
  });

  it('should not continue to the next step when quote is in state UNBIND', () => {
    modalService.open.and.returnValue(modalInstance);
    component.cart$ = of({
      code: 'cartCode',
      insuranceQuote: {
        state: {
          code: 'UNBIND',
        },
        quoteWorkflowStatus: {
          code: 'APPROVED',
        },
      },
    });

    component.continue();
    expect(routingService.go).not.toHaveBeenCalled();
    expect(modalService.open).toHaveBeenCalledWith(BindQuoteDialogComponent, {
      centered: true,
      size: 'lg',
    });
    let result;
    component.showContent$.subscribe(showContent => (result = showContent));
    expect(result).toEqual(true);
  });

  it('should open ReferredQuoteDialog popup', () => {
    modalService.open.and.returnValue(modalInstance);
    component.cart$ = of({
      code: 'cartCode',
      insuranceQuote: {
        state: {
          code: 'BIND',
        },
        quoteWorkflowStatus: {
          code: 'REFERRED',
        },
      },
    });

    component.continue();
    expect(routingService.go).not.toHaveBeenCalled();
    expect(modalService.open).toHaveBeenCalledWith(
      ReferredQuoteDialogComponent,
      {
        centered: true,
        size: 'lg',
      }
    );
    let result;
    component.showContent$.subscribe(showContent => (result = showContent));
    expect(result).toEqual(true);
  });

  it('should go back to previous step', () => {
    component.back();
    expect(routingService.go).toHaveBeenCalled();
  });

  it('should not get form content 1', () => {
    const content = component.getFormContent({});
    expect(content).toEqual(undefined);
  });

  it('should not get form content 2', () => {
    const content = component.getFormContent({ deliveryOrderGroups: [] });
    expect(content).toEqual(undefined);
  });

  it('should not get form content 3', () => {
    const content = component.getFormContent({
      deliveryOrderGroups: [{ entries: [] }],
    });
    expect(content).toEqual(undefined);
  });

  it('should not get form content 4', () => {
    const content = component.getFormContent({
      deliveryOrderGroups: [{ entries: [{}] }],
    });
    expect(content).toEqual(undefined);
  });

  it('should not get form content 4', () => {
    const content = component.getFormContent({
      deliveryOrderGroups: [{ entries: [{ formData: [] }] }],
    });
    expect(content).toEqual(undefined);
  });

  it('should get form content', () => {
    const content = component.getFormContent({
      deliveryOrderGroups: [
        { entries: [{ formData: [{ content: formDataContent }] }] },
      ],
    });
    const parsedContent = JSON.parse(formDataContent);
    expect(content).toEqual(parsedContent);
  });

  it('should get base url', () => {
    const baseUrl = component.getBaseUrl();
    expect(baseUrl).toEqual('');
  });

  it('should find translation for key', () => {
    spyOn(translationService, 'getTranslationValue').and.returnValue(
      'test value'
    );
    const translationValue = component.getTranslation(
      'insurances_auto',
      'vehicleMake'
    );
    expect(translationValue).toEqual('test value');
  });
});
