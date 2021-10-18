import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DashboardService } from 'src/app/services/dashboard.service';
import { PnotifyService } from 'src/app/services/pnotify.service';
@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent implements OnInit {
  data;
  account_verified = 'Pending';
  withdrawForm: FormGroup
   constructor(private dashboard: DashboardService,
     private fb: FormBuilder,   private notify: PnotifyService) { 
     this.withdrawForm =this.fb.group({
       amount: [''],
       wallet_address: ['']
     })
   }
 
   ngOnInit() {
 
     this.dashboard.ReloadNeeded.subscribe(
       () => {
            this.getAccount();
         
       }
     );
     this.getAccount();
   }

   withdraw() {
     const {
       amount, wallet_address
     } = this.withdrawForm.getRawValue();
     const data: any = {
       amount, wallet_address
     }
    //  console.log(data);
     this.notify.notifyWI();
     this.withdrawForm.reset();
   }
 
 
 
    private getAccount() {
     this.dashboard.getAccount().subscribe(
       (data: any[]) => {
      this.data = data;
      if(this.data) {
        this.account_verified = data['0'].owner.user_status;
      }
         }
 
       
  
     )}
}
