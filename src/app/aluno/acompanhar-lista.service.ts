import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AcompanharListaService {

  constructor() { }

  salvar (alunos: any){
    window.localStorage.setItem('Alunos', JSON.stringify(alunos));
  }

  obterDados(){
    const alunos = 'Alunos'
    const busca = JSON.parse(JSON.stringify(window.localStorage.getItem(alunos)));
    const dados = JSON.parse(busca);
    if(dados==null || dados.length==0){
      return []
    }else{
      return dados;
    }
  }

}
