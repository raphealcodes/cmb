import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccessPaymentComponent } from './shared/access-payment/access-payment.component';
import {HomeComponent} from './pages/home/home.component';
import { TradeComponent } from './pages/trade/trade.component';
import { Mt4Component } from './pages/mt4/mt4.component';
import { AboutUsComponent } from './pages/company/about-us/about-us.component';
import { AccountTypesComponent } from './pages/company/account-types/account-types.component';
import { ContactUsComponent } from './pages/company/contact-us/contact-us.component';
import { TradingPlatformComponent } from './pages/company/trading-platform/trading-platform.component';
import { FaqComponent } from './pages/education/faq/faq.component';
import { GlossaryComponent } from './pages/education/glossary/glossary.component';
import { EducationComponent } from './pages/education/education.component';
import { TradingStepsComponent } from './pages/education/trading-steps/trading-steps.component';
import { WhatIsForexComponent } from './pages/education/what-is-forex/what-is-forex.component';
import { MarketsComponent } from './pages/markets/markets.component';
import { CurrencyPairsComponent } from './pages/markets/currency-pairs/currency-pairs.component';
import { IndicesComponent } from './pages/markets/indices/indices.component';
import { StocksComponent } from './pages/markets/stocks/stocks.component';
import { TradingHoursChangesComponent } from './pages/markets/trading-hours-changes/trading-hours-changes.component';
import { TradingInformationComponent } from './pages/markets/trading-information/trading-information.component';
import { AnalyticalToolsComponent } from './pages/analytical-tools/analytical-tools.component';
import { DividendCalenderComponent } from './pages/analytical-tools/dividend-calender/dividend-calender.component';
import { EconomicCalenderComponent } from './pages/analytical-tools/economic-calender/economic-calender.component';
import { FundamentalAnalysisComponent } from './pages/analytical-tools/fundamental-analysis/fundamental-analysis.component';
import { RealTimeChartComponent } from './pages/analytical-tools/real-time-chart/real-time-chart.component';
import { TechnicalAnalysisComponent } from './pages/analytical-tools/technical-analysis/technical-analysis.component';
import { CompanyComponent } from './pages/company/company.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './pages/terms-conditions/terms-conditions.component';
import { VerifyGuard } from './utils/guards/verify-guard';
import { AuthGuard } from './utils/guards/auth-guard';
import { UnAuthGuard } from './utils/guards/un-auth-guard';

const routes: Routes = [

  // ****************** home page *****************************************
  {
    path: '',
    component: HomeComponent
  },

  // ****************** home page *****************************************

  // ****************** trade page *****************************************
  {
    path: 'trade',
    component: TradeComponent
  },

  // ****************** trade page *****************************************

  // ****************** mt4 page *****************************
  {
    path: 'mt4',
    component: Mt4Component
  },
  // **************** mt4 page ******************************

   // ****************** company page *****************************************
   {
    path: 'company',
    component: CompanyComponent,
    children: [
      {
        path: 'about-us',
        component: AboutUsComponent
      },
      {
        path: 'account-types',
        component: AccountTypesComponent
      },
      {
        path: 'contact-us',
        component: ContactUsComponent
      },
      {
        path: 'trading-platform',
        component: TradingPlatformComponent
      }
    ]
  },

  // ****************** company page *****************************************

  // ****************** education page *****************************************
  {
    path: 'education',
    component: EducationComponent,
    children: [
      {
        path: 'faq',
        component: FaqComponent
      },
      {
        path: 'glossary',
        component: GlossaryComponent
      },
      {
        path: 'trading-steps',
        component: TradingStepsComponent
      },
      {
        path: 'what-is-forex',
        component: WhatIsForexComponent
      }
    ]
  },

  // ****************** education page *****************************************

  // ****************** market page *****************************************
  {
    path: 'market',
    component: MarketsComponent,
    children: [
      {
        path: 'currency-pairs',
        component: CurrencyPairsComponent
      },
      {
        path: 'indices',
        component: IndicesComponent
      },
      {
        path: 'stocks',
        component: StocksComponent
      },
      // {
      //   path: 'trading-hours-changes',
      //   component: TradingHoursChangesComponent
      // },
      {
        path: 'trading-information',
        component: TradingInformationComponent
      }
    ]
  },

  // ****************** market page *****************************************


  // ****************** analytical page *****************************************
  {
    path: 'analytical',
    component: AnalyticalToolsComponent,
    children: [
      {
        path: 'dividend-calender',
        component: DividendCalenderComponent
      },
      {
        path: 'economic-calender',
        component: EconomicCalenderComponent
      },
      {
        path: 'fundamental-analysis',
        component: FundamentalAnalysisComponent
      },
      {
        path: 'real-time-chart',
        component: RealTimeChartComponent
      },
      {
        path: 'technical-analysis',
        component: TechnicalAnalysisComponent
      }
    ]
  },

  // ****************** analytical page *****************************************

  //  ***************** auth routing and verify module *******************************
  {
    path: 'auth',
    canLoad: [UnAuthGuard],
    loadChildren: () => import('./modules/auth/auth.module')
                          .then(m => m.AuthModule)

  },

  {
    path: 'verify-email',
    canLoad: [AuthGuard],
    loadChildren: () => import('./modules/verify/verify.module')
                          .then(m => m.VerifyModule)

  },
  //  ***************** auth routing and verify module *******************************

  // *********************** access payment route ************************

  {
    path: 'payment-view',
    component: AccessPaymentComponent
  },

  // *********************** access payment route ************************

  // **************** privacy policy ********************************

  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent
  },

  // **************** privacy policy ********************************
  {
    path: 'terms-and-conditions',
    component: TermsConditionsComponent
  },

  // ********************* dashboard **********************************

   {
     path: 'dashboard',
     canLoad: [VerifyGuard],
     loadChildren: () => import('./modules/dashboard/dashboard.module')
                          .then(m => m.DashboardModule)
   }

  // ********************* dashboard **********************************
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
