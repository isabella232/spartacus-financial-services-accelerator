import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { PrefillResolver } from '@fsa/dynamicforms';
import { FSCartService } from '../../../core/cart/facade/cart.service';

@Injectable({
  providedIn: 'root',
})
export class CartEntriesPrefillResolver implements PrefillResolver {
  constructor(protected cartService: FSCartService) {}

  getPrefillValue() {
    return this.cartService.getActive().pipe(
      map(cart => {
        const productCodes = [];
        cart.entries.forEach(entry => {
          if (entry.product) {
            productCodes.push(entry.product.code);
          }
        });
        return productCodes.toString();
      })
    );
  }
}
