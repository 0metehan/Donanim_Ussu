import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Toast } from 'primeng/toast';
import { UstBar } from './layout/ust-bar/ust-bar';
import { GirisPenceresi } from './layout/giris-penceresi/giris-penceresi';
import { KayitPenceresi } from './layout/kayit-penceresi/kayit-penceresi';

@Component({
  imports: [RouterOutlet, ConfirmDialog, Toast, UstBar, GirisPenceresi, KayitPenceresi],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {}
