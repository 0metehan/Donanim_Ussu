import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Button } from 'primeng/button';
import { Menubar } from 'primeng/menubar';
import { InputText } from 'primeng/inputtext';
import { Forum } from '../../services/forum';

@Component({
  imports: [RouterLink, Button, Menubar, InputText],
  selector: 'app-ust-bar',
  templateUrl: './ust-bar.html',
})
export class UstBar {
  private readonly forum = inject(Forum);

  protected readonly karanlik = signal(false);

  protected readonly menu = signal<MenuItem[]>(this.menuOlustur([]));

  constructor() {
    // "Forumlar" menüsünün altını backend'deki kategorilerle doldur
    this.forum.kategoriler().subscribe({
      next: (kategoriler) =>
        this.menu.set(
          this.menuOlustur(
            kategoriler.map((k) => ({ label: k.ad, icon: 'pi pi-folder' })),
          ),
        ),
    });
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
