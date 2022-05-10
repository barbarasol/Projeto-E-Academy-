import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Professor } from './../../shared/professor';
import { BuscarListaProfessoresService } from './../../professor/buscar-lista-professores.service';
import { Turmas } from './../../shared/turmas';
import { BuscarDisciplinasService } from './../../user-admin/disciplina/buscar-disciplinas.service';
import { Disciplina } from './../../shared/disciplina';
import { Component, DoCheck, OnInit } from '@angular/core';
import { DadosTurmasService } from '../dados-turmas.service';

@Component({
  selector: 'app-selecionar-disciplinas',
  templateUrl: './selecionar-disciplinas.component.html',
  styleUrls: ['./selecionar-disciplinas.component.css']
})
export class SelecionarDisciplinasComponent implements OnInit {
  disciplinasDisponiveis?: Disciplina[] = [];
  formularioInscricaoDisciplina!: FormGroup;
  turmas!: Turmas[];
  disciplinasEscolhidas!: Disciplina[];

  constructor(
    private formBuilder: FormBuilder,
    private buscaDisciplinas: BuscarDisciplinasService,
    private buscaDadosProfessores: BuscarListaProfessoresService,
    private dadosTurmas: DadosTurmasService,
    private buscaDadosTurmas: DadosTurmasService
  ) { }

  ngOnInit(): void {
    this.disciplinasDisponiveis = this.buscaDisciplinas.mostrarDisciplinasTemplate();

    this.formularioInscricaoDisciplina = this.formBuilder.group({
      nome: [null, Validators.required],
      semestre: [null, Validators.required],
      registro: [null, Validators.required]
    })
  }


  onSubmit(){
    const formularioInscricaoDisciplinaValido = this.verificaValidadeFormulario();
    if(formularioInscricaoDisciplinaValido){

      this.cadastrarDisciplinasEscolhidas();

      this.buscaDadosProfessorQueSeInscreveuEDisciplina();

      this.disciplinasDisponiveis = this.buscaDisciplinas.mostrarDisciplinasTemplate();

      window.alert("Inscrição na disciplina realizada com sucesso")

      this.resetarFormulario();
    }else{
      window.alert("Formulário Inválido");
      Object.keys(this.formularioInscricaoDisciplina.controls).forEach(campo => {
        const controle = this.formularioInscricaoDisciplina.get(campo);
        controle?.markAllAsTouched();
      })
    }
  }

  resetarFormulario(){
    this.formularioInscricaoDisciplina.reset();
  }

  buscaDadosProfessorQueSeInscreveuEDisciplina(){
    //pegar os dados do professor e da disciplina para adicionar na turma.
    var professorInscrito;
    var professoresCadastrados: Professor[];
    var dadosDisciplinas: Disciplina[];
    var disciplina;
    professoresCadastrados = this.buscaDadosProfessores.obterListaProfessores();
    for(let i=0; i<professoresCadastrados.length; i++){
      if(this.formularioInscricaoDisciplina.value.registro === professoresCadastrados[i].registro){
        professorInscrito = professoresCadastrados[i];
      }
    }
    dadosDisciplinas = this.buscaDisciplinas.getDisciplinas();
    for(let j=0; j<dadosDisciplinas.length; j++){
      if(this.formularioInscricaoDisciplina.value.nome == dadosDisciplinas[j].nome){
        disciplina = dadosDisciplinas[j];
      }
    }
    this.adicionarTurmas(professorInscrito, disciplina)

  }

  adicionarTurmas(professor: any, disciplina: any){
    var turma: Turmas = {
      nomeProfessor : professor.nome,
      sobrenomeProfessor : professor.sobrenome,
      nome : disciplina.nome,
      semestre : disciplina.semestre,
      cargaHoraria : disciplina.cargaHoraria,
      periodo : disciplina.periodo,
      id : disciplina.id
    };

    this.cadastrarTurmas(turma) //chamando o service

  }

  buscarDadosTurmasCadastradas(){
    var dados: [] = this.buscaDadosTurmas.buscaTurmas();
    if(dados==null || dados.length==0){
      this.turmas = [];
    }else{
      this.turmas = dados;
    }
  }

  cadastrarTurmas(turma: any){
    this.buscarDadosTurmasCadastradas();
    this.turmas.push(turma);
    this.buscaDadosTurmas.addTurmas(this.turmas) //joga para o service
  }

   buscaDadosDisciplinasEscolhidas(){
     var dados: [] = this.buscaDisciplinas.buscaDisciplinasEscolhidas();
     if(dados == null || dados.length==0){
       this.disciplinasEscolhidas = [];
     }else{
       this.disciplinasEscolhidas = dados;
     }
   }

  cadastrarDisciplinasEscolhidas(){
    this.buscaDadosDisciplinasEscolhidas();

    const dadosFormularioDisiciplina = {
      nome: this.formularioInscricaoDisciplina.value.nome,
      semestre: this.formularioInscricaoDisciplina.value.semestre
    }

    var dadosDisciplinaFormularioCompleto = this.buscaDadosDisciplinasParaCadastrarAsEscolhidas(dadosFormularioDisiciplina);


    const disciplina: Disciplina = dadosDisciplinaFormularioCompleto;

    this.disciplinasEscolhidas.push(disciplina);

    this.buscaDisciplinas.addDisciplinasEscolhidas(this.disciplinasEscolhidas)

  }

  buscaDadosDisciplinasParaCadastrarAsEscolhidas(dadosFormularioDisiciplina: any){
    //vou pegar os dados das disciplinas atraves do nome e semestre que eu recebi no formulario, para conseguir salvar as disciplinas com dados completos
    var dadosCompleto: any = [];
    var disciplinas = this.buscaDisciplinas.getDisciplinas();
    for(let i=0; i<disciplinas.length; i++){
      if(disciplinas[i].nome == dadosFormularioDisiciplina.nome){
        dadosCompleto = disciplinas[i]
      }
    }
    return dadosCompleto
  }

  verificaValidadeFormulario(){
    if(this.formularioInscricaoDisciplina.valid){
      return true;
    }
    return false;
  }

  verificarValidTouchedInput(campo: any){
    return !this.formularioInscricaoDisciplina.get(campo)?.valid && this.formularioInscricaoDisciplina.get(campo)?.touched
  }
}
