import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {StorageService} from './storage.service';
import {NavigationService} from './navigation.service';
import {Router} from '@angular/router';
import {ILoginDTO, SignupDTO} from '../models/auth-model';
import { NgxSpinnerService } from 'ngx-spinner';
import { PnotifyService } from './pnotify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL: string = environment.url;

  private token: string;
  private userDetails: any;
  private error: string;

  private isAuthenticated = false;
  private isVerify = false;



  private getAuthenticatedUpdated = new Subject<boolean>();
  private getVerifyUpdated = new Subject<boolean>();


  constructor(private http: HttpClient,
              private storage: StorageService,
              private navigate: NavigationService,
              private route: Router,
              private spinner: NgxSpinnerService,
              private notify: PnotifyService
  ) { }


  // ======= Start Observables for Authentication ===========

  getAuthenticatedListener = () => {
    return this.getAuthenticatedUpdated.asObservable();
  }

  getVerifyListener = () => {
    return this.getVerifyUpdated.asObservable();
  }

  // ======= End Observables for Authentication =============


  // =============== ****************** =====================

  getAuthenticated = () => {
    return this.isAuthenticated;
  }

  getIsVerify = () => {
    return this.isVerify;
  }

  getUser = () => {
    return this.userDetails;
  }

  getToken = () => {
    return this.token;
  }

  getError = () => {
    return this.error;
  }

  // =============== ****************** =====================

  // ==================== Start Registration for User ================

  registerUser = (data: SignupDTO) => {
    this.http.post<any>(`${this.API_URL}/auth/register/`, data).subscribe(
      response => {
        const token = response.token;
        const userDetails = response.name;
        const accountType = response.account_type;
        const first_login = response.first_login;
        this.token = token;
        localStorage.setItem('verify', 'false');
        this.isAuthenticated = true;
        this.getAuthenticatedUpdated.next(true);
        this.saveAuthenticationData(token, userDetails, first_login);
        this.navigate.routeVerify();
        this.notify.notify(userDetails);
      }
    );

  }

  // ==================== End Registration for User ====================


  // =================  Start Login User =====================

  loginUser = (data: ILoginDTO) => {
    return this.http.post<any>(`${this.API_URL}/auth/login/`, data).subscribe(

      response => {
        const token = response.token;
        const userDetails = response.name;
        const accountType = response.account_type;
        const first_login = response.first_login;
        if (!token) {
        }  else if ( token && !first_login && response.is_email_verified) {
          this.token = token;
          this.isAuthenticated = true;
          this.isVerify = true;
          localStorage.setItem('verify', 'true');
          this.getAuthenticatedUpdated.next(true);
          this.getVerifyUpdated.next(true);
          this.saveAuthenticationData(token, userDetails, first_login);
          this.navigate.routeDashboard();
          this.notify.notify(userDetails);
        } else {
          this.token = token;
          this.isAuthenticated = true;
          localStorage.setItem('verify', 'false');
          this.getAuthenticatedUpdated.next(true);
          this.saveAuthenticationData(token, userDetails, first_login);
          this.navigate.routeVerify();
          this.spinner.show();
          
        }
      },


    );
  }


  // =================  End Login User =======================

  // ========================= Verify ==========================
  verifyUser = (data: any) => {
    this.http.post<any>(`${this.API_URL}/auth/verify_account/`, data).subscribe(
      response => {
        // console.log('Verified Successfully');
        this.isVerify = true;
        localStorage.setItem('verify', 'true');
        this.getVerifyUpdated.next(true);
        this.navigate.routeDashboard();
        this.notify.notify(localStorage.getItem('userDetails'));
      });
  }

  // =================  End Verify ==========================

// =================  Start Logout User =====================

  logoutUser = () => {
    this.token = null;
    this.userDetails = null;
    this.isAuthenticated = false;
    this.isVerify = false;
    this.getAuthenticatedUpdated.next(false);
    this.getVerifyUpdated.next(false);
    this.clearAuthenticationData();
    this.navigate.routeLogin();
  }
// =================  End Logout User =======================

// =================  Reset Password =====================

  forgottonPassword = (data: any) => {
    this.http.post(`${this.API_URL}/auth/get_reset_code/`, data).subscribe(
      res => {

      }
    );
  }

  resetPassword = (data: any) => {
   return this.http.post(`${this.API_URL}/auth/request_password_reset/`, data)
  }

  changePassword = (id: string, data: any) => {
    return this.http.post(`${this.API_URL}/auth/reset_password/${id}/`, data)
   }

   changePass = (data: any) => {
    return this.http.post(`${this.API_URL}/auth/reset_password_dashboard/`, data)
   }
  
  resendOTP = (data) => {
     this.http.post(`${this.API_URL}/auth/resend_verification_mail/`, data).subscribe(
      res => {
        this.notify. notifyResendOTP();
      }
    );
  }
// =================  End Reset Password =======================

// ============== Start Manipulation Authentication Data ===============

  private saveAuthenticationData = (token: string, userDetails: any, firstLogin: any) => {
    this.storage.setAuth(token, userDetails, firstLogin);
  }

  private getAuthenticationData = () => {
    const authData = this.storage.getAuth();
    if (!authData) {
      return;
    }
    const token = authData.token;
    return {token};
  }

  public automaticAuthenticationData = () => {
    const authData = this.getAuthenticationData();
    const verify = localStorage.getItem('verify');
    if (!authData) {
      return;
    } else if (authData && verify === 'false') {
      this.token = authData.token;
      this.isAuthenticated = true;
      this.getAuthenticatedUpdated.next(true);
    } else {
      this.token = authData.token;
      this.isAuthenticated = true;
      this.isVerify = true;
      this.getAuthenticatedUpdated.next(true);
      this.getVerifyUpdated.next(true);
    }
  }

  private clearAuthenticationData = () => {
    this.storage.removeAuth();
  }
// ============== End Manipulation Authentication Data =================


getCountry() {
 return this.http.get(`${this.API_URL}/core/countries/`) 
}


}


