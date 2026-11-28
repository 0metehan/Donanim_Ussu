import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Degerlendirme, Kategori, Konu, Kullanici, Rapor, Yorum } from '../models/modeller';

@Service()
export class Forum {
  private readonly http = inject(HttpClient);

  kategoriler(): Observable<Kategori[]> {
    return this.http.get<Kategori[]>('/api/Kategori');
  }

  konular(kategoriId?: number, ara?: string): Observable<Konu[]> {
    const params: Record<string, string | number> = {};
    if (kategoriId) params['kategoriId'] = kategoriId;
    if (ara) params['ara'] = ara;
    return this.http.get<Konu[]>('/api/Konu', { params });
  }

  konuEkle(baslik: string, icerik: string, kategoriId: number): Observable<Konu> {
    return this.http.post<Konu>('/api/Konu', { baslik, icerik, kategori: { id: kategoriId } });
  }

  konu(id: number): Observable<Konu> {
    return this.http.get<Konu>(`/api/Konu/${id}`);
  }

  konuGuncelle(konu: Konu, baslik: string, icerik: string): Observable<void> {
    return this.http.put<void>(`/api/Konu/${konu.id}`, {
      baslik,
      icerik,
      kategori: { id: konu.kategori.id },
    });
  }

  konuSil(id: number): Observable<void> {
    return this.http.delete<void>(`/api/Konu/${id}`);
  }

  yorumlar(konuId: number): Observable<Yorum[]> {
    return this.http.get<Yorum[]>('/api/Yorum', { params: { konuId } });
  }

  yorumEkle(konuId: number, icerik: string): Observable<Yorum> {
    return this.http.post<Yorum>('/api/Yorum', { icerik, konu: { id: konuId } });
  }

  yorumGuncelle(id: number, icerik: string): Observable<void> {
    return this.http.put<void>(`/api/Yorum/${id}`, { icerik });
  }

  yorumSil(id: number): Observable<void> {
    return this.http.delete<void>(`/api/Yorum/${id}`);
  }

  puanlar(konuId: number): Observable<Degerlendirme[]> {
    return this.http.get<Degerlendirme[]>('/api/Degerlendirme', { params: { konuId } });
  }

  puanla(puan: number, hedef: { konuId?: number; yorumId?: number }): Observable<void> {
    return this.http.post<void>('/api/Degerlendirme', {
      puan,
      konu: hedef.konuId ? { id: hedef.konuId } : null,
      yorum: hedef.yorumId ? { id: hedef.yorumId } : null,
    });
  }

  raporla(sebep: string, hedef: { konuId?: number; yorumId?: number }): Observable<void> {
    return this.http.post<void>('/api/Rapor', {
      sebep,
      konu: hedef.konuId ? { id: hedef.konuId } : null,
      yorum: hedef.yorumId ? { id: hedef.yorumId } : null,
    });
  }

  raporlar(): Observable<Rapor[]> {
    return this.http.get<Rapor[]>('/api/Rapor');
  }

  uyar(raporId: number): Observable<Kullanici> {
    return this.http.post<Kullanici>(`/api/Rapor/${raporId}/uyar`, {});
  }

  kullanici(id: number): Observable<Kullanici> {
    return this.http.get<Kullanici>(`/api/Kullanici/${id}`);
  }

  kullaniciYorumlari(kullaniciId: number): Observable<Yorum[]> {
    return this.http.get<Yorum[]>('/api/Yorum', { params: { kullaniciId } });
  }

  kullaniciPuanlari(kullaniciId: number): Observable<Degerlendirme[]> {
    return this.http.get<Degerlendirme[]>('/api/Degerlendirme', { params: { kullaniciId } });
  }

  tumKullanicilar(): Observable<Kullanici[]> {
    return this.http.get<Kullanici[]>('/api/Kullanici');
  }

  tumYorumlar(): Observable<Yorum[]> {
    return this.http.get<Yorum[]>('/api/Yorum');
  }

  tumPuanlar(): Observable<Degerlendirme[]> {
    return this.http.get<Degerlendirme[]>('/api/Degerlendirme');
  }

  biyografiGuncelle(biyografi: string): Observable<Kullanici> {
    return this.http.put<Kullanici>('/api/Kullanici/biyografi', { biyografi });
  }

  kullaniciSil(id: number): Observable<void> {
    return this.http.delete<void>(`/api/Kullanici/${id}`);
  }

  avatarGuncelle(avatar: string): Observable<Kullanici> {
    return this.http.put<Kullanici>('/api/Kullanici/avatar', { avatar });
  }

  raporKapat(id: number): Observable<void> {
    return this.http.delete<void>(`/api/Rapor/${id}`);
  }
}
