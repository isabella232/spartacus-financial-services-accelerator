import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// ContentPage
import { QuotesPageModule } from './quotes-page/quotes-page.module';
import { PoliciesPageModule } from './policies-page/policies-page.module';
import { ClaimsPageModule } from './claims-page/claims-page.module';
import { PolicyDetailsPageModule } from './policy-details-page/policy-details-page.module';
import { PremiumCalendarPageModule } from './premium-calendar-page/premium-calendar-page.module';
import { FSCategoryPageModule } from './fs-category-page/fs-category-page.module';
import { QuotesReviewPageModule } from './quotes-review-page/quotes-review-page.module';

const pageModules = [
    QuotesPageModule,
    PoliciesPageModule,
    ClaimsPageModule,
    PolicyDetailsPageModule,
    PremiumCalendarPageModule,
    FSCategoryPageModule,
    QuotesReviewPageModule
];

@NgModule({
    imports: [CommonModule, ...pageModules],
    declarations: [],
    exports: [...pageModules]
})

export class PagesModule {
}
