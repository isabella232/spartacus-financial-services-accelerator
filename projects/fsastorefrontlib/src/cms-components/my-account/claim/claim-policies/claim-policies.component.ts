import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AuthService, OccConfig } from '@spartacus/core';
import {
  ClaimService,
  PolicyService,
} from '../../../../core/my-account/services';
import * as fromPolicyStore from '../../../../core/my-account/store';
import { take } from 'rxjs/operators';

@Component({
  selector: 'fsa-claim-policies',
  templateUrl: './claim-policies.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClaimPoliciesComponent implements OnInit {
  constructor(
    protected store: Store<fromPolicyStore.UserState>,
    protected policyService: PolicyService,
    protected claimService: ClaimService,
    protected config: OccConfig,
    protected authService: AuthService
  ) {}

  claimPolicies$;
  claimPoliciesLoaded$;
  isSelected: number;

  ngOnInit() {
    // Fixing insurances_auto until:
    // we get the BE part returning real categoryCode
    // we create dynamic content for FNOL page
    this.policyService.loadClaimPolicies('insurances_auto');
    this.claimPolicies$ = this.store.pipe(
      select(fromPolicyStore.getClaimPolicies)
    );
    this.claimPoliciesLoaded$ = this.store.pipe(
      select(fromPolicyStore.getClaimPoliciesLoaded)
    );
  }
  public getBaseUrl() {
    return this.config.backend.occ.baseUrl || '';
  }
  selectPolicy(policyId, contractId) {
    this.authService
      .getOccUserId()
      .pipe(take(1))
      .subscribe(occUserId =>
        this.claimService.setSelectedPolicy(occUserId, policyId, contractId)
      );
  }
}
