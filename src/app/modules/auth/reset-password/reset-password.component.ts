import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
 resetForm: FormGroup;
 show = false;
  constructor(private fb: FormBuilder, private auth: AuthService,    private spinner: NgxSpinnerService) { 
    this.resetForm = this.fb.group({
      email: ['', [Validators.required]]
    })
  }

  send() {
    this.spinner.show();
    const data: any = {
      email: this.resetForm.get('email').value
    }
    this.auth.resetPassword(data).subscribe(
      res => {
        this.show = true
        this.spinner.hide();
      }
    );
    // console.log(data);
    
  }

  ngOnInit() {
  }

}
