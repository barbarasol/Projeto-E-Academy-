import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AcompanharListaService } from 'src/app/aluno/acompanhar-lista.service';
import { Aluno } from 'src/app/shared/aluno';
import { AlunosFaltosos } from 'src/app/shared/alunosFaltosos';

import { DadosAlunosFaltososService } from './../dados-alunos-faltosos.service';
import { Salas } from './../../shared/salas';
import { DadosTurmasService } from '../dados-turmas.service';
import { DadosSalasService } from '../dados-salas.service';

@Component({
  selector: 'app-lancar-faltas',
  templateUrl: './lancar-faltas.component.html',
  styleUrls: ['./lancar-faltas.component.css']
})
export class LancarFaltasComponent implements OnInit {
  listaAlunosCadastrados!: Aluno[];
  alunosPrimeiroSemestre!: Aluno[];
  alunosSegundoSemestre!: Aluno[];
  alunosTerceiroSemestre!: Aluno[];
  alunosQuartoSemestre!: Aluno[];
  alunosQuintoSemestre!: Aluno[];
  salaEngenhariadeRequisitos: Salas = this.inicializaVariaveisSala();
  salaLogicadeProgramacao: Salas = this.inicializaVariaveisSala();
  salaLogicaMatematica: Salas = this.inicializaVariaveisSala();
  salaBancodeDados: Salas = this.inicializaVariaveisSala();
  salaBancodeDadosAvancado: Salas = this.inicializaVariaveisSala();
  salaProgramacaoOrientadaaObjetos: Salas = this.inicializaVariaveisSala();
  salaProgramacaoEstruturada: Salas = this.inicializaVariaveisSala();
  salaProgramacaoparaWeb: Salas = this.inicializaVariaveisSala();
  salaInteracaoInterfaceHumanoeComputador: Salas = this.inicializaVariaveisSala();
  salaArquiteturadeComputadores: Salas = this.inicializaVariaveisSala();
  salaProgramacaoAPP: Salas = this.inicializaVariaveisSala();
  salaTestedeSoftware: Salas = this.inicializaVariaveisSala();
  formularioInformaDisciplina!: FormGroup;
  alunosDaDisciplina: Aluno[] = [];
  formularioFaltaAluno!: FormGroup;
  disciplina: any;
  alunosFaltososCadastrados!: AlunosFaltosos[];
  alunoFaltosoAtual!: any;

  constructor(
    private buscaAlunos: AcompanharListaService,
    private buscaTurmas: DadosTurmasService,
    private dadosSalas: DadosSalasService,
    private formBuilder: FormBuilder,
    private buscaDadosAlunosFaltosos: DadosAlunosFaltososService
  ) { }

  ngOnInit(): void {
    this.buscaListaAlunosCadastrados();
    this.adicionaAlunosNasTurmasDoSemestre();

    this.formularioInformaDisciplina = this.formBuilder.group({
      nome: [null, Validators.required],
      nomeProfessor: [null, Validators.required]
    });
    this.formularioFaltaAluno = this.formBuilder.group({
      nome: [null, Validators.required],
      sobrenome: [null, Validators.required],
      matricula: [null, Validators.required],
      dataFalta: [null, Validators.required]
    })
  }

  onSubmit(){
    const formularioDisciplinaValido = this.verificarValidadeFormularioDisciplina();
    if(formularioDisciplinaValido){

      var podeMostrarAlunos = this.verificaSeEOProfessor();
      if(podeMostrarAlunos){
        this.chamaSala();

      }
      this.disciplina = this.formularioInformaDisciplina.value.nome;
      this.resetarFormulario();
    }else{
      window.alert("Fomrulário Inválido");
      Object.keys(this.formularioInformaDisciplina.controls).forEach(campo => {
        const controle = this.formularioInformaDisciplina.get(campo);
        controle?.markAllAsTouched();
      })
    }
  }

  resetarFormulario(){
    this.formularioInformaDisciplina.reset();
  }

  verificarValidadeFormularioDisciplina(){
    if(this.formularioInformaDisciplina.valid){
      return true;
    }
    return false;
  }

