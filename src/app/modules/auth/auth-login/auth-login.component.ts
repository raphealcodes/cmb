import { AfterViewInit, Component, OnInit } from '@angular/core';
import $ from 'jquery';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ILoginDTO} from '../../../models/auth-model';
import { AuthService } from 'src/app/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent implements OnInit, AfterViewInit {
  loginForm: FormGroup;




  constructor(private fb: FormBuilder, private auth: AuthService, private spinner: NgxSpinnerService) {

    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });


  }


  submitLogin(): void {
    this.spinner.show();
    const {email, password} = this.loginForm.value;

    const data: ILoginDTO = {
      email,
      password
    };
   this.auth.loginUser(data);
   this.loginForm.reset();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    $('.toggle-password').click(function(): void {

      $(this).toggleClass('fa-eye fa-eye-slash');
      const input = $($(this).attr('toggle'));
      if (input.attr('type') === 'password') {
        input.attr('type', 'text');
      } else {
        input.attr('type', 'password');
      }
    });

  }

}
