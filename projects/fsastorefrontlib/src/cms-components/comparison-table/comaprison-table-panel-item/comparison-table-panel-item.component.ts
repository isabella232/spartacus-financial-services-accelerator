import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CmsConfig, RoutingService } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { FSCartService } from '../../../core/cart/facade';
import { FSCheckoutConfigService } from '../../../core/checkout/services/checkout-config.service';
import { FSProductService } from '../../../core/product-pricing/facade/product.service';
import {
  FSProduct,
  OneTimeChargeEntry,
  PricingData,
} from '../../../occ/occ-models';
import { CheckoutConfigService } from '@spartacus/storefront';

@Component({
  selector: 'cx-fs-comparison-table-panel-item',
  templateUrl: './comparison-table-panel-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComparisonTablePanelItemComponent implements OnInit, OnDestroy {
  @Input()
  productCode: string;
  @Input()
  billingTimes: any;
  @Input()
  pricingData: PricingData;
  checkoutStepUrlNext: string;
  productPrice: string;

  constructor(
    protected cartService: FSCartService,
    protected config: CmsConfig,
    protected routingService: RoutingService,
    protected checkoutConfigService: FSCheckoutConfigService,
    protected activatedRoute: ActivatedRoute,
    protected productService: FSProductService
  ) {}

  product$: Observable<FSProduct>;
  panelItemEntries: OneTimeChargeEntry[] = [];
  private subscription = new Subscription();

  ngOnInit() {
    this.checkoutStepUrlNext = this.checkoutConfigService.getNextCheckoutStepUrl(
      this.activatedRoute
    );

    this.getProductData();
  }

  getProductData() {
    this.product$ = this.productService.getCalculatedProductData(
      this.productCode,
      this.pricingData
    );
    this.subscription.add(
      this.product$
        .pipe(
          map(product => {
            if (product && product.price) {
              if (
                product.price.recurringChargeEntries &&
                product.price.recurringChargeEntries.length > 0
              ) {
                this.productPrice =
                  product.price.recurringChargeEntries[0].price.formattedValue;
              }
              if (
                product.price.oneTimeChargeEntries &&
                product.price.oneTimeChargeEntries.length > 0
              ) {
                product.price.oneTimeChargeEntries.forEach(
                  oneTimeChargeEntry => {
                    if (oneTimeChargeEntry.billingTime.code === 'paynow') {
                      this.productPrice =
                        oneTimeChargeEntry.price.formattedValue;
                    }
                  }
                );
                this.panelItemEntries = this.billingTimes.map(billingTime => {
                  return product.price.oneTimeChargeEntries.find(
                    entry => entry.billingTime.code === billingTime.code
                  );
                });
              }
            }
          })
        )
        .subscribe()
    );
  }

  createCartAndStartBundleForProduct(
    productCode: string,
    bundleTemplateId: string
  ) {
    this.cartService.createCartForProduct(
      productCode,
      bundleTemplateId,
      1,
      this.pricingData
    );

    this.subscription.add(
      this.product$
        .pipe(
          map(product => {
            let route = 'addOptions';
            let routingParam;
            if (product.configurable === true) {
              route = 'configureProduct';
              routingParam = product.code;
            }
            this.routingService.go({
              cxRoute: route,
              params: { code: routingParam },
            });
          })
        )
        .subscribe()
    );
  }

  getBaseUrl() {
    return this.config.backend.occ.baseUrl || '';
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
