import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { Divider } from 'primeng/divider';
import { Message } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { Tabs, TabList, Tab } from 'primeng/tabs';
import { KonuPenceresi } from '../../layout/konu-penceresi/konu-penceresi';
import { Konu } from '../../models/modeller';
import { Forum } from '../../services/forum';
import { Kimlik } from '../../services/kimlik';

@Component({
  imports: [DatePipe, Button, Card, Divider, Message, TableModule, Tabs, TabList, Tab, KonuPenceresi],
  selector: 'app-ana-sayfa',
  styleUrl: './ana-sayfa.scss',
  templateUrl: './ana-sayfa.html',
})
export class AnaSayfa {
  private readonly forum = inject(Forum);
  private readonly kimlik = inject(Kimlik);

  protected readonly konuPenceresiAcik = signal(false);

  protected readonly konular = signal<Konu[]>([]);
  protected readonly yukleniyor = signal(false);
  protected readonly hata = signal<string | null>(null);

  // Sağdaki "En Son İçerikler" kutusu: en yeni 5 konu
  protected readonly sonKonular = computed(() => this.konular().slice(0, 5));

  constructor() {
    this.konulariGetir();
  }

  // Giriş yapılmışsa konu penceresini, yapılmamışsa giriş penceresini açar
  protected yeniKonuAc(): void {
    if (this.kimlik.kullanici()) {
      this.konuPenceresiAcik.set(true);
    } else {
      this.kimlik.girisPenceresiniAc();
    }
  }

  protected konulariGetir(): void {
    this.yukleniyor.set(true);
    this.hata.set(null);
    this.forum.konular().subscribe({
      next: (veri) => {
        this.konular.set(this.yeniden(veri));
        this.yukleniyor.set(false);
      },
      error: (err) => {
        this.konular.set([]);
        this.hata.set(`Konular yüklenemedi (durum: ${err.status})`);
        this.yukleniyor.set(false);
      },
    });
  }

  // Konuları en yeniden en eskiye sıralar
  private yeniden(liste: Konu[]): Konu[] {
    return [...liste].sort((a, b) => b.olusturmaTarihi.localeCompare(a.olusturmaTarihi));
  }
}
