import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { PasswordStrengthValidator, passwordValidators } from 'src/app/utils/validators/passwordValidators';
declare var $: any;
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit, AfterViewInit {
  resetForm: FormGroup;
  show = false;
  id: string;
   constructor(private fb: FormBuilder, private auth: AuthService,
        private spinner: NgxSpinnerService,
        private activatedRoute: ActivatedRoute,) { 
     this.resetForm = this.fb.group({
      password: [
        '',
        [
          Validators.required,
          PasswordStrengthValidator,
          Validators.minLength(5),
        ],
      ],
      confirmPassword: ['', [Validators.required]],
     }, { validator: passwordValidators })
   }
 
   send() {
     this.spinner.show();
     const data: any = {
       password: this.resetForm.get('password').value
     }
     this.auth.changePassword(this.id, data).subscribe(
       res => {
         this.show = true
         this.spinner.hide();
       }
     );
    //  console.log(data);
     
   }
 
   ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
   }

   ngAfterViewInit(): void {
    $('.toggle-password').click(function (): void {
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
