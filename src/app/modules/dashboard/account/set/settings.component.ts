import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { PasswordStrengthValidator, passwordValidators } from 'src/app/utils/validators/passwordValidators';
declare var $: any;
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit,  AfterViewInit {

  refer = false;
  refers: any[];
  form: FormGroup;
  code: any;
  link: any;

  pass = false;

  resetForm: FormGroup;
  show = false;
  constructor(private fb: FormBuilder,
    private auth: AuthService,
     private dashboard: DashboardService,
    private spinner: NgxSpinnerService) { 
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
    this.auth.changePass(data).subscribe(
      res => {
        this.show = true
        this.spinner.hide();
      }
    );
    // console.log(data);
    
  }

  ngOnInit() {
    this.form = this.fb.group({
      code: [this.code],
      link: []
    })


    this.dashboard.ReloadNeeded.subscribe(
      () => {
        this.getReferal();
        this.getReferalH();
      }
    );
    this.getReferal();
    this.getReferalH();
  }


  private getReferal() {
    this.dashboard.getReferal().subscribe(
      (data: any[]) => {
        if(data) {
          this.form.patchValue({
            code:  data['0'].code,
            link: data['0'].referal_link
          })
        }
    this.spinner.hide();
     }

    )}

    private getReferalH() {
      this.dashboard.getReferalH().subscribe(
        (data: any[]) => {
     this.refers = data;
      this.spinner.hide();
       }
      )}


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

  referF= () => this.refer = !this.refer;
  passF= () => this.pass = !this.pass;
}
