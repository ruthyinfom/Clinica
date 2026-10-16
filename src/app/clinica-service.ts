import { Injectable } from '@angular/core';
import { Consulta } from './consulta';

@Injectable({
  providedIn: 'root'
})
export class ClinicaService {

  consultas: Consulta[] = [];

  constructor() {
    const dados = sessionStorage.getItem('consultas');

    if (dados) {
      this.consultas = JSON.parse(dados);
    }
  }

  cadastrar(consulta: Consulta): void {
    this.consultas.push(consulta);

    sessionStorage.setItem(
      'consultas',
      JSON.stringify(this.consultas)
    );
  }

  listar(): Consulta[] {
    const dados = sessionStorage.getItem('consultas');

    if (dados) {
      this.consultas = JSON.parse(dados);
    }

    return this.consultas;
  }

  calcularTotal(): number {
    return this.listar().reduce(
      (total, consulta) => total + consulta.preco,
      0
    );
  }
}