export interface SignupDTO {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
  country: string;
}


export interface ILoginDTO {
  email: string;
  password: string;
}
