import {HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse} from '@angular/common/http';
import {Injectable, Injector} from '@angular/core';
import { catchError } from 'rxjs/operators';
import {of, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {StorageService} from '../../services/storage.service';
import {AuthService} from '../../services/auth.service';


@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(public injector: Injector, private storage: StorageService, private router: Router, private auth: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    const authservice = this.injector.get(AuthService);
    const token = authservice.getToken();
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Token ${token}`
        }
      });
    }
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.handleAuthError();
        }
        throw error;

      })
    );
  }
  private handleAuthError(): void {
    this.auth.logoutUser();

  }
}
