import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CountryISO, PhoneNumberFormat, SearchCountryField, TooltipLabel } from 'ngx-intl-tel-input';
import { NgxSpinnerService } from 'ngx-spinner';
import { DashboardService } from 'src/app/services/dashboard.service';
import { PnotifyService } from 'src/app/services/pnotify.service';
import * as moment from 'moment';
@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {
  form: FormGroup;
  data: any;
  id: any;
 separateDialCode = false;
 SearchCountryField = SearchCountryField;
 TooltipLabel = TooltipLabel;
 CountryISO = CountryISO;
 PhoneNumberFormat = PhoneNumberFormat;
 preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
 uploads: any;
 maxDate: Date;
 minDate: Date;
myDateValue: Date;
  constructor(private fb: FormBuilder, private dashboard: DashboardService,
              private router: Router, private spinner: NgxSpinnerService,
              private notify: PnotifyService) { 
    this.form = this.fb.group({
      first_name: [''],
      last_name: [''],
      email: [''],
      phone_number: [''],
      date_of_birth: ['', [Validators.required]],
      citizenship: [''],
      zip_code: [''],
      address: [''],
      city: [''],
      country: ['']

    })

    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 1);
    this.maxDate.setDate(this.maxDate.getDate() - 6672);
  }

  ngOnInit() {
    this.spinner.show();
    this.myDateValue = new Date();
    this.dashboard.ReloadNeeded.subscribe(
      () => {
           this.getAccount();
            this.getUpload();
      }
    );
    this.getAccount();
    this.getUpload();
  }

  changePreferredCountries(): void {
    this.preferredCountries = [CountryISO.India, CountryISO.Canada];
   }

  

 
   onDateChange(newDate: Date) {
     console.log(newDate);
   }
   private getAccount() {
    this.dashboard.getAccount().subscribe(
      (data: any[]) => {
     this.data = data;
     this.id = data['0'].id;
     if(this.data) {
       this.form.patchValue({
         first_name: this.data['0'].owner.first_name,
         last_name: this.data['0'].owner.last_name,
         phone_number: this.data['0'].owner.phone_number,
         email: this.data['0'].owner.email,
         date_of_birth: this.data['0'].date_of_birth ?  this.data['0'].date_of_birth : '',
         citizenship: this.data['0'].citizenship ?  this.data['0'].citizenship : '',
         city: this.data['0'].city ?  this.data['0'].city : '',
         country: this.data['0'].owner.country,
         address: this.data['0'].address ?  this.data['0'].address : '',
         zip_code: this.data['0'].zip_code ?  this.data['0'].zip_code : '',
       }
      
       )
       this.spinner.hide();
     }
        }

      
 
    )}

    private getUpload() {
      this.dashboard.getDoc().subscribe(
        (data: any[]) => {
      this.uploads = data;
      this.spinner.hide();
       }
          
  
        
   
      )}

    submitForm() {
      this.spinner.show();
      const { phone_number, date_of_birth,
        citizenship, city, country, address, zip_code} = this.form.value;

        const data: any = {
          phone_number, date_of_birth: moment(this.form.get('date_of_birth').value).format('YYYY-MM-DD'),
        citizenship, city, country, address, zip_code
        }
        this.dashboard.updateAccount(this.id, data).subscribe(
          res => {
            this.notify.notifyTrans();
            if(this.uploads.length > 0) {
                 return;
            } else {
             this.router.navigate(['/dashboard/account/uploads']);
            }

          }
        );

        
    }


}
