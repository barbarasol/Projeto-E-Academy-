import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DadosAlunosFaltososService{
  constructor(){  }

  addAlunosFaltosos(alunosFaltosos: any){
    window.localStorage.setItem('AlunosFaltosos', JSON.stringify(alunosFaltosos))
  }

  getAlunosFaltosos(){
    const alunosFaltosos = 'AlunosFaltosos'
    const busca = JSON.parse(JSON.stringify(window.localStorage.getItem(alunosFaltosos)));
    const dados = JSON.parse(busca)
    if(dados==null || dados.length==0){
      return []
    }else{
      return dados;
    }
  }
}
