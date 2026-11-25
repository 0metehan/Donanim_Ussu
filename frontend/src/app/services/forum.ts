import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Kategori, Konu } from '../models/modeller';

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
}