  verificarValidTouchedInputDisciplina(campo: any){
    return !this.formularioInformaDisciplina.get(campo)?.valid && this.formularioInformaDisciplina.get(campo)?.touched
  }

  submitFormularioFalta(){
    const formularioFaltaValido = this.verificarValidadeFormularioFalta();
    if(formularioFaltaValido){
      var alunosComFaltas = this.buscaDadosAlunosFaltosos.getAlunosFaltosos();
      if(alunosComFaltas.length==0){
        this.alunosFaltososCadastrados = []
        this.alunoFaltosoAtual = {nome: this.formularioFaltaAluno.value.nome,
        sobrenome:  this.formularioFaltaAluno.value.sobrenome,
        matricula: this.formularioFaltaAluno.value.matricula,
        nomeDisciplina: this.disciplina,
        dataFalta: this.formularioFaltaAluno.value.dataFalta}
        this.alunosFaltososCadastrados.push(this.alunoFaltosoAtual);
        this.buscaDadosAlunosFaltosos.addAlunosFaltosos(this.alunosFaltososCadastrados);
      }else{
        this.alunosFaltososCadastrados = this.buscaDadosAlunosFaltosos.getAlunosFaltosos();
        var alunoAtual = {nome: this.formularioFaltaAluno.value.nome,
          sobrenome:  this.formularioFaltaAluno.value.sobrenome,
          matricula: this.formularioFaltaAluno.value.matricula,
          nomeDisciplina: this.disciplina,
          dataFalta: this.formularioFaltaAluno.value.dataFalta
        }
        this.alunosFaltososCadastrados.push(alunoAtual);
        this.buscaDadosAlunosFaltosos.addAlunosFaltosos(this.alunosFaltososCadastrados);
      }

      window.alert("Falta cadastrada com sucesso!");

      this.resetarFormularioFalta();
    }else{
      window.alert("Formulário Inválido");
      Object.keys(this.formularioFaltaAluno.controls).forEach(campo => {
        const controle = this.formularioFaltaAluno.get(campo);
        controle?.markAllAsTouched();
      })
    }
  }

  resetarFormularioFalta(){
    this.formularioFaltaAluno.reset();
  }

  verificarValidadeFormularioFalta(){
    if(this.formularioFaltaAluno.valid){
      return true;
    }
    return false;
  }

  verificarValidTouchedInputFalta(campo: any){
    return !this.formularioFaltaAluno.get(campo)?.valid && this.formularioFaltaAluno.get(campo)?.touched
  }

  inicializaVariaveisSala(){
   var sala = {nome: '',
   semestre: '',
   cargaHoraria: '',
   periodo: '',
   id: 0,
   nomeProfessor: '',
   sobrenomeProfessor: '',
   listaAlunos:  []};
   return sala
  }

   buscaListaAlunosCadastrados(){
     var dadosRetornados = this.buscaAlunos.obterDados();
     if(dadosRetornados.length==0){
       this.listaAlunosCadastrados = [];
     }else{
       this.listaAlunosCadastrados =  dadosRetornados;
     }
     this.separaAlunosPorSemestre();
   }

  separaAlunosPorSemestre(){
    this.alunosPrimeiroSemestre = this.listaAlunosCadastrados.filter(aluno => {
      return (aluno.semestre === '1')
    })
    this.alunosSegundoSemestre = this.listaAlunosCadastrados.filter(aluno => {
      return (aluno.semestre === '2')
    })
    this.alunosTerceiroSemestre = this.listaAlunosCadastrados.filter(aluno => {
      return (aluno.semestre === '3')
    })
    this.alunosQuartoSemestre = this.listaAlunosCadastrados.filter(aluno => {
      return (aluno.semestre === '4')
    })
    this.alunosQuintoSemestre = this.listaAlunosCadastrados.filter(aluno => {
      return (aluno.semestre === '5')
    })
  }

