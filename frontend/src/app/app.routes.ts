import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Donanım Üssü',
    loadComponent: () => import('./pages/ana-sayfa/ana-sayfa').then((m) => m.AnaSayfa),
  },
  {
    path: 'kategori/:id',
    title: 'Donanım Üssü',
    loadComponent: () => import('./pages/ana-sayfa/ana-sayfa').then((m) => m.AnaSayfa),
  },
  {
    path: 'konu/:id',
    title: 'Donanım Üssü',
    loadComponent: () => import('./pages/konu-sayfasi/konu-sayfasi').then((m) => m.KonuSayfasi),
  },
  {
    path: 'raporlar',
    title: 'Raporlar - Donanım Üssü',
    loadComponent: () => import('./pages/raporlar/raporlar').then((m) => m.Raporlar),
  },
  {
    path: 'profil/:id',
    title: 'Profil - Donanım Üssü',
    loadComponent: () => import('./pages/profil/profil').then((m) => m.Profil),
  },
  {
    path: 'uyeler',
    title: 'Üyeler - Donanım Üssü',
    loadComponent: () => import('./pages/uyeler/uyeler').then((m) => m.Uyeler),
  },
  { path: '**', redirectTo: '' },
];
