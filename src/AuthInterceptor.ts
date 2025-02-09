import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the JWT token from AuthService


    // If the token exists, clone the request and add the Authorization header

      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsInN1YiI6ImhleWRlciIsImlhdCI6MTczODg1MDEzOSwiZXhwIjoxNzM4OTM2NTM5fQ.G7x_ER-el1Ge-5YfSJqUm5KYc1dAswjKKl4ITdjigT0'
        }
      });
      return next.handle(clonedRequest);


    // If no token, proceed with the original request
    return next.handle(req);
  }
}
