import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Avatar } from 'primeng/avatar';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { Dialog } from 'primeng/dialog';
import { Divider } from 'primeng/divider';
import { ProgressBar } from 'primeng/progressbar';
import { Tag } from 'primeng/tag';
import { Textarea } from 'primeng/textarea';
import { AVATARLAR, Degerlendirme, Kullanici, RANKLAR, Yorum, avatarAdresi } from '../../models/modeller';
import { Forum } from '../../services/forum';
import { Kimlik } from '../../services/kimlik';

@Component({
  imports: [DatePipe, FormsModule, RouterLink, Avatar, Button, Card, Dialog, Divider, ProgressBar, Tag, Textarea],
  selector: 'app-profil',
  templateUrl: './profil.html',
})
export class Profil {
  private readonly forum = inject(Forum);
  private readonly bildirim = inject(MessageService);
  private readonly onay = inject(ConfirmationService);
  private readonly router = inject(Router);
  protected readonly kimlik = inject(Kimlik);

  readonly id = input<string>();

  protected readonly kullanici = signal<Kullanici | null>(null);
  protected readonly yorumlar = signal<Yorum[]>([]);
  protected readonly puanlar = signal<Degerlendirme[]>([]);
  protected biyografi = '';

  protected readonly avatarlar = AVATARLAR;
  protected readonly avatarAdresi = avatarAdresi;
  protected readonly avatarPenceresiAcik = signal(false);

  protected readonly benimProfilim = computed(() => this.kimlik.kullanici()?.id === Number(this.id()));

  protected readonly yildiz = computed(() => this.puanlar().reduce((t, p) => t + p.puan, 0));
  protected readonly toplamPuan = computed(() => this.yorumlar().length + this.yildiz());

  protected readonly rank = computed(() => {
    const puan = this.toplamPuan();
    let i = 0;
    while (RANKLAR[i + 1] && puan >= RANKLAR[i + 1].min) i++;
    const sonraki = RANKLAR[i + 1];
    return {
      ad: RANKLAR[i].ad,
      sonraki: sonraki?.ad,
      ilerleme: sonraki ? Math.round(((puan - RANKLAR[i].min) / (sonraki.min - RANKLAR[i].min)) * 100) : 100,
    };
  });

  constructor() {
    effect(() => {
      const id = Number(this.id());
      this.forum.kullanici(id).subscribe((k) => {
        this.kullanici.set(k);
        this.biyografi = k.biyografi ?? '';
      });
      this.forum.kullaniciYorumlari(id).subscribe((l) => this.yorumlar.set(l));
      this.forum.kullaniciPuanlari(id).subscribe((l) => this.puanlar.set(l));
    });
  }

  protected profiliSil(): void {
    this.onay.confirm({
      header: 'Profili sil',
      message: 'Hesabın silinecek. Konuların ve yorumların "Silinen kullanıcı" adıyla kalacak. Emin misin?',
      acceptButtonProps: { label: 'Sil', severity: 'danger', style: { width: '7rem' } },
      rejectButtonProps: { label: 'Vazgeç', severity: 'secondary', outlined: true, style: { width: '7rem' } },
      accept: () =>
        this.forum.kullaniciSil(Number(this.id())).subscribe(() => {
          this.kimlik.cikisYap();
          this.router.navigate(['/']);
          this.bildirim.add({ severity: 'success', summary: 'Profilin silindi.' });
        }),
    });
  }

  protected biyografiKaydet(): void {
    this.forum.biyografiGuncelle(this.biyografi).subscribe((k) => {
      this.kullanici.set(k);
      this.bildirim.add({ severity: 'success', summary: 'Biyografi kaydedildi.' });
    });
  }

  // Seçilen avatarı kaydeder; üst bardaki küçük avatar da hemen değişsin diye kimlik de güncellenir
  protected avatarSec(avatar: string): void {
    this.forum.avatarGuncelle(avatar).subscribe((k) => {
      this.kullanici.set(k);
      this.kimlik.kullanici.set(k);
      this.avatarPenceresiAcik.set(false);
    });
  }
}
