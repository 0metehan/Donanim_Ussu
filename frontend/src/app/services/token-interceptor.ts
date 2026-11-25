import { HttpInterceptorFn } from '@angular/common/http';
import { kayitliToken } from './kimlik';

// Token varsa her isteğe "Authorization: Bearer <token>" ekler
export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = kayitliToken();
  return next(token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req);
};
