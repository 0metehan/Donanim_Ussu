import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { Divider } from 'primeng/divider';
import { InputGroup } from 'primeng/inputgroup';
import { InputText } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { SelectButton } from 'primeng/selectbutton';
import { Rol } from '../../models/modeller';
import { Kimlik, ROL_ADLARI } from '../../services/kimlik';

const EN_AZ_PAROLA = 6;
const EPOSTA_DESENI = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

@Component({
  imports: [FormsModule, Button, Dialog, Divider, InputGroup, InputText, Message, SelectButton],
  selector: 'app-kayit-penceresi',
  templateUrl: './kayit-penceresi.html',
})
export class KayitPenceresi {
  protected readonly kimlik = inject(Kimlik);
  protected readonly enAzParola = EN_AZ_PAROLA;

  protected readonly roller = (Object.keys(ROL_ADLARI) as Rol[]).map((deger) => ({
    ad: ROL_ADLARI[deger],
    deger,
  }));

  // Form alanları
  protected rol: Rol = 'KULLANICI';
  protected kullaniciAdi = '';
  protected eposta = '';
  protected sifre = '';
  protected sifreTekrar = '';

  protected readonly sifreGoster = signal(false);
  protected readonly gonderiliyor = signal(false);
  protected readonly hata = signal<string | null>(null);

  protected kayitOl(): void {
    const hata = this.formuDenetle();
    if (hata) {
      this.hata.set(hata);
      return;
    }

    this.gonderiliyor.set(true);
    this.hata.set(null);

    this.kimlik.kayitOl(this.kullaniciAdi.trim(), this.eposta.trim(), this.sifre, this.rol).subscribe({
      next: () => {
        this.gonderiliyor.set(false);
        this.kimlik.kayitPenceresiAcik.set(false);
        this.formuTemizle();
      },
      error: (err: unknown) => {
        this.gonderiliyor.set(false);
        this.hata.set(this.hataMesaji(err));
      },
    });
  }

  protected pencereKapandi(): void {
    this.formuTemizle();
  }

  private formuDenetle(): string | null {
    const kullaniciAdi = this.kullaniciAdi.trim();
    const eposta = this.eposta.trim();

    if (!kullaniciAdi || !eposta || !this.sifre || !this.sifreTekrar) {
      return 'Tüm alanları doldurman gerekiyor.';
    }
    if (kullaniciAdi.length > 50) {
      return 'Kullanıcı adı en fazla 50 karakter olabilir.';
    }
    if (eposta.length > 100 || !EPOSTA_DESENI.test(eposta)) {
      return 'Geçerli bir e-posta adresi gir.';
    }
    if (this.sifre.length < EN_AZ_PAROLA) {
      return `Parola en az ${EN_AZ_PAROLA} karakter olmalı.`;
    }
    if (this.sifre !== this.sifreTekrar) {
      return 'Parolalar birbiriyle aynı değil.';
    }
    return null;
  }

  private formuTemizle(): void {
    this.rol = 'KULLANICI';
    this.kullaniciAdi = '';
    this.eposta = '';
    this.sifre = '';
    this.sifreTekrar = '';
    this.sifreGoster.set(false);
    this.hata.set(null);
  }

  private hataMesaji(err: unknown): string {
    if (err instanceof HttpErrorResponse) {
      // Kullanıcı adı / e-posta benzersiz; çakışınca backend 409 ya da 500 döner
      if (err.status === 409 || err.status === 500) {
        return 'Bu kullanıcı adı veya e-posta zaten kayıtlı olabilir.';
      }
      if (err.status === 400) {
        return 'Bilgiler geçersiz, alanları kontrol et.';
      }
      return `Sunucuya ulaşılamadı (durum: ${err.status}).`;
    }
    return 'Beklenmeyen bir hata oluştu.';
  }
}
