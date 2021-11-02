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
declare var $: any;
@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.css'],
})
export class AuthSignupComponent implements OnInit, AfterViewInit {
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

  qa: any;
  states: any[];
  cities: any[];
  stateLoader = false;
  cityLoader = false;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private spinner: NgxSpinnerService
  ) {
    this.signupForm = this.fb.group(
      {
        first_name: ['', [Validators.required]],
        last_name: ['', [Validators.required]],
        referal_code: [''],
        dob: ['',Validators.required],
        security_qa: ['', Validators.required],
        answer: ['', Validators.required],
        is_longterm: [false],
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
        state: [''],
        city: [''],
        countryId: ['', [Validators.required]],
        stateId: [''],
        cityId: [''],
        check: [true, [Validators.required]],
      },
      { validator: passwordValidators }
    );
  }

  getState(event?: any): void {
    if (event !== '') {
      this.stateLoader = true;
      const id = this.country.filter((s) => s.name === event)[0]
        .id;
      this.signupForm.get('countryId').patchValue(id);
      this.auth.getState(id).subscribe((data: any) => {
        this.states = data;
        this.stateLoader = false;
      });
    }
  }

  
  getCity(event?: any): void {
    if (event !== '') {
      this.cityLoader = true;
      const id = this.states.filter((s) => s.name === event)[0].id;
      this.signupForm.get('stateId').patchValue(id);
      this.auth.getCity(this.signupForm.get('countryId').value, id).subscribe((data: any) => {
        this.cities = data;
        this.cityLoader = false;
      });
    }
  }

  
  setCity = (event: any) => {
    if (event === '') {
    } else {
      const id = this.cities?.filter((s) => s.name === event)[0].cityId;
      this.signupForm.get('cityId').patchValue(id);
    }
  };

  submitSignup(): void {
    const {
      first_name,
      last_name,
      email,
      password,
      country,
      referal_code,
      is_longterm,
      dob,
      security_qa,
      answer,
      state,
      city,
    } = this.signupForm.value;
    const phone = this.signupForm.get('phone_number').value;

    const data: any = {
      first_name,
      last_name,
      email,
      phone_number: phone.e164Number,
      password,
      country,
      state,
      city,
      referal_code,
      is_longterm,
      dob,
      security_qa: {
        answer: answer,
        security_question_id: (security_qa).toString(),
      },
    };
    const a: any = {
      answer: answer,
      security_question_id: security_qa
    };
    const b = JSON.stringify(a);
    const formData = new FormData();
    // for ( let key in a) {
    //   formData.append(key, a[key]);
    // }
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('email', email);
    formData.append('phone_number', phone.e164Number);
    formData.append('password', password);
    formData.append('country', country);
    formData.append('state', state);
    formData.append('city', city);
    formData.append('referal_code', referal_code);
    formData.append('is_longterm', is_longterm);
    formData.append('dob', dob);
    formData.append('security_qa', b);



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
    this.auth.getCountry().subscribe((data) => {
      this.country = data;
    });

    this.auth.getSecurityQuestion().subscribe((data) => {
      this.qa = data;
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
