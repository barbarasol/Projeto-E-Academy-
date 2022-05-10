import { Injectable } from '@angular/core';

import { BuscarListaProfessoresService } from 'src/app/professor/buscar-lista-professores.service';
import { AcompanharListaService } from 'src/app/aluno/acompanhar-lista.service';

import { Aluno } from './../../shared/aluno';
import { Professor } from './../../shared/professor';

@Injectable({
  providedIn: 'root'
})
export class GuardaUsuariosCadastradosParaLoginService {

  professoresCadastradosAdmin: Professor[] = [];
  alunosCadastradosAdmin: Aluno[] = [];

  constructor(
    private buscaProfessores: BuscarListaProfessoresService,
    private buscaAlunos: AcompanharListaService
  ) { }

  //Para professores
  salvarLoginUsuarioTipoProfessor(loginProfessores: any, loginAtual: any){
    const usuarioProfessorValidoEncontraCadastrado = this.verificarProfessorCadastradoPorAdmin(loginAtual);
    if(usuarioProfessorValidoEncontraCadastrado==1){
      window.localStorage.setItem('LoginProfessores', JSON.stringify(loginProfessores))
    }else{
      window.alert("Usuario não cadastrado no sistema pelo administrador");
    }
  }

  obterLoginUsuarioTipoProfessor(){
    if(localStorage.length>0){
      const loginProfessores = 'LoginProfessores';
      const busca = JSON.parse(JSON.stringify(window.localStorage.getItem(loginProfessores)));
      const dados = JSON.parse(busca);
      return dados;
    }
    return [];
  }

  verificarProfessorCadastradoPorAdmin(loginAtual: any){
    this.professoresCadastradosAdmin = this.buscaProfessores.obterListaProfessores()
    var professorEncontrado = 0;
    for(let i=0; i<this.professoresCadastradosAdmin.length; i++){
      if(this.professoresCadastradosAdmin[i].nome == loginAtual.nome && this.professoresCadastradosAdmin[i].sobrenome == loginAtual.sobrenome && this.professoresCadastradosAdmin[i].registro == loginAtual.registro){
        professorEncontrado++;
      }
    }
    return professorEncontrado;
  }

  //Para alunos:
  salvarLoginUsuarioTipoAluno(loginAlunos: any, loginAtual: any){
    const usuarioAlunoValidoEncontraCadastrado = this.verificarAlunosCadastradosPorAdmin(loginAtual);
    if(usuarioAlunoValidoEncontraCadastrado==1){
      window.localStorage.setItem('LoginAlunos', JSON.stringify(loginAlunos))
    }else{
      window.alert("Usuario não cadastrado no sistema pelo administrador");
    }
  }

  verificarAlunosCadastradosPorAdmin(loginAtual: any){
    this.alunosCadastradosAdmin = this.buscaAlunos.obterDados();
    var alunoEncontrado = 0;
    for(let i=0; i<this.alunosCadastradosAdmin.length; i++){
      if(this.alunosCadastradosAdmin[i].nome == loginAtual.nome && this.alunosCadastradosAdmin[i].sobrenome == loginAtual.sobrenome && this.alunosCadastradosAdmin[i].matricula == loginAtual.registro){
        alunoEncontrado++;
      }
    }
    return alunoEncontrado;
  }

  obterLoginUsuarioTipoAluno(){
    if(localStorage.length>0){
      const loginAlunos = 'LoginAlunos';
      const busca = JSON.parse(JSON.stringify(window.localStorage.getItem(loginAlunos)));
      const dados = JSON.parse(busca);
      return dados;
    }
    return [];
  }

}
