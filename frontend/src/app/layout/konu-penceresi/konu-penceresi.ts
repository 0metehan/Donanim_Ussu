import { Component, inject, model, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputText } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { Select } from 'primeng/select';
import { Textarea } from 'primeng/textarea';
import { Kategori, Konu } from '../../models/modeller';
import { Forum } from '../../services/forum';
import { Kimlik } from '../../services/kimlik';

const EN_FAZLA_BASLIK = 200;

@Component({
  imports: [FormsModule, Button, Dialog, InputText, Select, Textarea],
  selector: 'app-konu-penceresi',
  templateUrl: './konu-penceresi.html',
})
export class KonuPenceresi {
  private readonly forum = inject(Forum);
  private readonly kimlik = inject(Kimlik);
  private readonly bildirim = inject(MessageService);

  protected readonly enFazlaBaslik = EN_FAZLA_BASLIK;

  // Pencere açık mı? Ana sayfa [(acik)] ile bağlanır.
  readonly acik = model(false);

  // Konu başarıyla eklenince ana sayfa listeyi yenilesin diye haber verir
  readonly eklendi = output<Konu>();

  protected readonly kategoriler = signal<Kategori[]>([]);

  // Form alanları
  protected baslik = '';
  protected kategoriId: number | null = null;
  protected icerik = '';

  protected readonly gonderiliyor = signal(false);

  constructor() {
    this.forum.kategoriler().subscribe({
      next: (veri) => this.kategoriler.set(veri),
    });
  }

  protected konuyuGonder(): void {
    const hata = this.formuDenetle();
    if (hata) {
      this.bildirim.add({ severity: 'warn', summary: hata });
      return;
    }

    this.gonderiliyor.set(true);

    this.forum.konuEkle(this.baslik.trim(), this.icerik.trim(), this.kategoriId!).subscribe({
      next: (konu) => {
        this.gonderiliyor.set(false);
        this.acik.set(false);
        this.formuTemizle();
        this.eklendi.emit(konu);
      },
      error: (err: unknown) => {
        this.gonderiliyor.set(false);
        this.bildirim.add({ severity: 'error', summary: this.hataMesaji(err) });
      },
    });
  }


  private formuDenetle(): string | null {
    const baslik = this.baslik.trim();
    if (!baslik || !this.kategoriId || !this.icerik.trim()) {
      return 'Başlık, kategori ve içerik gerekli.';
    }
    if (baslik.length > EN_FAZLA_BASLIK) {
      return `Başlık en fazla ${EN_FAZLA_BASLIK} karakter olabilir.`;
    }
    return null;
  }

  private formuTemizle(): void {
    this.baslik = '';
    this.kategoriId = null;
    this.icerik = '';
  }

  private hataMesaji(err: unknown): string {
    if (err instanceof HttpErrorResponse && err.status === 401) {
      // Token süresi dolmuş: oturumu kapat ve giriş penceresini aç
      this.kimlik.cikisYap();
      this.acik.set(false);
      this.kimlik.girisPenceresiniAc();
      return 'Oturumunuz sona ermiş, tekrar giriş yapın.';
    }
    if (err instanceof HttpErrorResponse && err.status === 400) {
      return 'Bilgiler geçersiz, alanları kontrol et.';
    }
    if (err instanceof HttpErrorResponse) {
      return `Konu eklenemedi (durum: ${err.status}).`;
    }
    return 'Beklenmeyen bir hata oluştu.';
  }
}
