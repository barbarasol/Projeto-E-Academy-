import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DadosALunosNotasService{
  constructor(){}

  addNotasAlunos(notasAlunos: any){
    window.localStorage.setItem('NotasAlunos', JSON.stringify(notasAlunos))
  }

  getNotasAlunos(){
    const notasAlunos = 'NotasAlunos'
    const busca = JSON.parse(JSON.stringify(window.localStorage.getItem(notasAlunos)));
    const dados = JSON.parse(busca);
    if(dados==null || dados.length==0){
      return []
    }else{
      return dados;
    }
  }
}
