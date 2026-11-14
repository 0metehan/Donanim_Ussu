import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet, JsonPipe],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  private readonly http = inject(HttpClient);

  protected readonly kategoriler = signal<unknown>(null);
  protected readonly hata = signal<string | null>(null);

  constructor() {
    // Proxy sayesinde /api/Kategori -> http://localhost:8080/Kategori
    this.http.get('/api/Kategori').subscribe({
      next: (veri) => this.kategoriler.set(veri),
      error: (err) => this.hata.set(`Backend'e ulaşılamadı (durum: ${err.status})`),
    });
  }
}
