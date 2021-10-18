import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setAuth = (token: string, userDetails: any, firstLogin: any) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userDetails', userDetails);
    localStorage.setItem('firstLogin', firstLogin);

  }


  getAuth = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    return {token};

  }


  getUser = () => {
    const user = localStorage.getItem('userDetails');
    if (!user) {
      return;
    }
    return user;
  }



  removeAuth = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userDetails');
    localStorage.removeItem('verify');
    localStorage.removeItem('firstLogin');
  }
}
