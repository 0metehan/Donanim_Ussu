import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { Divider } from 'primeng/divider';
import { InputGroup } from 'primeng/inputgroup';
import { InputText } from 'primeng/inputtext';
import { SelectButton } from 'primeng/selectbutton';
import { Rol } from '../../models/modeller';
import { Kimlik, ROL_ADLARI } from '../../services/kimlik';

@Component({
  imports: [FormsModule, Button, Dialog, Divider, InputGroup, InputText, SelectButton],
  selector: 'app-kayit-penceresi',
  templateUrl: './kayit-penceresi.html',
})
export class KayitPenceresi {
  protected readonly kimlik = inject(Kimlik);
  private readonly bildirim = inject(MessageService);

  protected readonly roller = (Object.keys(ROL_ADLARI) as Rol[]).map((deger) => ({
    ad: ROL_ADLARI[deger],
    deger,
  }));

  protected rol: Rol = 'KULLANICI';
  protected kullaniciAdi = '';
  protected eposta = '';
  protected sifre = '';
  protected sifreTekrar = '';
  protected readonly sifreGoster = signal(false);

  protected kayitOl(): void {
    if (this.sifre !== this.sifreTekrar) {
      this.bildirim.add({ severity: 'warn', summary: 'Parolalar aynı değil.' });
      return;
    }
    this.kimlik.kayitOl(this.kullaniciAdi, this.eposta, this.sifre, this.rol).subscribe({
      next: () => this.kimlik.kayitPenceresiAcik.set(false),
      error: () =>
        this.bildirim.add({
          severity: 'error',
          summary: 'Kayıt olunamadı.',
          detail: 'Kullanıcı adı veya e-posta kullanılıyor olabilir.',
        }),
    });
  }
}
