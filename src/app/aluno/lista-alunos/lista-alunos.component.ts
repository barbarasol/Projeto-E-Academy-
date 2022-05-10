import { Component, OnInit } from '@angular/core';

import { AcompanharListaService } from './../acompanhar-lista.service';
import { Aluno } from './../../shared/aluno';


@Component({
  selector: 'app-lista-alunos',
  templateUrl: './lista-alunos.component.html',
  styleUrls: ['./lista-alunos.component.css']
})
export class ListaAlunosComponent implements OnInit {

  alunos:  Aluno[] = [];

  constructor(
    private acompanharLista: AcompanharListaService
  ) { }

  ngOnInit(): void {
    this.buscarDados();
  }

  buscarDados(){
    this.alunos = this.acompanharLista.obterDados();
  }
}
