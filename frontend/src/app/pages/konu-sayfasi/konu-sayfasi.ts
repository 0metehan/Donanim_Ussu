import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { Dialog } from 'primeng/dialog';
import { Divider } from 'primeng/divider';
import { InputText } from 'primeng/inputtext';
import { Rating } from 'primeng/rating';
import { Tag } from 'primeng/tag';
import { Textarea } from 'primeng/textarea';
import { Degerlendirme, Konu, Kullanici, Yorum } from '../../models/modeller';
import { Forum } from '../../services/forum';
import { Kimlik, ROL_ADLARI } from '../../services/kimlik';

type Hedef = { konuId?: number; yorumId?: number };

@Component({
  imports: [
    DatePipe,
    DecimalPipe,
    FormsModule,
    RouterLink,
    Breadcrumb,
    Button,
    Card,
    Dialog,
    Divider,
    InputText,
    Rating,
    Tag,
    Textarea,
  ],
  selector: 'app-konu-sayfasi',
  styleUrl: './konu-sayfasi.scss',
  templateUrl: './konu-sayfasi.html',
})
export class KonuSayfasi {
  private readonly forum = inject(Forum);
  private readonly router = inject(Router);
  private readonly onay = inject(ConfirmationService);
  private readonly bildirim = inject(MessageService);
  protected readonly kimlik = inject(Kimlik);
  protected readonly rolAdlari = ROL_ADLARI;

  readonly id = input<string>();

  protected readonly konu = signal<Konu | null>(null);
  protected readonly yorumlar = signal<Yorum[]>([]);
  protected readonly puanlar = signal<Degerlendirme[]>([]);
  protected readonly sonKonular = signal<Konu[]>([]);

  protected readonly konuDuzenleniyor = signal(false);
  protected baslik = '';
  protected icerik = '';

  protected yeniYorum = '';
  protected readonly duzenlenenYorumId = signal<number | null>(null);
  protected duzenlenenMetin = '';

  protected readonly raporHedefi = signal<Hedef | null>(null);
  protected raporSebebi = '';

  protected readonly yol = computed<MenuItem[]>(() => {
    const k = this.konu();
    return k ? [{ label: k.kategori.ad, routerLink: ['/kategori', k.kategori.id] }, { label: k.baslik }] : [];
  });

  protected readonly yetkili = computed(() => {
    const rol = this.kimlik.kullanici()?.rol;
    return rol === 'MODERATOR' || rol === 'ADMIN';
  });

  constructor() {
    effect(() => this.yukle(Number(this.id())));
    this.forum.konular().subscribe((liste) =>
      this.sonKonular.set([...liste].sort((a, b) => b.olusturmaTarihi.localeCompare(a.olusturmaTarihi)).slice(0, 5)),
    );
  }

  protected sahibi(kullanici: Kullanici): boolean {
    return this.kimlik.kullanici()?.id === kullanici.id;
  }

  protected silebilir(kullanici: Kullanici): boolean {
    return this.sahibi(kullanici) || this.yetkili();
  }

  private yukle(id: number): void {
    this.konuDuzenleniyor.set(false);
    this.duzenlenenYorumId.set(null);
    this.forum.konu(id).subscribe({
      next: (k) => this.konu.set(k),
      error: () => this.bildirim.add({ severity: 'error', summary: 'Konu yüklenemedi.' }),
    });
    this.yorumlariGetir(id);
    this.puanlariGetir(id);
  }

  private yorumlariGetir(konuId: number): void {
    this.forum.yorumlar(konuId).subscribe((liste) => this.yorumlar.set(liste));
  }

  private puanlariGetir(konuId: number): void {
    this.forum.puanlar(konuId).subscribe((liste) => this.puanlar.set(liste));
  }

  protected konuyuDuzenle(k: Konu): void {
    this.baslik = k.baslik;
    this.icerik = k.icerik;
    this.konuDuzenleniyor.set(true);
  }

  protected konuyuKaydet(k: Konu): void {
    this.forum.konuGuncelle(k, this.baslik, this.icerik).subscribe(() => {
      this.konu.set({ ...k, baslik: this.baslik, icerik: this.icerik });
      this.konuDuzenleniyor.set(false);
    });
  }

  protected konuyuSil(k: Konu): void {
    this.onay.confirm({
      header: 'Konuyu sil',
      message: 'Bu konu silinsin mi?',
      acceptButtonProps: { label: 'Sil', severity: 'danger', style: { width: '7rem' } },
      rejectButtonProps: { label: 'Vazgeç', severity: 'secondary', outlined: true, style: { width: '7rem' } },
      accept: () => this.forum.konuSil(k.id).subscribe(() => this.router.navigate(['/'])),
    });
  }

  protected yorumEkle(k: Konu): void {
    this.forum.yorumEkle(k.id, this.yeniYorum).subscribe((y) => {
      this.yeniYorum = '';
      this.yorumlariGetir(k.id);
      if (y.gizli) this.bildirim.add({ severity: 'warn', summary: 'Yorumun incelemeye alındı.' });
    });
  }

  protected yorumuDuzenle(y: Yorum): void {
    this.duzenlenenMetin = y.icerik;
    this.duzenlenenYorumId.set(y.id);
  }

  protected yorumuKaydet(y: Yorum): void {
    this.forum.yorumGuncelle(y.id, this.duzenlenenMetin).subscribe(() => {
      y.icerik = this.duzenlenenMetin;
      this.duzenlenenYorumId.set(null);
    });
  }

  protected yorumuSil(y: Yorum): void {
    this.onay.confirm({
      header: 'Yorumu sil',
      message: 'Bu yorum silinsin mi?',
      acceptButtonProps: { label: 'Sil', severity: 'danger', style: { width: '7rem' } },
      rejectButtonProps: { label: 'Vazgeç', severity: 'secondary', outlined: true, style: { width: '7rem' } },
      accept: () =>
        this.forum.yorumSil(y.id).subscribe(() => this.yorumlar.update((l) => l.filter((x) => x.id !== y.id))),
    });
  }

  protected puanBilgisi(hedef: Hedef) {
    const liste = this.puanlar().filter((p) =>
      hedef.yorumId ? p.yorum?.id === hedef.yorumId : p.konu?.id === hedef.konuId,
    );
    const toplam = liste.reduce((t, p) => t + p.puan, 0);
    return {
      ortalama: liste.length ? toplam / liste.length : 0,
      sayi: liste.length,
      benim: liste.find((p) => p.kullanici.id === this.kimlik.kullanici()?.id)?.puan ?? 0,
    };
  }

  protected puanVer(puan: number, hedef: Hedef): void {
    this.forum.puanla(puan, hedef).subscribe(() => this.puanlariGetir(this.konu()!.id));
  }

  protected raporPenceresiniAc(hedef: Hedef): void {
    this.raporSebebi = '';
    this.raporHedefi.set(hedef);
  }

  protected raporGonder(): void {
    this.forum.raporla(this.raporSebebi, this.raporHedefi()!).subscribe(() => {
      this.raporHedefi.set(null);
      this.bildirim.add({ severity: 'success', summary: 'Raporun iletildi.' });
    });
  }
}
