import { Component, OnInit } from '@angular/core';

import { Disciplina } from './../../shared/disciplina';
import { BuscarDisciplinasService } from './buscar-disciplinas.service';

@Component({
  selector: 'app-disciplina',
  templateUrl: './disciplina.component.html',
  styleUrls: ['./disciplina.component.css']
})
export class DisciplinaComponent implements OnInit {

  disciplinas: Disciplina[] = [];

  constructor(
    private buscaDisciplinas: BuscarDisciplinasService
  ) { }

  ngOnInit(): void {
    this.buscaDadosDisciplina();
  }

  buscaDadosDisciplina(){
    this.disciplinas = this.buscaDisciplinas.getDisciplinas();
  }


}
