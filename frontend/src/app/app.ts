import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UstBar } from './layout/ust-bar/ust-bar';
import { GirisPenceresi } from './layout/giris-penceresi/giris-penceresi';
import { KayitPenceresi } from './layout/kayit-penceresi/kayit-penceresi';

@Component({
  imports: [RouterOutlet, UstBar, GirisPenceresi, KayitPenceresi],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {}
