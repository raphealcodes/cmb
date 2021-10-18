import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyComponent } from './verify.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/utils/guards/auth-guard';
import { VerifyGuard } from 'src/app/utils/guards/verify-guard';
import { UnAuthGuard } from 'src/app/utils/guards/un-auth-guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from 'src/app/utils/interceptor/auth-interceptor';
import { ErrorInterceptor } from 'src/app/utils/interceptor/error-interceptor';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PnotifyService } from 'src/app/services/pnotify.service';


const verifyRoutes: Routes = [{
  path: '',
  redirectTo: '/verify-email/verify'
},
{
  path: 'verify',
  component: VerifyEmailComponent
}
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(verifyRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  exports: [RouterModule],
  declarations: [VerifyComponent,
  VerifyEmailComponent],
  providers: [AuthGuard, PnotifyService, VerifyGuard, UnAuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
})
export class VerifyModule { }
