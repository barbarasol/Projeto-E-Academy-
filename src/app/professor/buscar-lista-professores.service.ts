import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BuscarListaProfessoresService {

  constructor() { }

  salvarProfessores(professores: any){
    window.localStorage.setItem('Professores', JSON.stringify(professores));
  }

  obterListaProfessores(){
    if (localStorage.length>0){
      const professores = 'Professores'
      const busca = JSON.parse(JSON.stringify(window.localStorage.getItem(professores)));
      const dados = JSON.parse(busca)
      return dados;
    }
    return [];
  }
}
