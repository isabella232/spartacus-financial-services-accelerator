import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { I18nModule, CmsModule, AuthGuard } from '@spartacus/core';
import { PageLayoutComponent, CmsPageGuard } from '@spartacus/storefront';
import { FSUpdateProfileModule } from './update-profile/fs-update-profile.module';
import { InboxModule } from './inbox/inbox.module';
import { PolicyModule } from './policy/policy.module';
import { QuoteModule } from './quote/quote.module';
import { ClaimModule } from './claim/claim.module';
import { PremiumCalendarModule } from './premium-calendar/premium-calendar.module';

const routes: Routes = [
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'paymentDetails',
      pageLabel: 'payment-details',
    },
    component: PageLayoutComponent,
  },
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'orderHistory',
      pageLabel: 'orders',
    },
    component: PageLayoutComponent,
  },
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'accountOverview',
      pageLabel: 'account-overview',
    },
    component: PageLayoutComponent,
  },
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'consentManagment',
      pageLabel: 'consents',
    },
    component: PageLayoutComponent,
  },
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'personalDetails',
      pageLabel: 'fs-update-profile',
    },
    component: PageLayoutComponent,
  },
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'updateEmail',
      pageLabel: 'update-email',
    },
    component: PageLayoutComponent,
  },
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'updatePasswordComp',
      pageLabel: 'updatePassword',
    },
    component: PageLayoutComponent,
  },
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'closeAccount',
      pageLabel: 'close-account',
    },
    component: PageLayoutComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    CmsModule,
    I18nModule,
    FSUpdateProfileModule,
    InboxModule,
    PolicyModule,
    QuoteModule,
    ClaimModule,
    PremiumCalendarModule,
    RouterModule,
    RouterModule.forChild(routes),
  ],
})
export class MyAccountModule {}
