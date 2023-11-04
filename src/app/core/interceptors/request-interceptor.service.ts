import { catchError, retry } from 'rxjs/operators';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class RequestsInterceptor implements HttpInterceptor {
  private _messageService = inject(MessageService);

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(3),
      catchError(error => {
        this.showToast();
        return throwError(error);
      })
    );
  }

  private showToast(): void {
    this._messageService.add({
      severity: 'error',
      summary: 'Unexpected error',
      detail: 'Unable to load products',
      life: 2000,
    });
  }
}
