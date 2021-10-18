import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  data;
 account_verified = 'Pending';
 firstPayment = true;
 balance: any;
  constructor(private dashboard: DashboardService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.dashboard.ReloadNeeded.subscribe(
      () => {
           this.getAccount();
           this.getWallet()
      }
    );
    this.getAccount();
    this.getWallet()
  }



   private getAccount() {
    this.dashboard.getAccount().subscribe(
      (data: any[]) => {
     this.data = data;
     if(this.data) {
      this.account_verified = data['0'].owner.user_status;
    this.firstPayment = data['0'].owner.is_first_payment;
     }
        }

      
 
    )
    this.spinner.hide();}


    private getWallet() {
      this.dashboard.getBalance().subscribe(
        (data: any[]) => {
       this.data = data;
       if(this.data) {
        this.balance = data['0'].balance;
  
       }
          }
  
        
   
      )
      this.spinner.hide();}

}
