import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Donanım Üssü',
    // Sayfa ayrı bir dosya olarak, ihtiyaç olunca yüklenir (lazy loading)
    loadComponent: () => import('./pages/ana-sayfa/ana-sayfa').then((m) => m.AnaSayfa),
  },
  {
    // Aynı ana sayfa, sadece o kategorinin konularıyla açılır
    path: 'kategori/:id',
    title: 'Donanım Üssü',
    loadComponent: () => import('./pages/ana-sayfa/ana-sayfa').then((m) => m.AnaSayfa),
  },
  {
    // Konu sayfası: konunun kendisi ve yorumları
    path: 'konu/:id',
    title: 'Donanım Üssü',
    loadComponent: () => import('./pages/konu-sayfasi/konu-sayfasi').then((m) => m.KonuSayfasi),
  },
  {
    // Raporlanan konu ve yorumlar (sadece moderatör/admin)
    path: 'raporlar',
    title: 'Raporlar - Donanım Üssü',
    loadComponent: () => import('./pages/raporlar/raporlar').then((m) => m.Raporlar),
  },
  { path: '**', redirectTo: '' },
];
