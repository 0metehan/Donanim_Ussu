import { Service, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, tap } from 'rxjs';
import { Kullanici, Rol } from '../models/modeller';

export const ROL_ADLARI: Record<Rol, string> = {
  KULLANICI: 'Kullanıcı',
  MODERATOR: 'Moderatör',
  ADMIN: 'Admin',
};

// "Beni hatırla" seçiliyse token localStorage'da, değilse sessionStorage'da durur
export function kayitliToken(): string | null {
  return localStorage.getItem('token') ?? sessionStorage.getItem('token');
}

@Service()
export class Kimlik {
  private readonly http = inject(HttpClient);

  readonly kullanici = signal<Kullanici | null>(null);
  readonly girisPenceresiAcik = signal(false);
  readonly kayitPenceresiAcik = signal(false);

  constructor() {
    // Sayfa yenilenince kayıtlı token varsa kullanıcıyı geri getir
    if (kayitliToken()) {
      this.http.get<Kullanici>('/api/Kullanici/ben').subscribe({
        next: (k) => this.kullanici.set(k),
        error: () => this.cikisYap(),
      });
    }
  }

  girisPenceresiniAc(): void {
    this.kayitPenceresiAcik.set(false);
    this.girisPenceresiAcik.set(true);
  }

  kayitPenceresiniAc(): void {
    this.girisPenceresiAcik.set(false);
    this.kayitPenceresiAcik.set(true);
  }

  girisYap(kullaniciAdi: string, sifre: string, beniHatirla: boolean) {
    return this.http.post<{ token: string }>('/api/Kullanici/giris', { kullaniciAdi, sifre }).pipe(
      switchMap(({ token }) => {
        this.cikisYap();
        (beniHatirla ? localStorage : sessionStorage).setItem('token', token);
        return this.http.get<Kullanici>('/api/Kullanici/ben');
      }),
      tap((k) => this.kullanici.set(k)),
    );
  }

  // Backend parolayı "sifreHash" alanında alıp kendisi hashliyor
  kayitOl(kullaniciAdi: string, eposta: string, sifre: string, rol: Rol) {
    return this.http
      .post('/api/Kullanici', { kullaniciAdi, eposta, sifreHash: sifre, rol })
      .pipe(switchMap(() => this.girisYap(kullaniciAdi, sifre, true)));
  }

  cikisYap(): void {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    this.kullanici.set(null);
  }
}
