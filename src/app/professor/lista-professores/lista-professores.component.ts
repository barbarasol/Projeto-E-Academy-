import { Component, OnInit } from '@angular/core';

import { BuscarListaProfessoresService } from './../buscar-lista-professores.service';
import { Professor } from './../../shared/professor';

@Component({
  selector: 'app-lista-professores',
  templateUrl: './lista-professores.component.html',
  styleUrls: ['./lista-professores.component.css']
})
export class ListaProfessoresComponent implements OnInit {

  professores: Professor[] = [];

  constructor(
    private buscarListaProfessores: BuscarListaProfessoresService
  ) { }

  ngOnInit(): void {
    this.buscarDados();
  }

  buscarDados(){
    this.professores = this.buscarListaProfessores.obterListaProfessores();
  }

}
