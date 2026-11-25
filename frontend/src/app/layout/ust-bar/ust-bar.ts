import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Button } from 'primeng/button';
import { Menubar } from 'primeng/menubar';
import { InputText } from 'primeng/inputtext';
import { Forum } from '../../services/forum';
import { Kimlik } from '../../services/kimlik';

@Component({
  imports: [RouterLink, Button, Menubar, InputText],
  selector: 'app-ust-bar',
  templateUrl: './ust-bar.html',
})
export class UstBar {
  private readonly forum = inject(Forum);
  protected readonly kimlik = inject(Kimlik);
  private readonly router = inject(Router);

  protected readonly karanlik = signal(false);

  protected readonly menu = signal<MenuItem[]>(this.menuOlustur([]));

  constructor() {
    // "Forumlar" menüsünün altını backend'deki kategorilerle doldur
    this.forum.kategoriler().subscribe({
      next: (kategoriler) =>
        this.menu.set(
          this.menuOlustur(
            kategoriler.map((k) => ({ label: k.ad, icon: 'pi pi-folder', routerLink: ['/kategori', k.id] })),
          ),
        ),
    });
  }

  // Ana sayfayı /?ara=kelime adresiyle açar; boşsa normal ana sayfaya döner
  protected ara(kelime: string): void {
    const temiz = kelime.trim();
    this.router.navigate(['/'], { queryParams: temiz ? { ara: temiz } : {} });
  }

  protected temaDegistir(): void {
    this.karanlik.update((deger) => !deger);
    document.documentElement.classList.toggle('karanlik', this.karanlik());
  }

  private menuOlustur(kategoriler: MenuItem[]): MenuItem[] {
    return [
      { label: 'Ana Sayfa', icon: 'pi pi-home', routerLink: '/' },
      {
        label: 'Forumlar',
        icon: 'pi pi-comments',
        items: kategoriler.length ? kategoriler : [{ label: 'Kategori yok', disabled: true }],
      },
    ];
  }
}
