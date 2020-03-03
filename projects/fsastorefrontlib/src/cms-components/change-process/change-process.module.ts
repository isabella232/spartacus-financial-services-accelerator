import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { StoreModule } from '@ngrx/store';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import {
  CmsPageGuard,
  MediaModule,
  PageLayoutComponent,
  SpinnerModule,
} from '@spartacus/storefront';
import { reducerToken } from '../../core/change-request/store/reducers/index';
import { AccordionModule } from './../../shared/accordion/accordion.module';
import { ChangeCarDetailsComponent } from './change-carDetails/change-carDetails.component';
import { ChangeCoverageComponent } from './change-coverage/change-coverage.component';
import { ChangeProcessNavigationComponent } from './change-process-navigation/change-process-navigation.component';
import { ChangeProcessProgressBarComponent } from './change-process-progress-bar/change-process-progress-bar.component';
import { ChangeSimulationComponent } from './change-simulation/change-simulation.component';
const routes: Routes = [
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'changeCarDetailsPage',
      pageLabel: 'changeCarDetailsPage',
    },
    component: PageLayoutComponent,
  },
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'changeCoveragePage',
      pageLabel: 'changeCoveragePage',
    },
    component: PageLayoutComponent,
  },
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'changeSimulationPage',
      pageLabel: 'changeSimulationPage',
    },
    component: PageLayoutComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    RouterModule,
    MediaModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    UrlModule,
    SpinnerModule,
    AccordionModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('changeRequests', reducerToken),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ChangeRequestProgressBarFlex: {
          component: ChangeProcessProgressBarComponent,
        },
        ChangeCoverageFlex: {
          component: ChangeCoverageComponent,
        },
        ChangeCarDetailsFlex: {
          component: ChangeCarDetailsComponent,
        },
        ChangeSimulationFlex: {
          component: ChangeSimulationComponent,
        },
        ChangeRequestNavigationFlex: {
          component: ChangeProcessNavigationComponent,
        },
      },
    }),
  ],
  declarations: [
    ChangeCoverageComponent,
    ChangeSimulationComponent,
    ChangeProcessProgressBarComponent,
    ChangeCarDetailsComponent,
    ChangeProcessNavigationComponent,
  ],
  exports: [
    ChangeCoverageComponent,
    ChangeSimulationComponent,
    ChangeProcessProgressBarComponent,
    ChangeCarDetailsComponent,
    ChangeProcessNavigationComponent,
  ],
  entryComponents: [
    ChangeCoverageComponent,
    ChangeSimulationComponent,
    ChangeProcessProgressBarComponent,
    ChangeCarDetailsComponent,
    ChangeProcessNavigationComponent,
  ],
})
export class ChangeProcessModule {}
