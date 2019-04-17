import { ChangeDetectorRef, Component } from '@angular/core';
import {
  CartDataService, CheckoutService, GlobalMessageService,
  GlobalMessageType, RoutingService, Address, PaymentDetails, UserService
} from '@spartacus/core';
import { MultiStepCheckoutComponent } from '@spartacus/storefront';
import { filter } from 'rxjs/operators';
import { FSCartService } from '../../services/fs-cart.service';
import { checkoutNavBar } from './fsa-checkout-navigation-bar';

@Component({
  selector: 'fsa-multi-step-checkout',
  templateUrl: './fsa-multi-step-checkout.component.html'
})
export class FsaMultiStepCheckoutComponent extends MultiStepCheckoutComponent {
  step = 2;
  navs = checkoutNavBar;
  anonymous = true;

  constructor(
    protected checkoutService: CheckoutService,
    protected cartService: FSCartService,
    protected cartDataService: CartDataService,
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService,
    protected cd: ChangeDetectorRef,
    protected userService: UserService
  ) {
    super(checkoutService, cartService, cartDataService, routingService, globalMessageService, cd);
  }

  processSteps() {
    // step2: add main product
    this.subscriptions.push(
      this.cartService.mainProductAdded
        .pipe(filter(poductCode => Object.keys(poductCode).length !== 0 && this.step === 2))
        .subscribe(state => {
          this.nextStep(3);
        }));

    // step6: set payment information
    this.subscriptions.push(
      this.checkoutService
        .getPaymentDetails()
        .pipe(
          filter(
            paymentInfo =>
              Object.keys(paymentInfo).length !== 0 && this.step === 6
          )
        )
        .subscribe(paymentInfo => {
          if (!paymentInfo['hasError']) {
            this.paymentDetails = paymentInfo;
            // this.nextStep(7);
            this.done = true;
            this.routingService.go({ route: ['orderConfirmation'] });
          } else {
            Object.keys(paymentInfo).forEach(key => {
              if (key.startsWith('InvalidField')) {
                this.globalMessageService.add({
                  type: GlobalMessageType.MSG_TYPE_ERROR,
                  text: 'InvalidField: ' + paymentInfo[key]
                });
              }
            });
            this.checkoutService.clearCheckoutStep(6);
          }
        })
    );

    // authentication
    this.subscriptions.push(this.userService.get().subscribe(user => {
      if (user.uid !== undefined) {
        this.anonymous = false;
      } else {
        this.anonymous = true;
      }
    }));
  }

  addPaymentInfo({
    newPayment,
    payment,
    billingAddress
  }: {
    newPayment: boolean;
    payment: PaymentDetails;
    billingAddress: Address;
  }): void {
    payment.billingAddress = billingAddress
      ? billingAddress
      : payment.billingAddress;
    if (newPayment) {
      if (!billingAddress) {
        this.checkoutService.getDeliveryAddress().subscribe(data => {
          payment.billingAddress = data;
        });
      }
      this.checkoutService.createPaymentDetails(payment);
      return;
    }
    this.checkoutService.setDeliveryMode('financial-default');
    this.checkoutService.setPaymentDetails(payment);
  }

  nextStep(step: number) {
    if (step >= 4 && this.anonymous) {
      this.routingService.goByUrl('login');
    } else {
      super.nextStep(step);
    }
  }
}
