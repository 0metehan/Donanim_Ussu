import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Degerlendirme, Kategori, Konu, Kullanici, Rapor, Yorum } from '../models/modeller';

@Service()
export class Forum {
  private readonly http = inject(HttpClient);

  // Tüm kategorileri getirir -> GET /api/Kategori
  kategoriler(): Observable<Kategori[]> {
    return this.http.get<Kategori[]>('/api/Kategori');
  }

  // Konuları getirir; kategoriId verilirse o kategorinin konuları,
  // ara verilirse başlığında o kelime geçen konular gelir
  // -> GET /api/Konu, /api/Konu?kategoriId=3 veya /api/Konu?ara=rtx
  konular(kategoriId?: number, ara?: string): Observable<Konu[]> {
    const params: Record<string, string | number> = {};
    if (kategoriId) params['kategoriId'] = kategoriId;
    if (ara) params['ara'] = ara;
    return this.http.get<Konu[]>('/api/Konu', { params });
  }

  // Yeni konu açar -> POST /api/Konu
  // Konunun sahibini backend token'dan alır, kullanıcı göndermeye gerek yok.
  konuEkle(baslik: string, icerik: string, kategoriId: number): Observable<Konu> {
    return this.http.post<Konu>('/api/Konu', { baslik, icerik, kategori: { id: kategoriId } });
  }

  // Tek bir konuyu getirir -> GET /api/Konu/5
  konu(id: number): Observable<Konu> {
    return this.http.get<Konu>(`/api/Konu/${id}`);
  }

  // Konuyu günceller -> PUT /api/Konu/5 (backend kategoriyi de istiyor)
  konuGuncelle(konu: Konu, baslik: string, icerik: string): Observable<void> {
    return this.http.put<void>(`/api/Konu/${konu.id}`, {
      baslik,
      icerik,
      kategori: { id: konu.kategori.id },
    });
  }

  // Konuyu siler -> DELETE /api/Konu/5
  konuSil(id: number): Observable<void> {
    return this.http.delete<void>(`/api/Konu/${id}`);
  }

  // Bir konunun yorumlarını getirir -> GET /api/Yorum?konuId=5
  yorumlar(konuId: number): Observable<Yorum[]> {
    return this.http.get<Yorum[]>('/api/Yorum', { params: { konuId } });
  }

  // Yorum ekler -> POST /api/Yorum (yazanı backend token'dan alır)
  yorumEkle(konuId: number, icerik: string): Observable<Yorum> {
    return this.http.post<Yorum>('/api/Yorum', { icerik, konu: { id: konuId } });
  }

  // Yorumu günceller -> PUT /api/Yorum/7
  yorumGuncelle(id: number, icerik: string): Observable<void> {
    return this.http.put<void>(`/api/Yorum/${id}`, { icerik });
  }

  // Yorumu siler -> DELETE /api/Yorum/7
  yorumSil(id: number): Observable<void> {
    return this.http.delete<void>(`/api/Yorum/${id}`);
  }

  // Konuya ve yorumlarına verilen tüm puanlar -> GET /api/Degerlendirme?konuId=5
  puanlar(konuId: number): Observable<Degerlendirme[]> {
    return this.http.get<Degerlendirme[]>('/api/Degerlendirme', { params: { konuId } });
  }

  // Konuya ya da yoruma puan verir (tekrar verilirse güncellenir) -> POST /api/Degerlendirme
  puanla(puan: number, hedef: { konuId?: number; yorumId?: number }): Observable<void> {
    return this.http.post<void>('/api/Degerlendirme', {
      puan,
      konu: hedef.konuId ? { id: hedef.konuId } : null,
      yorum: hedef.yorumId ? { id: hedef.yorumId } : null,
    });
  }

  // Konuyu ya da yorumu raporlar -> POST /api/Rapor
  raporla(sebep: string, hedef: { konuId?: number; yorumId?: number }): Observable<void> {
    return this.http.post<void>('/api/Rapor', {
      sebep,
      konu: hedef.konuId ? { id: hedef.konuId } : null,
      yorum: hedef.yorumId ? { id: hedef.yorumId } : null,
    });
  }

  // Tüm raporlar (sadece moderatör/admin) -> GET /api/Rapor
  raporlar(): Observable<Rapor[]> {
    return this.http.get<Rapor[]>('/api/Rapor');
  }

  // İçeriğin sahibine uyarı verir (3 uyarıda ban), raporu kapatır -> POST /api/Rapor/3/uyar
  uyar(raporId: number): Observable<Kullanici> {
    return this.http.post<Kullanici>(`/api/Rapor/${raporId}/uyar`, {});
  }

  // Raporu kapatır -> DELETE /api/Rapor/3
  raporKapat(id: number): Observable<void> {
    return this.http.delete<void>(`/api/Rapor/${id}`);
  }
}
