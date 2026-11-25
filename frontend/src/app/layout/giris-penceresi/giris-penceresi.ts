import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { Checkbox } from 'primeng/checkbox';
import { Dialog } from 'primeng/dialog';
import { Divider } from 'primeng/divider';
import { InputGroup } from 'primeng/inputgroup';
import { InputText } from 'primeng/inputtext';
import { Kimlik } from '../../services/kimlik';

@Component({
  imports: [FormsModule, Button, Checkbox, Dialog, Divider, InputGroup, InputText],
  selector: 'app-giris-penceresi',
  templateUrl: './giris-penceresi.html',
})
export class GirisPenceresi {
  protected readonly kimlik = inject(Kimlik);
  private readonly bildirim = inject(MessageService);

  protected kullaniciAdi = '';
  protected sifre = '';
  protected beniHatirla = true;
  protected readonly sifreGoster = signal(false);

  protected girisYap(): void {
    this.kimlik.girisYap(this.kullaniciAdi, this.sifre, this.beniHatirla).subscribe({
      next: (k) => {
        this.kimlik.girisPenceresiAcik.set(false);
        this.sifre = '';
        // Uyarı almış kullanıcıya hatırlat
        if (k.uyariSayisi) {
          this.bildirim.add({
            severity: 'warn',
            summary: `Hesabına ${k.uyariSayisi} uyarı verildi.`,
            detail: '3 uyarıda hesabın banlanır.',
          });
        }
      },
      // 403: hesap banlı
      error: (err) =>
        this.bildirim.add({
          severity: 'error',
          summary: err.status === 403 ? 'Hesabın banlandı.' : 'Kullanıcı adı veya parola hatalı.',
        }),
    });
  }
}
