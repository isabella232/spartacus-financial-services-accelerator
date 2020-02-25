import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { filter, switchMap, take } from 'rxjs/operators';
import * as fromAction from '../store/actions';
import * as fromReducer from '../store/reducers';
import * as fromSelector from '../store/selectors';
import { AuthService } from '@spartacus/core';
@Injectable({
  providedIn: 'root',
})
export class FSProductAssignmentService {
  constructor(
    protected store: Store<fromReducer.ProductAssignmentState>,
    protected authService: AuthService
  ) {}

  loadProductAssignmentsForUnit(
    userId: string,
    orgUnitId: string,
    pageSize?: number,
    currentPage?: number,
    sort?: string
  ) {
    this.store.dispatch(
      new fromAction.LoadProductAssignments({
        userId,
        orgUnitId,
        pageSize,
        currentPage,
        sort,
      })
    );
  }

  getProductAssignments(): Observable<any> {
    return this.store.select(fromSelector.getLoaded).pipe(
      filter(loaded => loaded),
      take(1),
      switchMap(() => {
        return this.store.select(fromSelector.getProductAssignments);
      })
    );
  }
}
