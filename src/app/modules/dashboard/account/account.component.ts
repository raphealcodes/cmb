import { AfterViewInit, Component, OnInit, SecurityContext } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CountryISO, PhoneNumberFormat, SearchCountryField, TooltipLabel } from 'ngx-intl-tel-input';
import { Observable } from 'rxjs';
import { DashboardService } from 'src/app/services/dashboard.service';

declare var $;

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor( private fb: FormBuilder, private dashboard: DashboardService,
    private sanitizer: DomSanitizer) {
  
   }

  ngOnInit() {


   }


 


}
