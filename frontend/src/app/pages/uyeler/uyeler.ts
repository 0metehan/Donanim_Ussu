import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Avatar } from 'primeng/avatar';
import { Card } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { Kullanici, avatarAdresi, rankAdi } from '../../models/modeller';
import { Forum } from '../../services/forum';

type Uye = { kullanici: Kullanici; yorum: number; yildiz: number; puan: number; rank: string };

@Component({
  imports: [RouterLink, Avatar, Card, TableModule, Tag],
  selector: 'app-uyeler',
  templateUrl: './uyeler.html',
})
export class Uyeler {
  private readonly forum = inject(Forum);
  protected readonly avatarAdresi = avatarAdresi;
  protected readonly uyeler = signal<Uye[]>([]);

  constructor() {
    forkJoin([this.forum.tumKullanicilar(), this.forum.tumYorumlar(), this.forum.tumPuanlar()]).subscribe(
      ([kullanicilar, yorumlar, puanlar]) => {
        const liste = kullanicilar
          .filter((k) => !k.banli)
          .map((k) => {
            const yorum = yorumlar.filter((y) => y.kullanici.id === k.id).length;
            const yildiz = puanlar
              .filter((p) => (p.yorum ?? p.konu)?.kullanici.id === k.id)
              .reduce((t, p) => t + p.puan, 0);
            return { kullanici: k, yorum, yildiz, puan: yorum + yildiz, rank: rankAdi(yorum + yildiz) };
          });
        this.uyeler.set(liste.sort((a, b) => b.puan - a.puan));
      },
    );
  }
}
