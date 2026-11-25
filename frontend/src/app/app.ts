import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UstBar } from './layout/ust-bar/ust-bar';

@Component({
  imports: [RouterOutlet, UstBar],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {}
