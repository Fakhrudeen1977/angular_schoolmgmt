import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/tokenstorage.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private tokenStorage: TokenStorageService
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

   // const token = sessionStorage.getItem(TOKEN_KEY);
    
    const token = this.tokenStorage.getToken();
      
    if (token) {
      const authRequest = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
      });

      console.log('Access Token:', token);
      console.log('Request URL:', request.url);

      return next.handle(authRequest);
    }

    return next.handle(request);
  }
}