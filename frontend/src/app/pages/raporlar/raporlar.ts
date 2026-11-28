import { Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { Rapor } from '../../models/modeller';
import { Forum } from '../../services/forum';

@Component({
  imports: [DatePipe, RouterLink, Button, Card, TableModule],
  selector: 'app-raporlar',
  templateUrl: './raporlar.html',
})
export class Raporlar {
  private readonly forum = inject(Forum);
  private readonly onay = inject(ConfirmationService);
  private readonly bildirim = inject(MessageService);

  protected readonly raporlar = signal<Rapor[]>([]);

  constructor() {
    this.getir();
  }

  private getir(): void {
    this.forum.raporlar().subscribe((liste) => this.raporlar.set(liste));
  }

  protected sahip(r: Rapor) {
    return r.yorum ? r.yorum.kullanici : r.konu!.kullanici;
  }

  protected uyar(r: Rapor): void {
    this.onay.confirm({
      header: 'Uyarı ver',
      message: `${this.sahip(r).kullaniciAdi} kullanıcısına uyarı verilsin mi? 3 uyarıda banlanır.`,
      acceptButtonProps: { label: 'Uyar', severity: 'warn', style: { width: '7rem' } },
      rejectButtonProps: { label: 'Vazgeç', severity: 'secondary', outlined: true, style: { width: '7rem' } },
      accept: () =>
        this.forum.uyar(r.id).subscribe((k) => {
          this.bildirim.add(
            k.banli
              ? { severity: 'error', summary: `${k.kullaniciAdi} banlandı.` }
              : { severity: 'warn', summary: `${k.kullaniciAdi} uyarıldı (${k.uyariSayisi}/3).` },
          );
          this.getir();
        }),
    });
  }

  protected kapat(r: Rapor): void {
    this.forum.raporKapat(r.id).subscribe(() => this.getir());
  }

  protected icerigiSil(r: Rapor): void {
    this.onay.confirm({
      header: 'İçeriği sil',
      message: 'Bu içerik silinsin mi?',
      acceptButtonProps: { label: 'Sil', severity: 'danger', style: { width: '7rem' } },
      rejectButtonProps: { label: 'Vazgeç', severity: 'secondary', outlined: true, style: { width: '7rem' } },
      accept: () => {
        const istek = r.yorum ? this.forum.yorumSil(r.yorum.id) : this.forum.konuSil(r.konu!.id);
        istek.subscribe(() => this.getir());
      },
    });
  }
}
