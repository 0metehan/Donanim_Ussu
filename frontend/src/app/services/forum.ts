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

  // Konuları getirir; kategoriId verilirse sadece o kategorinin konuları gelir
  // -> GET /api/Konu  veya  GET /api/Konu?kategoriId=3
  konular(kategoriId?: number): Observable<Konu[]> {
    if (kategoriId) {
      return this.http.get<Konu[]>('/api/Konu', { params: { kategoriId } });
    }
    return this.http.get<Konu[]>('/api/Konu');
  }
}
