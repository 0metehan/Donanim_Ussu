import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Donanım Üssü',
    // Sayfa ayrı bir dosya olarak, ihtiyaç olunca yüklenir (lazy loading)
    loadComponent: () => import('./pages/ana-sayfa/ana-sayfa').then((m) => m.AnaSayfa),
  },
  { path: '**', redirectTo: '' },
];
