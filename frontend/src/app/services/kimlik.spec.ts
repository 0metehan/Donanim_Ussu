import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Kimlik, kayitliToken } from './kimlik';

describe('Kimlik', () => {
  let service: Kimlik;
  let http: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(Kimlik);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('giriş yapar, kullanıcıyı rolüyle birlikte alır ve token saklar', () => {
    let sonuc: unknown;
    service.girisYap('ahmet', '1234', true).subscribe((k) => (sonuc = k));

    const giris = http.expectOne('/api/Kullanici/giris');
    expect(giris.request.body).toEqual({ kullaniciAdi: 'ahmet', sifre: '1234' });
    giris.flush({ token: 'abc' });

    const ben = http.expectOne('/api/Kullanici/ben');
    expect(ben.request.headers.get('Authorization')).toBe('Bearer abc');
    ben.flush({ id: 1, kullaniciAdi: 'ahmet', rol: 'ADMIN' });

    expect(sonuc).toEqual({ id: 1, kullaniciAdi: 'ahmet', rol: 'ADMIN' });
    expect(service.kullanici()?.kullaniciAdi).toBe('ahmet');
    expect(localStorage.getItem('token')).toBe('abc');
  });

  it('hatalı girişte token saklamaz', () => {
    let hata: unknown;
    service.girisYap('mete', 'yanlis', false).subscribe({ error: (e) => (hata = e) });

    http.expectOne('/api/Kullanici/giris').flush(null, { status: 401, statusText: 'Unauthorized' });

    expect(hata).toBeTruthy();
    expect(service.kullanici()).toBeNull();
    expect(kayitliToken()).toBeNull();
  });

  it('kayıt olunca seçilen rolü ve parolayı (sifreHash) gönderir, sonra giriş yapar', () => {
    service.kayitOl('yeni', 'yeni@ornek.com', 'parola1', 'MODERATOR').subscribe();

    const kayit = http.expectOne((r) => r.method === 'POST' && r.url === '/api/Kullanici');
    expect(kayit.request.body).toEqual({
      kullaniciAdi: 'yeni',
      eposta: 'yeni@ornek.com',
      sifreHash: 'parola1',
      rol: 'MODERATOR',
    });
    kayit.flush({ id: 3, kullaniciAdi: 'yeni', rol: 'MODERATOR' });

    const giris = http.expectOne('/api/Kullanici/giris');
    expect(giris.request.body).toEqual({ kullaniciAdi: 'yeni', sifre: 'parola1' });
    giris.flush({ token: 'tok' });
    http.expectOne('/api/Kullanici/ben').flush({ id: 3, kullaniciAdi: 'yeni', rol: 'MODERATOR' });

    expect(service.kullanici()?.rol).toBe('MODERATOR');
    expect(localStorage.getItem('token')).toBe('tok');
  });

  it('pencere açınca diğeri kapanır', () => {
    service.girisPenceresiniAc();
    service.kayitPenceresiniAc();
    expect(service.girisPenceresiAcik()).toBe(false);
    expect(service.kayitPenceresiAcik()).toBe(true);
  });

  it('"beni hatırla" kapalıysa token sessionStorage\'a yazılır, çıkışta silinir', () => {
    service.girisYap('mete', '1234', false).subscribe();
    http.expectOne('/api/Kullanici/giris').flush({ token: 'xyz' });
    http.expectOne('/api/Kullanici/ben').flush({ id: 2, kullaniciAdi: 'mete', rol: 'KULLANICI' });

    expect(sessionStorage.getItem('token')).toBe('xyz');
    expect(localStorage.getItem('token')).toBeNull();

    service.cikisYap();
    expect(kayitliToken()).toBeNull();
    expect(service.kullanici()).toBeNull();
  });
});
