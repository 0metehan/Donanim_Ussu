import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { Divider } from 'primeng/divider';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { Tabs, TabList, Tab } from 'primeng/tabs';
import { KonuPenceresi } from '../../layout/konu-penceresi/konu-penceresi';
import { Konu } from '../../models/modeller';
import { Forum } from '../../services/forum';
import { Kimlik } from '../../services/kimlik';

@Component({
  imports: [DatePipe, RouterLink, Button, Card, Divider, TableModule, Tabs, TabList, Tab, KonuPenceresi],
  selector: 'app-ana-sayfa',
  styleUrl: './ana-sayfa.scss',
  templateUrl: './ana-sayfa.html',
})
export class AnaSayfa {
  private readonly forum = inject(Forum);
  private readonly kimlik = inject(Kimlik);
  private readonly bildirim = inject(MessageService);

  readonly id = input<string>();

  readonly ara = input<string>();

  private readonly kategoriler = toSignal(this.forum.kategoriler(), { initialValue: [] });

  protected readonly sekmeBasligi = computed(() => {
    const kategori = this.kategoriler().find((k) => k.id === Number(this.id()));
    const baslik = this.ara() ? `Arama: ${this.ara()}` : (kategori?.ad ?? 'Yeni Konular');
    return baslik.toLocaleUpperCase('tr-TR');
  });

  protected readonly konuPenceresiAcik = signal(false);

  protected readonly konular = signal<Konu[]>([]);
  protected readonly yukleniyor = signal(false);

  protected readonly sonKonular = signal<Konu[]>([]);

  constructor() {
    effect(() => this.konulariGetir());
    this.sonKonulariGetir();
  }

  protected sonKonulariGetir(): void {
    this.forum.konular().subscribe({
      next: (veri) => this.sonKonular.set(this.yeniden(veri).slice(0, 5)),
    });
  }

  protected yeniKonuAc(): void {
    if (this.kimlik.kullanici()) {
      this.konuPenceresiAcik.set(true);
    } else {
      this.kimlik.girisPenceresiniAc();
    }
  }

  protected konulariGetir(): void {
    this.yukleniyor.set(true);
    this.forum.konular(Number(this.id()) || undefined, this.ara()).subscribe({
      next: (veri) => {
        this.konular.set(this.yeniden(veri));
        this.yukleniyor.set(false);
      },
      error: (err) => {
        this.konular.set([]);
        this.bildirim.add({ severity: 'error', summary: `Konular yüklenemedi (durum: ${err.status})` });
        this.yukleniyor.set(false);
      },
    });
  }

  private yeniden(liste: Konu[]): Konu[] {
    return [...liste].sort((a, b) => b.olusturmaTarihi.localeCompare(a.olusturmaTarihi));
  }
}
