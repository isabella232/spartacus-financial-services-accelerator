import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CartActions } from '@spartacus/core';
import { OccFSCartAdapter } from '../../../../occ/services/cart/occ-fs-cart.adapter';
import * as fromActions from '../actions/fs-cart.action';

@Injectable()
export class FSCartEffects {
  @Effect()
  addOptionalProduct$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.ADD_OPTIONAL_PRODUCT),
    map((action: fromActions.AddOptionalProduct) => action.payload),
    switchMap(payload => {
      return this.occCartAdapter
        .addToCart(
          payload.userId,
          payload.cartId,
          payload.productCode,
          payload.quantity,
          payload.entryNumber
        )
        .pipe(
          map((entry: any) => {
            return new CartActions.CartAddEntrySuccess(entry);
          }),
          catchError(error => of(new CartActions.CartAddEntryFail(error)))
        );
    })
  );

  @Effect()
  startBundle$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.START_BUNDLE),
    map((action: fromActions.StartBundle) => action.payload),
    switchMap(payload => {
      return this.occCartAdapter
        .startBundle(
          payload.userId,
          payload.cartId,
          payload.productCode,
          payload.bundleTemplateId,
          payload.quantity,
          payload.pricingData
        )
        .pipe(
          map((cart: any) => {
            const cartCode =
              payload.userId === 'anonymous' ? payload.cartId : cart.cartCode;
            if (cart.cartCode !== payload.cartId) {
              return new CartActions.LoadCart({
                userId: payload.userId,
                cartId: cartCode,
              });
            } else {
              return new CartActions.CartAddEntrySuccess(cart.entry);
            }
          })
        );
    })
  );

  constructor(
    private actions$: Actions,
    private occCartAdapter: OccFSCartAdapter
  ) {}
}