  adicionaAlunosNasTurmasDoSemestre(){
    var todasTurmas = this.buscaTurmas.buscaTurmas();
    for(let i=0; i<todasTurmas.length; i++){
      if(todasTurmas[i].nome === 'Engenharia de Requisitos'){
        this.salaEngenhariadeRequisitos.nome = todasTurmas[i].nome;
        this.salaEngenhariadeRequisitos.cargaHoraria = todasTurmas[i].cargaHoraria;
        this.salaEngenhariadeRequisitos.periodo = todasTurmas[i].periodo;
        this.salaEngenhariadeRequisitos.id = todasTurmas[i].id;
        this.salaEngenhariadeRequisitos.semestre = todasTurmas[i].semestre;
        this.salaEngenhariadeRequisitos.nomeProfessor = todasTurmas[i].nomeProfessor;
        this.salaEngenhariadeRequisitos.sobrenomeProfessor = todasTurmas[i].sobrenomeProfessor;
        this.salaEngenhariadeRequisitos.listaAlunos = this.alunosQuartoSemestre;
        this.salvarSalas(this.salaEngenhariadeRequisitos);
      }else if(todasTurmas[i].nome === 'Logica de Programação'){
        this.salaLogicadeProgramacao.nome = todasTurmas[i].nome;
        this.salaLogicadeProgramacao.cargaHoraria = todasTurmas[i].cargaHoraria;
        this.salaLogicadeProgramacao.periodo = todasTurmas[i].periodo;
        this.salaLogicadeProgramacao.id = todasTurmas[i].id;
        this.salaLogicadeProgramacao.semestre = todasTurmas[i].semestre;
        this.salaLogicadeProgramacao.nomeProfessor = todasTurmas[i].nomeProfessor;
        this.salaLogicadeProgramacao.sobrenomeProfessor = todasTurmas[i].sobrenomeProfessor;
        this.salaLogicadeProgramacao.listaAlunos = this.alunosPrimeiroSemestre;
        this.salvarSalas(this.salaLogicadeProgramacao);
      }else if(todasTurmas[i].nome === 'Logica Matemática'){
        this.salaLogicaMatematica.nome = todasTurmas[i].nome;
        this.salaLogicaMatematica.cargaHoraria = todasTurmas[i].cargaHoraria;
        this.salaLogicaMatematica.periodo = todasTurmas[i].periodo;
        this.salaLogicaMatematica.id = todasTurmas[i].id;
        this.salaLogicaMatematica.semestre = todasTurmas[i].semestre;
        this.salaLogicaMatematica.nomeProfessor = todasTurmas[i].nomeProfessor;
        this.salaLogicaMatematica.sobrenomeProfessor = todasTurmas[i].sobrenomeProfessor;
        this.salaLogicaMatematica.listaAlunos = this.alunosPrimeiroSemestre;
        this.salvarSalas(this.salaLogicaMatematica);
      }else if(todasTurmas[i].nome === 'Banco de Dados'){
        this.salaBancodeDados.nome = todasTurmas[i].nome;
        this.salaBancodeDados.cargaHoraria = todasTurmas[i].cargaHoraria;
        this.salaBancodeDados.periodo = todasTurmas[i].periodo;
        this.salaBancodeDados.id = todasTurmas[i].id;
        this.salaBancodeDados.semestre = todasTurmas[i].semestre;
        this.salaBancodeDados.nomeProfessor = todasTurmas[i].nomeProfessor;
        this.salaBancodeDados.sobrenomeProfessor = todasTurmas[i].sobrenomeProfessor;
        this.salaBancodeDados.listaAlunos = this.alunosSegundoSemestre;
        this.salvarSalas(this.salaBancodeDados);
      }else if(todasTurmas[i].nome === 'Banco de Dados Avançado'){
        this.salaBancodeDadosAvancado.nome = todasTurmas[i].nome;
        this.salaBancodeDadosAvancado.cargaHoraria = todasTurmas[i].cargaHoraria;
        this.salaBancodeDadosAvancado.periodo = todasTurmas[i].periodo;
        this.salaBancodeDadosAvancado.id = todasTurmas[i].id;
        this.salaBancodeDadosAvancado.semestre = todasTurmas[i].semestre;
        this.salaBancodeDadosAvancado.nomeProfessor = todasTurmas[i].nomeProfessor;
        this.salaBancodeDadosAvancado.sobrenomeProfessor = todasTurmas[i].sobrenomeProfessor;
        this.salaBancodeDadosAvancado.listaAlunos = this.alunosQuintoSemestre;
        this.salvarSalas(this.salaBancodeDadosAvancado);
      }else if(todasTurmas[i].nome === 'Programação Orientada a Objetos'){
        this.salaProgramacaoOrientadaaObjetos.nome = todasTurmas[i].nome;
        this.salaProgramacaoOrientadaaObjetos.cargaHoraria = todasTurmas[i].cargaHoraria;
        this.salaProgramacaoOrientadaaObjetos.periodo = todasTurmas[i].periodo;
        this.salaProgramacaoOrientadaaObjetos.id = todasTurmas[i].id;
        this.salaProgramacaoOrientadaaObjetos.semestre = todasTurmas[i].semestre;
        this.salaProgramacaoOrientadaaObjetos.nomeProfessor = todasTurmas[i].nomeProfessor;
        this.salaProgramacaoOrientadaaObjetos.sobrenomeProfessor = todasTurmas[i].sobrenomeProfessor;
        this.salaProgramacaoOrientadaaObjetos.listaAlunos = this.alunosTerceiroSemestre;
        this.salvarSalas(this.salaProgramacaoOrientadaaObjetos);
      }else if(todasTurmas[i].nome === 'Programação Estruturada'){
        this.salaProgramacaoEstruturada.nome = todasTurmas[i].nome;
        this.salaProgramacaoEstruturada.cargaHoraria = todasTurmas[i].cargaHoraria;
        this.salaProgramacaoEstruturada.periodo = todasTurmas[i].periodo;
        this.salaProgramacaoEstruturada.id = todasTurmas[i].id;
        this.salaProgramacaoEstruturada.semestre = todasTurmas[i].semestre;
        this.salaProgramacaoEstruturada.nomeProfessor = todasTurmas[i].nomeProfessor;
        this.salaProgramacaoEstruturada.sobrenomeProfessor = todasTurmas[i].sobrenomeProfessor;
        this.salaProgramacaoEstruturada.listaAlunos = this.alunosSegundoSemestre;
        this.salvarSalas(this.salaProgramacaoEstruturada);
      }else if(todasTurmas[i].nome === 'Programação para Web'){
        this.salaProgramacaoparaWeb.nome = todasTurmas[i].nome;
        this.salaProgramacaoparaWeb.cargaHoraria = todasTurmas[i].cargaHoraria;
        this.salaProgramacaoparaWeb.periodo = todasTurmas[i].periodo;
        this.salaProgramacaoparaWeb.id = todasTurmas[i].id;
        this.salaProgramacaoparaWeb.semestre = todasTurmas[i].semestre;
        this.salaProgramacaoparaWeb.nomeProfessor = todasTurmas[i].nomeProfessor;
        this.salaProgramacaoparaWeb.sobrenomeProfessor = todasTurmas[i].sobrenomeProfessor;
        this.salaProgramacaoparaWeb.listaAlunos = this.alunosQuartoSemestre;
        this.salvarSalas(this.salaProgramacaoparaWeb);
      }else if(todasTurmas[i].nome === 'Interação Infertace Humano e Computador'){
        this.salaInteracaoInterfaceHumanoeComputador.nome = todasTurmas[i].nome;
        this.salaInteracaoInterfaceHumanoeComputador.cargaHoraria = todasTurmas[i].cargaHoraria;
        this.salaInteracaoInterfaceHumanoeComputador.periodo = todasTurmas[i].periodo;
        this.salaInteracaoInterfaceHumanoeComputador.id = todasTurmas[i].id;
        this.salaInteracaoInterfaceHumanoeComputador.semestre = todasTurmas[i].semestre;
        this.salaInteracaoInterfaceHumanoeComputador.nomeProfessor = todasTurmas[i].nomeProfessor;
        this.salaInteracaoInterfaceHumanoeComputador.sobrenomeProfessor = todasTurmas[i].sobrenomeProfessor;
        this.salaInteracaoInterfaceHumanoeComputador.listaAlunos = this.alunosQuartoSemestre;
        this.salvarSalas(this.salaInteracaoInterfaceHumanoeComputador);
      }else if(todasTurmas[i].nome === 'Arquitetura de Computadores'){
        this.salaArquiteturadeComputadores.nome = todasTurmas[i].nome;
        this.salaArquiteturadeComputadores.cargaHoraria = todasTurmas[i].cargaHoraria;
        this.salaArquiteturadeComputadores.periodo = todasTurmas[i].periodo;
        this.salaArquiteturadeComputadores.id = todasTurmas[i].id;
        this.salaArquiteturadeComputadores.semestre = todasTurmas[i].semestre;
        this.salaArquiteturadeComputadores.nomeProfessor = todasTurmas[i].nomeProfessor;
        this.salaArquiteturadeComputadores.sobrenomeProfessor = todasTurmas[i].sobrenomeProfessor;
        this.salaArquiteturadeComputadores.listaAlunos = this.alunosTerceiroSemestre;
        this.salvarSalas(this.salaArquiteturadeComputadores);
      }else if(todasTurmas[i].nome === 'Programação APP'){
        this.salaProgramacaoAPP.nome = todasTurmas[i].nome;
        this.salaProgramacaoAPP.cargaHoraria = todasTurmas[i].cargaHoraria;
        this.salaProgramacaoAPP.periodo = todasTurmas[i].periodo;
        this.salaProgramacaoAPP.id = todasTurmas[i].id;
        this.salaProgramacaoAPP.semestre = todasTurmas[i].semestre;
        this.salaProgramacaoAPP.nomeProfessor = todasTurmas[i].nomeProfessor;
        this.salaProgramacaoAPP.sobrenomeProfessor = todasTurmas[i].sobrenomeProfessor;
        this.salaProgramacaoAPP.listaAlunos = this.alunosQuintoSemestre;
        this.salvarSalas(this.salaProgramacaoAPP);
      }else if(todasTurmas[i].nome === 'Teste de Software'){
        this.salaTestedeSoftware.nome = todasTurmas[i].nome;
        this.salaTestedeSoftware.cargaHoraria = todasTurmas[i].cargaHoraria;
        this.salaTestedeSoftware.periodo = todasTurmas[i].periodo;
        this.salaTestedeSoftware.id = todasTurmas[i].id;
        this.salaTestedeSoftware.semestre = todasTurmas[i].semestre;
        this.salaTestedeSoftware.nomeProfessor = todasTurmas[i].nomeProfessor;
        this.salaTestedeSoftware.sobrenomeProfessor = todasTurmas[i].sobrenomeProfessor;
        this.salaTestedeSoftware.listaAlunos = this.alunosQuintoSemestre;
        this.salvarSalas(this.salaTestedeSoftware);
      }
    }
  }

  salvarSalas(sala: Salas){
    this.dadosSalas.addSalas(sala)
  }

  verificaSeEOProfessor(){
    var todasTurmas = this.buscaTurmas.buscaTurmas();
    var disciplinaEProfessorValido = false;
    for(let i=0; i<todasTurmas.length; i++){
      if(todasTurmas[i].nome === this.formularioInformaDisciplina.value.nome && todasTurmas[i].nomeProfessor === this.formularioInformaDisciplina.value.nomeProfessor){
        disciplinaEProfessorValido = true;
      }
    }
    if(disciplinaEProfessorValido==false){
      window.alert("Você não é o professor dessa disciplina");
    }
    return disciplinaEProfessorValido;
  }

  chamaSala(){
    var disciplina = this.formularioInformaDisciplina.value.nome;
    this.alunosDaDisciplina = this.dadosSalas.getSala(disciplina);
  }
}
