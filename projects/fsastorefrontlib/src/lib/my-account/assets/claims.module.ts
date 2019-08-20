import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { AuthGuard, CmsConfig, ConfigModule, I18nModule, RoutesConfig, RoutingConfig } from '@spartacus/core';
import { CmsPageGuard, PageLayoutComponent, SpinnerModule } from '@spartacus/storefront';
import { OccClaimService } from '../../occ/claim/claim.service';
import { DeleteClaimDialogComponent } from '../assets/components/claims/delete-claim-dialog/delete-claim-dialog.component';
import { ClaimPoliciesComponent } from './components/claims/claim-policies/claim-policies.component';
import { ClaimsComponent } from './components/claims/claims.component';
import { CreateClaimComponent } from './components/claims/create-claim/create-claim.component';
import { ClaimDataService } from './services/claim-data.service';
import { ClaimService } from './services/claim.service';



const routes: Routes = [
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'claims',
      pageLabel: 'my-claims'
    },
    component: PageLayoutComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    RouterModule,
    FormsModule,
    NgSelectModule,
    SpinnerModule,
    RouterModule.forChild(routes),
    ConfigModule.withConfig(<CmsConfig | RoutesConfig | RoutingConfig>{
      cmsComponents: {
        AccountMyClaimsSPAComponent: {
          component: ClaimsComponent
        },
        ClaimActivePoliciesFlex: {
          component: ClaimPoliciesComponent,
          guards: [AuthGuard]
        }
      }
    })
  ],
  declarations: [ClaimsComponent, DeleteClaimDialogComponent, ClaimPoliciesComponent, CreateClaimComponent],
  exports: [ClaimsComponent, ClaimPoliciesComponent],
  providers: [ClaimService, ClaimDataService, ClaimPoliciesComponent, OccClaimService],
  entryComponents: [ClaimsComponent, DeleteClaimDialogComponent, ClaimPoliciesComponent, CreateClaimComponent]
})
export class ClaimsModule { }
