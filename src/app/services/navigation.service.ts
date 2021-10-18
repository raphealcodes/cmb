import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) { }


  routeLogin = () => {
    return this.router.navigate(['/auth/auth-login']);
  }

  routeVerify = () => {
    return this.router.navigate(['/verify-email/verify']);
  }

  routeDashboard = () => {
    return this.router.navigate(['/dashboard/trade']);
  }

}
