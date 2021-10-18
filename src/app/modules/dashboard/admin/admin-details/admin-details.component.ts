import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import $ from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';
import { DashboardService } from 'src/app/services/dashboard.service';
@Component({
  selector: 'app-admin-details',
  templateUrl: './admin-details.component.html',
  styleUrls: ['./admin-details.component.scss']
})
export class AdminDetailsComponent implements OnInit {

  data
  tab = 0
  id: string;
  account: any;
  image: any;
  images: any = [];
  upgradeForm: FormGroup
   type: string;
  show = false;
  constructor(private activatedRoute: ActivatedRoute,
    private dashboard: DashboardService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder
    ) {
      this.upgradeForm = this.fb.group({
        account_type: ['']
      })
     }



     selected(d: any) {
   this.type = d;
     }


     
  upgrade() {
    // console.log(id);
    const data: any = {
      account_type: this.type
    };
    this.dashboard.upgradeUser(this.id, data).subscribe(
      res => {
        // console.log(res);
        this.show = false;
      }
    )
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    this.dashboard.ReloadNeeded.subscribe(
      () => {
           this.getAccount();
        
      }
    );
    this.getAccount();
  }


  showAccount = () => this.show = !this.show;

  private getAccount() {
    this.dashboard.getUserId(this.id).subscribe(
      (data: any) => {
     this.data = data;
     this.account = data.account_details['0'].owner;
     this.image = data.account_documents;
     this.images = data.account_documents;
    //  this.length = data.length;
     if(this.data) {
    // this.account_verified = data['0'].is_account_verified;
    // this.firstPayment = data['0'].owner.is_first_payment;
     }
        }

      
 
    )
    this.spinner.hide();}


  tabs(data: any) {
if(data === 0) {
  this.tab = 0
} else if(data ===1){
  this.tab = 1
} else {
  this.tab =2
}
console.log(data)
  }

  closeModal1(): void {
    document.getElementById('remove-modal').click();
  }
 

}
