import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { tokenInterceptor } from './token-interceptor';

describe('tokenInterceptor', () => {
  let http: HttpClient;
  let kontrol: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideHttpClient(withInterceptors([tokenInterceptor])), provideHttpClientTesting()],
    });
    http = TestBed.inject(HttpClient);
    kontrol = TestBed.inject(HttpTestingController);
  });

  afterEach(() => kontrol.verify());

  it('token yoksa başlık eklemez', () => {
    http.get('/api/Konu').subscribe();
    const istek = kontrol.expectOne('/api/Konu');
    expect(istek.request.headers.has('Authorization')).toBe(false);
    istek.flush([]);
  });

  it('kayıtlı token varsa Bearer başlığı ekler', () => {
    localStorage.setItem('token', 'abc');
    http.get('/api/Konu').subscribe();
    const istek = kontrol.expectOne('/api/Konu');
    expect(istek.request.headers.get('Authorization')).toBe('Bearer abc');
    istek.flush([]);
  });

  it('istekte zaten Authorization varsa ona dokunmaz', () => {
    localStorage.setItem('token', 'eski');
    http.get('/api/Kullanici/ben', { headers: { Authorization: 'Bearer yeni' } }).subscribe();
    const istek = kontrol.expectOne('/api/Kullanici/ben');
    expect(istek.request.headers.get('Authorization')).toBe('Bearer yeni');
    istek.flush({});
  });
});
