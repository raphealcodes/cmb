import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { PnotifyService } from 'src/app/services/pnotify.service';





@Injectable()


export class ErrorInterceptor implements HttpInterceptor {
  constructor( private spinner: NgxSpinnerService, private notify: PnotifyService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status !== 401) {
          this.notify.notError(error.error);
        }
        this.spinner.hide();
        return throwError(error);
      })
    );
  }



}

