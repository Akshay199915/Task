import { Injectable } from '@angular/core';
import {   HttpInterceptor,  HttpRequest,  HttpResponse,  HttpHandler,  HttpEvent,  HttpErrorResponse} from '@angular/common/http';
import { AuthServiceService} from '../auth/auth-service.service';
import { ApiService } from '../services/api.service';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

    constructor(public auth: AuthServiceService , public apiservice:ApiService) {}


    intercept( req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {  
        const token = this.auth.getToken()

        if (token) {
           
            req = req.clone({
               setHeaders: {Authorization: `${token}`}
            });
         }
    
    return next.handle(req).pipe(
        catchError((err) => {
          if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
              // redirect user to the logout page
           }
        }
        return throwError(err);
      })
     )
}
}
