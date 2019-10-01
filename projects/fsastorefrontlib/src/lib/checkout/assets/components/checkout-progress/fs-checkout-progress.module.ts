import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  Config,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { FSCheckoutConfig } from 'projects/fsastorefrontlib/src/cms-components/checkout/config/fs-checkout-config';
import { FSCheckoutProgressComponent } from './fs-checkout-progress.component';

@NgModule({
  imports: [
    CommonModule,
    UrlModule,
    I18nModule,
    RouterModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutProgress: {
          component: FSCheckoutProgressComponent,
        },
      },
    }),
  ],
  declarations: [FSCheckoutProgressComponent],
  entryComponents: [FSCheckoutProgressComponent],
  exports: [FSCheckoutProgressComponent],
  providers: [{ provide: FSCheckoutConfig, useExisting: Config }],
})
export class FSCheckoutProgressModule {}
