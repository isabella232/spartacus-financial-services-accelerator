var ROUTES_INDEX = {"name":"<root>","kind":"module","className":"AppModule","children":[{"name":"routes","filename":"projects/fsastorefrontlib/src/cms-components/checkout/checkout.module.ts","module":"CheckoutModule","children":[{"path":null,"canActivate":["CmsPageGuard","CategoryStepGuard"],"data":{"cxRoute":"generalInformation","pageLabel":"generalInformationForm"},"component":"PageLayoutComponent"},{"path":null,"canActivate":["CmsPageGuard","BindQuoteGuard"],"data":{"cxRoute":"addOptions","pageLabel":"add-options"},"component":"PageLayoutComponent"},{"path":null,"canActivate":["CmsPageGuard","CategoryStepGuard","AuthGuard","AutoPersonalDetailsGuard","BindQuoteGuard"],"data":{"cxRoute":"checkoutPersonalDetails","pageLabel":"personal-details"},"component":"PageLayoutComponent"},{"path":null,"canActivate":["AuthGuard","CmsPageGuard","PersonalDetailsSetGuard"],"data":{"cxRoute":"quoteReview","pageLabel":"quote-review"},"component":"PageLayoutComponent"},{"path":null,"canActivate":["AuthGuard","CmsPageGuard","CheckoutStepGuard","QuoteNotBoundGuard","ReferredQuoteGuard"],"data":{"cxRoute":"checkoutPaymentDetails","pageLabel":"checkout-payment-details"},"component":"PageLayoutComponent"},{"path":null,"canActivate":["AuthGuard","CmsPageGuard","CartNotEmptyGuard","PaymentDetailsSetGuard","ReferredQuoteGuard"],"data":{"cxRoute":"finalReview","pageLabel":"final-review"},"component":"PageLayoutComponent"},{"path":null,"canActivate":["AuthGuard","CmsPageGuard"],"data":{"cxRoute":"orderConfirmation","pageLabel":"orderConfirmationPage"},"component":"PageLayoutComponent"},{"path":null,"canActivate":["AuthGuard","CmsPageGuard","CheckoutStepGuard","CartNotEmptyGuard","QuoteNotBoundGuard"],"data":{"cxRoute":"legalInformation","pageLabel":"legalInformationPage"},"component":"PageLayoutComponent"},{"path":null,"canActivate":["AuthGuard","CmsPageGuard","CheckoutStepGuard","CartNotEmptyGuard","QuoteNotBoundGuard","LegalInformationSetGuard"],"data":{"cxRoute":"userIdentification","pageLabel":"userIdentificationPage"},"component":"PageLayoutComponent"}],"kind":"module"},{"name":"routes","filename":"projects/fsastorefrontlib/src/cms-components/checkout/components/configure-product/product-configuration.module.ts","module":"ProductConfigurationModule","children":[{"path":null,"canActivate":["CmsPageGuard","CategoryStepGuard"],"data":{"cxRoute":"configureProduct","pageLabel":"productDetails"},"component":"PageLayoutComponent"}],"kind":"module"},{"name":"routes","filename":"projects/fsastorefrontlib/src/cms-components/change-process/change-process.module.ts","module":"ChangeProcessModule","children":[{"path":null,"canActivate":["AuthGuard","CmsPageGuard","ChangeRequestSubmissionGuard"],"data":{"cxRoute":"changeCarDetailsPage","pageLabel":"changeCarDetailsPage"},"component":"PageLayoutComponent"},{"path":null,"canActivate":["AuthGuard","CmsPageGuard","ChangeRequestSubmissionGuard"],"data":{"cxRoute":"changeCoveragePage","pageLabel":"changeCoveragePage"},"component":"PageLayoutComponent"},{"path":null,"canActivate":["AuthGuard","CmsPageGuard","ChangeRequestSubmissionGuard"],"data":{"cxRoute":"changeSimulationPage","pageLabel":"changeSimulationPage"},"component":"PageLayoutComponent"}],"kind":"module"},{"name":"routes","filename":"projects/fsastorefrontlib/src/cms-components/user/register/register.module.ts","module":"FSRegisterModule","children":[{"path":"login/register","redirectTo":"register"},{"path":"register","data":{"cxRoute":"register","pageLabel":"register"},"component":"PageLayoutComponent"}],"kind":"module"},{"name":"routes","filename":"projects/fsastorefrontlib/src/cms-components/fnol/fnol.module.ts","module":"FnolModule","children":[{"path":null,"canActivate":["AuthGuard","CmsPageGuard","ClaimConfirmationGuard"],"data":{"cxRoute":"fnolIncidentPage","pageLabel":"fnolIncidentPage"},"component":"PageLayoutComponent"},{"path":null,"canActivate":["AuthGuard","CmsPageGuard","ClaimConfirmationGuard"],"data":{"cxRoute":"fnolIncidentReportPage","pageLabel":"fnolIncidentReportPage"},"component":"PageLayoutComponent"},{"path":null,"canActivate":["AuthGuard","CmsPageGuard","ClaimConfirmationGuard"],"data":{"cxRoute":"fnolGeneralInfoPage","pageLabel":"fnolGeneralInfoPage"},"component":"PageLayoutComponent"},{"path":null,"canActivate":["AuthGuard","CmsPageGuard","ClaimConfirmationGuard"],"data":{"cxRoute":"fnolSummaryPage","pageLabel":"fnolSummaryPage"},"component":"PageLayoutComponent"},{"path":null,"canActivate":["AuthGuard","CmsPageGuard"],"data":{"cxRoute":"fnolConfirmationPage","pageLabel":"fnolConfirmationPage"},"component":"PageLayoutComponent"}],"kind":"module"},{"name":"routes","filename":"projects/fsastorefrontlib/src/cms-components/my-account/myaccount.module.ts","module":"MyAccountModule","children":[{"path":null,"canActivate":["AuthGuard","CmsPageGuard"],"data":{"cxRoute":"paymentDetails","pageLabel":"payment-details"},"component":"PageLayoutComponent"},{"path":null,"canActivate":["AuthGuard","CmsPageGuard"],"data":{"cxRoute":"orderHistory","pageLabel":"orders"},"component":"PageLayoutComponent"},{"path":null,"canActivate":["AuthGuard","CmsPageGuard"],"data":{"cxRoute":"accountOverview","pageLabel":"account-overview"},"component":"PageLayoutComponent"},{"path":null,"canActivate":["AuthGuard","CmsPageGuard"],"data":{"cxRoute":"consentManagment","pageLabel":"consents"},"component":"PageLayoutComponent"},{"path":null,"canActivate":["AuthGuard","CmsPageGuard"],"data":{"cxRoute":"personalDetails","pageLabel":"fs-update-profile"},"component":"PageLayoutComponent"},{"path":null,"canActivate":["AuthGuard","CmsPageGuard"],"data":{"cxRoute":"updateEmail","pageLabel":"update-email"},"component":"PageLayoutComponent"},{"path":null,"canActivate":["AuthGuard","CmsPageGuard"],"data":{"cxRoute":"updatePasswordComp","pageLabel":"updatePassword"},"component":"PageLayoutComponent"},{"path":null,"canActivate":["AuthGuard","CmsPageGuard"],"data":{"cxRoute":"closeAccount","pageLabel":"close-account"},"component":"PageLayoutComponent"}],"kind":"module"},{"name":"routes","filename":"projects/fsastorefrontlib/src/cms-components/my-account/claim/claim.module.ts","module":"ClaimModule","children":[{"path":null,"canActivate":["AuthGuard","CmsPageGuard"],"data":{"cxRoute":"claims","pageLabel":"my-claims"},"component":"PageLayoutComponent"},{"path":null,"canActivate":["AuthGuard","CmsPageGuard","NoClaimPoliciesGuard"],"data":{"cxRoute":"noClaims","pageLabel":"noClaimsPage"},"component":"PageLayoutComponent"},{"path":null,"canActivate":["AuthGuard","CmsPageGuard","ClaimPoliciesGuard"],"data":{"cxRoute":"claimsPage","pageLabel":"claimsPage"},"component":"PageLayoutComponent"}],"kind":"module"},{"name":"routes","filename":"projects/fsastorefrontlib/src/cms-components/my-account/inbox/inbox.module.ts","module":"InboxModule","children":[{"path":null,"canActivate":["AuthGuard","CmsPageGuard"],"data":{"cxRoute":"inbox","pageLabel":"inbox"},"component":"PageLayoutComponent"}],"kind":"module"},{"name":"routes","filename":"projects/fsastorefrontlib/src/cms-components/my-account/policy/policy.module.ts","module":"PolicyModule","children":[{"path":null,"canActivate":["AuthGuard","CmsPageGuard"],"data":{"cxRoute":"policies","pageLabel":"my-policies"},"component":"PageLayoutComponent"},{"path":null,"canActivate":["AuthGuard","CmsPageGuard"],"data":{"cxRoute":"policyDetails","pageLabel":"policy-details"},"component":"PageLayoutComponent"}],"kind":"module"},{"name":"routes","filename":"projects/fsastorefrontlib/src/cms-components/my-account/premium-calendar/premium-calendar.module.ts","module":"PremiumCalendarModule","children":[{"path":null,"canActivate":["AuthGuard","CmsPageGuard"],"data":{"cxRoute":"premiumCalendar","pageLabel":"premium-calendar"},"component":"PageLayoutComponent"}],"kind":"module"},{"name":"routes","filename":"projects/fsastorefrontlib/src/cms-components/my-account/quote/quote.module.ts","module":"QuoteModule","children":[{"path":null,"canActivate":["AuthGuard","CmsPageGuard"],"data":{"cxRoute":"quotes","pageLabel":"my-quotes"},"component":"PageLayoutComponent"}],"kind":"module"}]}
