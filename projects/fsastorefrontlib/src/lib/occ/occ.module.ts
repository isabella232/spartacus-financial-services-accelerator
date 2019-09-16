import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { Config, OccConfig } from '@spartacus/core';
import { OccClaimService } from './claim/claim.service';

import { OccQuoteService } from './quote/quote.service';
import { OccPolicyService } from './policy/policy.service';
import { OccInboxService } from './inbox/inbox.service';

import {OccFSCartService} from './cart/fs-cart.service';
import { OccBillingTimeService } from './billing-time/billing-time.service';
import { OccUserRequestService } from './user-request/user-request.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    OccQuoteService,
    OccPolicyService,
    OccClaimService,
    OccInboxService,
    OccFSCartService,
    OccBillingTimeService,
    OccUserRequestService,
    { provide: OccConfig, useExisting: Config }
  ]
})
export class OccModule {}
