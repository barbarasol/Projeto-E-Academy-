import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DadosTurmasService {
  constructor() {}

  addTurmas(turmas: any){
    window.localStorage.setItem('Turmas', JSON.stringify(turmas));
  }

  buscaTurmas(){
    const turmas = 'Turmas';
    const busca = JSON.parse(JSON.stringify(window.localStorage.getItem(turmas)));
    const dados = JSON.parse(busca);
    if(dados==null || dados.length==0){
      return []
    }else{
      return dados;
    }
  }
}
