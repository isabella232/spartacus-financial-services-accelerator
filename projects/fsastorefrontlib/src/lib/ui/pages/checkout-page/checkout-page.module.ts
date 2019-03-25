import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CmsPageGuard } from '@spartacus/storefront';
import { CheckoutPageComponent } from './checkout-page.component';
import { CheckoutPageLayoutModule } from '../../layout/checkout-page-layout/checkout-page-layout.module';

const routes: Routes = [
  {
    path: null,
    canActivate: [CmsPageGuard],
    component: CheckoutPageComponent,
    data: { cxPath: 'fsa-checkout' }
  },
  {
    path: 'Insurance-Products/:categoryTitle/:categoryType/c/:categoryCode',
    canActivate: [CmsPageGuard],
    redirectTo: null,
    data: { cxRedirectTo: 'fsa-checkout' }
  }
];

@NgModule({
  imports: [
    CommonModule,
    CheckoutPageLayoutModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CheckoutPageComponent],
  exports: [CheckoutPageComponent]
})
export class CheckoutPageModule { }
