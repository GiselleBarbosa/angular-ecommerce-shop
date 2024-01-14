import { catchError, retry } from 'rxjs/operators';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RequestsInterceptor implements HttpInterceptor {
  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.method === 'GET') {
      return next.handle(request).pipe(
        retry(4),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 0) {
            console.log('Request error, check internet connection.');
            return throwError('Request error, check internet connection.');
          } else {
            console.log('Unexpected error occurred. Try again later.');
            return throwError('Unexpected error occurred. Try again later.');
          }
        })
      );
    } else {
      return next.handle(request);
    }
  }
}
