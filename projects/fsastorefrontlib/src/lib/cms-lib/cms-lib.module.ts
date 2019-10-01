import { NgModule } from '@angular/core';
import { AccountModule } from './account/account.module';
import { BannerModule } from './banner/banner.module';
import { ProductFeatureModule } from './product-feature/product-feature.module';
import { ComparisonTableModule } from './comparison-table/comparison-table.module';
import { CategoryFormsModule } from './forms/cms-category-form-component/cms-category-forms.module';
import { CustomContainerModule } from './container/cms-custom-container.module';

@NgModule({
  imports: [
    AccountModule,
    BannerModule,
    ProductFeatureModule,
    ComparisonTableModule,
    CategoryFormsModule,
    CustomContainerModule,
  ],
  exports: [
    AccountModule,
    BannerModule,
    ProductFeatureModule,
    ComparisonTableModule,
    CategoryFormsModule,
    CustomContainerModule,
  ],
})
export class CmsLibModule {}
