import { HttpInterceptorFn } from '@angular/common/http';
import { kayitliToken } from './kimlik';

// Kayıtlı token varsa her isteğe "Authorization: Bearer <token>" başlığını ekler.
// İstek kendi Authorization başlığını taşıyorsa ona dokunmaz.
export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = kayitliToken();
  if (!token || req.headers.has('Authorization')) {
    return next(req);
  }
  return next(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }));
};
