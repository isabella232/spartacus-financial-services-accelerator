import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import * as fromPolicyStore from '../../store';
import { Store, select } from '@ngrx/store';
import { OccConfig } from '@spartacus/core';

@Component({
  selector: 'fsa-premium-calendar',
  templateUrl: './premium-calendar.component.html',
  styleUrls: ['./premium-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PremiumCalendarComponent implements OnInit {
  constructor(
    private store: Store<fromPolicyStore.UserState>,
    private config: OccConfig
  ) {}

  policies$;
  policiesLoaded$;

  noPoliciesText = 'You have no Policies!';

  ngOnInit() {
    this.policies$ = this.store.pipe(select(fromPolicyStore.getPremiumCalendar));
    this.policiesLoaded$ = this.store.pipe(select(fromPolicyStore.getPremiumCalendarLoaded));
  }

  public getBaseUrl() {
    return this.config.server.baseUrl || '';
  }
}
