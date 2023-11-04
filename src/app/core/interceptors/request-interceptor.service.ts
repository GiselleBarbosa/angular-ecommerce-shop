import { catchError, retry } from 'rxjs/operators';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';

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
        catchError(error => {
          return of(error);
        })
      );
    } else {
      return next.handle(request);
    }
  }
}
