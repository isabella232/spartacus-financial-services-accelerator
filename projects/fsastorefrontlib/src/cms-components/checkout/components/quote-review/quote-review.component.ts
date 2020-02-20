import { FSCartService } from './../../../../core/cart/facade/fs-cart.service';
import { BindQuoteDialogComponent } from './../bind-quote-dialog/bind-quote-dialog.component';
import {
  FSCart,
  BindingStateType,
} from './../../../../occ/occ-models/occ.models';
import { map } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart, OccConfig, RoutingService } from '@spartacus/core';
import { Observable, Subscription, of } from 'rxjs';
import { FSCheckoutConfigService } from '../../../../core/checkout/services';
import { ModalService, ModalRef } from '@spartacus/storefront';

@Component({
  selector: 'fsa-quote-review',
  templateUrl: './quote-review.component.html',
})
export class QuoteReviewComponent implements OnInit, OnDestroy {
  cart$: Observable<Cart>;
  showContent$: Observable<boolean> = of(true);
  cartLoaded$: Observable<boolean>;
  checkoutStepUrlNext: string;
  checkoutStepUrlBack: string;
  subscription = new Subscription();
  modalRef: ModalRef;
  cartCode: string;

  constructor(
    protected cartService: FSCartService,
    protected config: OccConfig,
    protected routingService: RoutingService,
    protected checkoutConfigService: FSCheckoutConfigService,
    protected activatedRoute: ActivatedRoute,
    protected modalService: ModalService
  ) {}

  ngOnInit() {
    this.checkoutStepUrlNext = this.checkoutConfigService.getNextCheckoutStepUrl(
      this.activatedRoute
    );
    this.checkoutStepUrlBack = this.checkoutConfigService.getPreviousCheckoutStepUrl(
      this.activatedRoute
    );
    this.cart$ = this.cartService.getActive();
    this.cartLoaded$ = this.cartService.getLoaded();
  }

  getBaseUrl() {
    return this.config.backend.occ.baseUrl || '';
  }

  back() {
    this.routingService.go(this.checkoutStepUrlBack);
  }

  continue() {
    this.cart$
      .subscribe(activeCart => {
        this.cartCode = activeCart.code;
        const bindingState = (<FSCart>activeCart).insuranceQuote.state.code;
        if (bindingState === BindingStateType.UNBIND) {
          this.openModal();
        } else {
          this.routingService.go(this.checkoutStepUrlNext);
        }
      })
      .unsubscribe();
  }

  private openModal() {
    let modalInstance: any;
    this.modalRef = this.modalService.open(BindQuoteDialogComponent, {
      centered: true,
      size: 'lg',
    });
    modalInstance = this.modalRef.componentInstance;
    modalInstance.cartCode = this.cartCode;
    modalInstance.nextStepUrl = this.checkoutStepUrlNext;
    this.subscription.add(
      this.modalRef.componentInstance.quoteBinding$
        .pipe(
          map(quoteBinding => {
            this.showContent$ = of(!quoteBinding);
          })
        )
        .subscribe()
    );
  }

  getFormContent(cart: any): any {
    if (
      cart &&
      cart.deliveryOrderGroups.length > 0 &&
      cart.deliveryOrderGroups[0].entries.length > 0 &&
      cart.deliveryOrderGroups[0].entries[0].formDataData
    ) {
      return JSON.parse(
        cart.deliveryOrderGroups[0].entries[0].formDataData[0].content
      );
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
