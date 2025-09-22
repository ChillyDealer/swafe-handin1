import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoginService } from './login-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const login = inject(LoginService); // token fra login service
  const token = login.token();

  console.log('[Token]:', token); // fjern det her det kun til debug

  if (!token) return next(req);

  const header = req.clone({ // laver header
    setHeaders: {
      Authorization: `Bearer ${token}`,
      Accept: '*/*',
    },
  });

  return next(header);
};
