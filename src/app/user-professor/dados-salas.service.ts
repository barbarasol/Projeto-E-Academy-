import { Injectable } from '@angular/core';
import { Salas } from '../shared/salas';

@Injectable({
  providedIn: 'root'
})
export class DadosSalasService{
  constructor(){}

  addSalas(sala: Salas){
    var chave = `Sala ${sala.nome}`
    window.localStorage.setItem(chave, JSON.stringify(sala))
  }

  getSalas(sala: Salas){
    var chave = `Sala ${sala.nome}`
    const busca = JSON.parse(JSON.stringify(window.localStorage.getItem(chave)));
    const dados = JSON.parse(busca);
    if(dados==null || dados.length==0){
      return []
    }else{
      return dados;
    }
  }

  getSala(disciplina: any){
    var chave = `Sala ${disciplina}`;
    const busca = JSON.parse(JSON.stringify(window.localStorage.getItem(chave)));
    const dados = JSON.parse(busca);
    if(dados==null || dados.length==0){
      return []
    }else{
      return dados.listaAlunos;
    }
  }
}
