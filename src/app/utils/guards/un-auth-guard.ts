import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {NavigationService} from '../../services/navigation.service';




@Injectable()
export class UnAuthGuard implements CanLoad {
  constructor( private authservice: AuthService, private navigate: NavigationService) {}


  canLoad( route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
    const auth = this.authservice.getAuthenticated();
    if ( auth ) {
      this.navigate.routeDashboard();

    }
    return !auth;
  }
}


