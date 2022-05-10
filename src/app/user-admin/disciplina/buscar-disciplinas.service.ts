import { Injectable } from '@angular/core';

import { Disciplina } from '../../shared/disciplina';

@Injectable({
  providedIn: 'root'
})
export class BuscarDisciplinasService {

  constructor() { }

  disciplinasEscolhidas = this.buscaDisciplinasEscolhidas();

  disciplinas: Disciplina[] = [{
    nome: 'Logica de Programação',
    semestre: '1',
    cargaHoraria: '12',
    periodo: 'matutino',
    id: 1
  },
  {
    nome: 'Logica Matemática',
    semestre: '1',
    cargaHoraria: '8',
    periodo: 'matutino',
    id: 2
  },
  {
    nome: 'Banco de Dados',
    semestre: '2',
    cargaHoraria: '10',
    periodo: 'noturno',
    id: 3
  },
  {
    nome: 'Engenharia de Requisitos',
    semestre: '2',
    cargaHoraria: '8',
    periodo: 'matutino',
    id: 4
  },
  {
    nome: 'Banco de Dados Avançado',
    semestre: '5',
    cargaHoraria: '12',
    periodo: 'noturno',
    id: 5
  },
  {
    nome: 'Programação Orientada a Objetos',
    semestre: '3',
    cargaHoraria: '15',
    periodo: 'matutino',
    id: 6
  },
  {
    nome: 'Programação Estruturada',
    semestre: '2',
    cargaHoraria: '10',
    periodo: 'noturno',
    id: 7
  },
  {
    nome: 'Programação para Web',
    semestre: '4',
    cargaHoraria: '15',
    periodo: 'noturno',
    id: 8
  },
  {
    nome: 'Interação Infertace Humano e Computador',
    semestre: '4',
    cargaHoraria: '10',
    periodo: 'noturno',
    id: 9
  },
  {
    nome: 'Arquitetura de Computadores',
    semestre: '3',
    cargaHoraria: '8',
    periodo: 'matutino',
    id: 10
  },
  {
    nome: 'Programação APP',
    semestre: '5',
    cargaHoraria: '12',
    periodo: 'noturno',
    id: 11
  },
  {
    nome: 'Teste de Software',
    semestre: '5',
    cargaHoraria: '10',
    periodo: 'noturno',
    id: 12
  }
]

  getDisciplinas(){
    return this.disciplinas;
  }

  addDisciplinasEscolhidas(disciplinas: any){
    window.localStorage.setItem('DisciplinasEscolhidas', JSON.stringify(disciplinas))
  }

  buscaDisciplinasEscolhidas(){
    const disciplinasEscolhidas = 'DisciplinasEscolhidas';
    const busca = JSON.parse(JSON.stringify(window.localStorage.getItem(disciplinasEscolhidas)));
    const dados = JSON.parse(busca);
    if(dados==null || dados.length==0){
      return []
    }else{
      return dados;
    }
  }

  mostrarDisciplinasTemplate(){
    var disciplinasDisponiveis: Disciplina[] = [];
    for(let i=0; i<this.disciplinas.length; i++){
      var contadorDadosIgual = false;
      var contadorDadosDiferente = false;
      this.disciplinasEscolhidas = this.buscaDisciplinasEscolhidas()
      if(this.disciplinasEscolhidas==null || this.disciplinasEscolhidas.length==0){
         contadorDadosDiferente=true;
         contadorDadosIgual=false;
      }else{
       for(let j=0; j<this.disciplinasEscolhidas.length; j++){
          if(this.disciplinas[i].nome === this.disciplinasEscolhidas[j].nome){
            contadorDadosIgual = true;
          }else{
           contadorDadosDiferente = true;
          }
        }
      }
      if(contadorDadosDiferente==true && contadorDadosIgual==false){
        disciplinasDisponiveis.push(this.disciplinas[i]);
      }
    }
    return disciplinasDisponiveis;
  }

}
