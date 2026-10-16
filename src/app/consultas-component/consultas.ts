import { Component, OnInit, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Consulta } from '../consulta';
import { ClinicaService } from '../clinica-service';

@Component({
  selector: 'app-consultas',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe],
  templateUrl: './consultas.html',
  styleUrl: './consultas.css'
})
export class Consultas implements OnInit {

  private fb = inject(FormBuilder);
  private clinicaService = inject(ClinicaService);

  consultas: Consulta[] = [];
  total = 0;

  formulario = this.fb.group({
    nomePaciente: ['', Validators.required],
    preco: [0, [Validators.required, Validators.min(0.01)]],
    data: ['', Validators.required]
  });

  ngOnInit(): void {
    this.atualizarLista();
  }

  cadastrar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const consulta: Consulta = {
      nomePaciente: this.formulario.value.nomePaciente!,
      preco: Number(this.formulario.value.preco),
      data: this.formulario.value.data!
    };

    this.clinicaService.cadastrar(consulta);

    this.formulario.reset({
      nomePaciente: '',
      preco: 0,
      data: ''
    });

    this.atualizarLista();
  }

  atualizarLista(): void {
    this.consultas = this.clinicaService.listar();
    this.total = this.clinicaService.calcularTotal();
  }
}