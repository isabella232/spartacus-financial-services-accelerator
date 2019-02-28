import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { CmsModule, ComponentsModule } from '@spartacus/storefront';
import { effects } from '../../my-account/assets/store';
import { LogoutModule } from './logout/logout.module';
import { CMSViewPoliciesComponent } from './view-policies/view-policies.component';
import { CMSViewQuotesComponent } from './view-quotes/view-quotes.component';
import { ConfigModule, CmsConfig } from '@spartacus/core';

@NgModule({
  imports: [
    CommonModule,
    CmsModule,
    RouterModule,
    LogoutModule,
    EffectsModule.forFeature(effects),
    ComponentsModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CMSViewPoliciesComponent: { selector: 'fsa-view-policies' },
        CMSViewQuotesComponent: { selector: 'fsa-view-quotes' },
        CMSInboxComponent: { selector: 'fsa-inbox' },
        CMSInboxTabComponent: { selector: 'fsa-inbox-tab' }
       }
    }),
  ],
  declarations: [ CMSViewPoliciesComponent, CMSViewQuotesComponent ],
  exports: [ CMSViewPoliciesComponent, CMSViewQuotesComponent ],
  entryComponents: [ CMSViewPoliciesComponent, CMSViewQuotesComponent ]
})
export class AccountModule { }
