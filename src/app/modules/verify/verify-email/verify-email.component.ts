import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import $ from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit, AfterViewInit {
  verifyForm: FormGroup
  constructor(private fb: FormBuilder, private auth: AuthService,
    private spinner: NgxSpinnerService ) { 
    this.verifyForm = this.fb.group({
      verify1: [''],
      verify2: [''],
      verify3: [''],
      verify4: [''],
    })
  }

  ngOnInit() {
    this.spinner.hide();
  }


  submitVerify() {
    this.spinner.show();
    const { verify1, verify2, verify3, verify4} = this.verifyForm.value;
    const a: string = verify1;
    const b: string = verify2;
    const c: string = verify3;
    const d: string = verify4;
    const e =  `${a}${b}${c}${d}`;
    console.log(e);
    const data: any = {
      verification_code: e
    }
    this.auth.verifyUser(data);
  }

  send() {
    const data: any = {
      email: localStorage.getItem('email')
    }
    this.auth.resendOTP(data);
  }


  ngAfterViewInit(): void {
    $(function() {
      'use strict';
  
      var body = $('body');
  
      function goToNextInput(e) {
        var key = e.which,
          t = $(e.target),
          sib = t.next('input');
  
        if (key != 9 && (key < 48 || key > 57)) {
          e.preventDefault();
          return false;
        }
  
        if (key === 9) {
          return true;
        }
  
        if (!sib || !sib.length) {
          sib = body.find('input').eq(0);
        }
        sib.select().focus();
      }
  
      function onKeyDown(e) {
        var key = e.which;
  
        if (key === 9 || (key >= 48 && key <= 57)) {
          return true;
        }
  
        e.preventDefault();
        return false;
      }
  
      function onFocus(e) {
        $(e.target).select();
      }
  
      body.on('keyup', 'input', goToNextInput);
      body.on('keydown', 'input', onKeyDown);
      body.on('click', 'input', onFocus);
  
    });
  }
}
