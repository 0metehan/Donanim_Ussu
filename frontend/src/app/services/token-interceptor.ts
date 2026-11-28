import { HttpInterceptorFn } from '@angular/common/http';
import { kayitliToken } from './kimlik';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = kayitliToken();
  return next(token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req);
};
