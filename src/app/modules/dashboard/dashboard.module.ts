import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { TradeComponent } from '../dashboard/trade/trade.component';
import { TransactionHistoryComponent } from '../dashboard/transaction-history/transaction-history.component';
import { AccountComponent } from '../dashboard/account/account.component';
import { PersonalInfoComponent } from '../dashboard/account/personal-info/personal-info.component';
import { UploadsComponent } from '../dashboard/account/uploads/uploads.component';
import { SettingsComponent } from '../dashboard/account/set/settings.component';
import { AnalysisComponent } from '../dashboard/analysis/analysis.component';
import { DepositComponent } from '../dashboard/deposit/deposit.component';
import { WithdrawComponent } from '../dashboard/withdraw/withdraw.component';
import { PaymentComponent } from '../dashboard/payment/payment.component';
import { SideBarComponent } from '../dashboard/side-bar/side-bar.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { AuthGuard } from 'src/app/utils/guards/auth-guard';
import { VerifyGuard } from 'src/app/utils/guards/verify-guard';
import { UnAuthGuard } from 'src/app/utils/guards/un-auth-guard';
import { Interceptor } from 'src/app/utils/interceptor/auth-interceptor';
import { ErrorInterceptor } from 'src/app/utils/interceptor/error-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PnotifyService } from 'src/app/services/pnotify.service';
import { WalletComponent } from './wallet/wallet.component';
import { AdminComponent } from './admin/admin.component';
import { AdminDetailsComponent } from '../dashboard/admin/admin-details/admin-details.component';
import { BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap/datepicker';
export const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'trade',
        component: TradeComponent,
      },
      {
        path: 'transaction-history',
        component: TransactionHistoryComponent,
      },
      {
        path: 'admin',
        component: AdminComponent,
      },
      {
        path: 'admin/:id',
        component: AdminDetailsComponent
      },
      {
        path: 'account',
        component: AccountComponent,
        children: [
          {
            path: 'personal-info',
            component: PersonalInfoComponent,
          },
          {
            path: 'uploads',
            component: UploadsComponent,
          },
          {
            path: 'settings',
            component: SettingsComponent,
          },
        ],
      },
      {
        path: 'analysis',
        component: AnalysisComponent,
      },
      {
        path: 'deposit',
        component: DepositComponent,
      },
      {
        path: 'withdraw',
        component: WithdrawComponent,
      },
      {
        path: 'wallet',
        component: WalletComponent,
      },
      {
        path: 'payment',
        component: PaymentComponent
      }
    ],

  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(dashboardRoutes),
    NgxIntlTelInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    BsDatepickerModule.forRoot(),
  ],
  declarations: [
    DashboardComponent,
    TradeComponent,
    TransactionHistoryComponent,
    AccountComponent,
    AnalysisComponent,
    DepositComponent,
    WithdrawComponent,
    SideBarComponent,
    PersonalInfoComponent,
    UploadsComponent,
    SettingsComponent,
    WalletComponent,
    AdminComponent,
    PaymentComponent,
    AdminDetailsComponent
    
  ],
  exports: [RouterModule,  ],
  providers: [
    AuthGuard,
    PnotifyService,
    VerifyGuard,
    UnAuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
})
export class DashboardModule {}
