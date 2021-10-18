import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  SearchCountryField,
  TooltipLabel,
  CountryISO,
  PhoneNumberFormat,
} from 'ngx-intl-tel-input';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  PasswordStrengthValidator,
  passwordValidators,
} from '../../../utils/validators/passwordValidators';
import { SignupDTO } from '../../../models/auth-model';
import { AuthService } from 'src/app/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-referral-signup',
  templateUrl: './referral-signup.component.html',
  styleUrls: ['./referral-signup.component.css']
})
export class ReferralSignupComponent implements OnInit, AfterViewInit {
  signupForm: FormGroup;

  country: any;
  terms = '';

  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];
  id: any;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute
  ) {
    this.signupForm = this.fb.group(
      {
        first_name: ['', [Validators.required]],
        last_name: ['', [Validators.required]],
        referal_code: [''],
        email: [
          '',
          [
            Validators.required,
            ,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
          ],
        ],
        phone_number: [
          undefined,
          [Validators.required, Validators.maxLength(15)],
        ],
        password: [
          '',
          [
            Validators.required,
            PasswordStrengthValidator,
            Validators.minLength(5),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
        country: ['', [Validators.required]],
        check: [true, [Validators.required]],
      },
      { validator: passwordValidators }
    );
  }

  submitSignup(): void {
    const {
      first_name,
      last_name,
      email,
      password,
      country,
      referal_code
    } = this.signupForm.value;
    const phone = this.signupForm.get('phone_number').value;

    const data: any = {
      first_name,
      last_name,
      email,
      phone_number: phone.e164Number,
      password,
      country,
      referal_code
    };

    if (this.signupForm.get('check').value === true) {
      this.spinner.show();
      // console.log(data);
      this.auth.registerUser(data);
      localStorage.setItem('email', this.signupForm.get('email').value )
      this.signupForm.reset();
    } else {
      this.terms = 'Accept Terms and Conditions before proceeding';
    }
  }

  changePreferredCountries(): void {
    this.preferredCountries = [CountryISO.Nigeria, CountryISO.Canada];
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    this.signupForm.patchValue({
      referal_code: this.id
    })
    this.auth.getCountry().subscribe((data) => {
      this.country = data;
    });
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
