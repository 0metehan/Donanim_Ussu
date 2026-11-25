import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Button } from 'primeng/button';
import { Checkbox } from 'primeng/checkbox';
import { Dialog } from 'primeng/dialog';
import { Divider } from 'primeng/divider';
import { InputGroup } from 'primeng/inputgroup';
import { InputText } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { Kimlik } from '../../services/kimlik';

@Component({
  imports: [FormsModule, Button, Checkbox, Dialog, Divider, InputGroup, InputText, Message],
  selector: 'app-giris-penceresi',
  templateUrl: './giris-penceresi.html',
})
export class GirisPenceresi {
  protected readonly kimlik = inject(Kimlik);

  // Form alanları
  protected kullaniciAdi = '';
  protected sifre = '';
  protected beniHatirla = true;

  protected readonly sifreGoster = signal(false);
  protected readonly gonderiliyor = signal(false);
  protected readonly hata = signal<string | null>(null);

  protected girisYap(): void {
    if (!this.kullaniciAdi.trim() || !this.sifre) {
      this.hata.set('Kullanıcı adı ve parola gerekli.');
      return;
    }

    this.gonderiliyor.set(true);
    this.hata.set(null);

    this.kimlik.girisYap(this.kullaniciAdi.trim(), this.sifre, this.beniHatirla).subscribe({
      next: () => {
        this.gonderiliyor.set(false);
        this.kimlik.girisPenceresiAcik.set(false);
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

  private formuTemizle(): void {
    this.sifre = '';
    this.sifreGoster.set(false);
    this.hata.set(null);
  }

  private hataMesaji(err: unknown): string {
    if (err instanceof HttpErrorResponse && err.status === 401) {
      return 'Kullanıcı adı veya parola hatalı.';
    }
    if (err instanceof HttpErrorResponse) {
      return `Sunucuya ulaşılamadı (durum: ${err.status}).`;
    }
    return 'Beklenmeyen bir hata oluştu.';
  }
}
