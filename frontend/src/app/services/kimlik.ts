import { Service, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { Kullanici, Rol } from '../models/modeller';

const TOKEN_ANAHTARI = 'token';

export const ROL_ADLARI: Record<Rol, string> = {
  KULLANICI: 'Kullanıcı',
  MODERATOR: 'Moderatör',
  ADMIN: 'Admin',
};

// "Beni hatırla" seçiliyse token localStorage'da (tarayıcı kapansa da kalır),
// değilse sessionStorage'da (sekme kapanınca silinir) tutulur.
export function kayitliToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_ANAHTARI) ?? sessionStorage.getItem(TOKEN_ANAHTARI);
  } catch {
    return null;
  }
}

function tokeniSil(): void {
  try {
    localStorage.removeItem(TOKEN_ANAHTARI);
    sessionStorage.removeItem(TOKEN_ANAHTARI);
  } catch {
    // depolama kapalıysa yapacak bir şey yok
  }
}

function tokeniKaydet(token: string, beniHatirla: boolean): void {
  tokeniSil();
  try {
    (beniHatirla ? localStorage : sessionStorage).setItem(TOKEN_ANAHTARI, token);
  } catch {
    // depolama kapalıysa oturum sadece bu sayfa açıkken sürer
  }
}

@Service()
export class Kimlik {
  private readonly http = inject(HttpClient);

  // Giriş yapan kullanıcı (yoksa null)
  readonly kullanici = signal<Kullanici | null>(null);

  // Giriş / kayıt pencereleri açık mı? Üst bardaki butonlar bunları açar.
  readonly girisPenceresiAcik = signal(false);
  readonly kayitPenceresiAcik = signal(false);

  girisPenceresiniAc(): void {
    this.kayitPenceresiAcik.set(false);
    this.girisPenceresiAcik.set(true);
  }

  kayitPenceresiniAc(): void {
    this.girisPenceresiAcik.set(false);
    this.kayitPenceresiAcik.set(true);
  }

  constructor() {
    // Sayfa yenilendiğinde kayıtlı token varsa oturumu geri yükle
    if (kayitliToken()) {
      this.http.get<Kullanici>('/api/Kullanici/ben').subscribe({
        next: (k) => this.kullanici.set(k),
        error: () => tokeniSil(), // token süresi dolmuş ya da geçersiz
      });
    }
  }

  // 1) /Kullanici/giris ile token alır
  // 2) /Kullanici/ben ile giriş yapan kullanıcıyı (rolüyle birlikte) öğrenir
  // 3) Token'ı saklar ve kullanıcıyı ayarlar
  girisYap(kullaniciAdi: string, sifre: string, beniHatirla: boolean): Observable<Kullanici> {
    return this.http
      .post<{ token: string }>('/api/Kullanici/giris', { kullaniciAdi, sifre })
      .pipe(
        switchMap(({ token }) =>
          this.http
            .get<Kullanici>('/api/Kullanici/ben', {
              headers: { Authorization: `Bearer ${token}` },
            })
            .pipe(
              map((kullanici) => {
                tokeniKaydet(token, beniHatirla);
                this.kullanici.set(kullanici);
                return kullanici;
              }),
            ),
        ),
      );
  }

  // Seçilen rolle yeni hesap açar, ardından otomatik giriş yapar.
  // Backend parolayı "sifreHash" alanında düz olarak alıp kendisi hashliyor.
  kayitOl(kullaniciAdi: string, eposta: string, sifre: string, rol: Rol): Observable<Kullanici> {
    return this.http
      .post<Kullanici>('/api/Kullanici', { kullaniciAdi, eposta, sifreHash: sifre, rol })
      .pipe(switchMap(() => this.girisYap(kullaniciAdi, sifre, true)));
  }

  cikisYap(): void {
    tokeniSil();
    this.kullanici.set(null);
  }
}
