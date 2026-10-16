import { Component, signal } from '@angular/core';
import { Consultas } from './consultas-component/consultas';

@Component({
  selector: 'app-root',
  imports: [Consultas],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Clinica');
}
