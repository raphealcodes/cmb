import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NavigationService } from './navigation.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  API_URL: string = environment.url;
  private getReloadNeeded = new Subject<void>();

  constructor(private http: HttpClient,
  private storage: StorageService,
  private navigate: NavigationService,
  private route: Router
) { }

get ReloadNeeded() {
  return this.getReloadNeeded;
 }

getAccount(): Observable<any> {
  return this.http.get<any>(`${this.API_URL}/auth/personal_info/`);
}


updateAccount(id: string, data: any): Observable<any> {
  return this.http.put<any>(`${this.API_URL}/auth/personal_info/${id}/`, data)
  .pipe(
    tap(() => {
      this.getReloadNeeded.next();
    })
  );;
}


uploadDoc(data: any) {
  return this.http.post<any>(`${this.API_URL}/auth/upload_verification_documents/`, data).pipe(
     tap( () => {this.getReloadNeeded.next(); }

     )
   );
 }


 postPayment(data: any) {
  return this.http.post<any>(`${this.API_URL}/core/create_payment/`, data).pipe(
     tap( () => {this.getReloadNeeded.next(); }

     )
   );
 }

 postBlog(data: any) {
  return this.http.post<any>(`${this.API_URL}/core/blog_post/`, data).pipe(
     tap( () => {this.getReloadNeeded.next(); }

     )
   );
 }

 getQrCode(): Observable<any> {
  return this.http.get<any>(`https://www.bitcoinqrcodemaker.com/api/?style=bitcoin&color=1&prefix=on&address=1M5m1DuGw4Wyq1Nf8sfoKRM6uA4oREzpCX`);
}


 getDoc() {
  return this.http.get<any>(`${this.API_URL}/auth/upload_verification_documents/`);
 }


 getUser() {
   return this.http.get<any>(`${this.API_URL}/auth/users/`);
 }

 getInvoice() {
  return this.http.get<any>(`${this.API_URL}/core/invoices/`);
}

 getUserSummary() {
  return this.http.get<any>(`${this.API_URL}/auth/users_summary/`);
}
 activateUser(id: any, data: any) {
  return this.http.patch<any>(`${this.API_URL}/auth/users/${id}/`, data).pipe(
     tap( () => {this.getReloadNeeded.next(); }

     )
   );
 }

 upgradeUser(id: any, data: any) {
  return this.http.patch<any>(`${this.API_URL}/auth/users/${id}/`, data).pipe(
     tap( () => {this.getReloadNeeded.next(); }

     )
   );
 }



 getUserId(id: any) {
  return this.http.get<any>(`${this.API_URL}/auth/user_details/${id}/`);
}

getInvoices(): any {
  return this.http.get<any>(`${this.API_URL}/core/invoices/`);
}


getBalance(): any {
  return this.http.get<any>(`${this.API_URL}/core/wallet_balance/`);
}

getReferal(): any {
  return this.http.get<any>(`${this.API_URL}/auth/referal_code/`);
}

getReferalH(): any {
  return this.http.get<any>(`${this.API_URL}/auth/referal_history/`);
}


getPost(): any {
  return this.http.get<any>(`${this.API_URL}/core/blog_post/`);
}






}
