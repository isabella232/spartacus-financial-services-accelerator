import { ActiveCartService } from '@spartacus/core';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { PrefillResolver } from '@fsa/dynamicforms';

@Injectable({
  providedIn: 'root',
})
export class CartPrefillResolver implements PrefillResolver {
  constructor(protected cartService: ActiveCartService) {}

  getFieldValue(fieldPath: string) {
    const attributes = fieldPath.split('.');
    let currentValue;
    return this.cartService.getActive().pipe(
      map(cart => {
        const preparedCart = this.serializeQuoteDetails(cart);
        currentValue = preparedCart;
        attributes.forEach(attribute => {
          if (this.isArrayAttribute(attribute)) {
            const attributeName = attribute.split('[')[0];
            const arrayPosition = attribute.split('[')[1].slice(0, 1);
            currentValue = currentValue[attributeName][arrayPosition];
          } else {
            currentValue = currentValue[attribute];
          }
        });
        return currentValue;
      })
    );
  }

  isArrayAttribute(attribute: string) {
    if (attribute.indexOf('[') !== -1) {
      return true;
    }
    return false;
  }

  serializeQuoteDetails(cart): any {
    if (cart && cart.insuranceQuote && cart.insuranceQuote.quoteDetails) {
      const quoteDetails = cart.insuranceQuote.quoteDetails;
      if (quoteDetails && quoteDetails.entry) {
        const serilizedQuoteDetails = {};
        cart.insuranceQuote.quoteDetails.entry.forEach(entry => {
          serilizedQuoteDetails[entry.key] = entry.value;
        });
        cart.insuranceQuote.quoteDetails = serilizedQuoteDetails;
      }
    }
    return cart;
  }
}
