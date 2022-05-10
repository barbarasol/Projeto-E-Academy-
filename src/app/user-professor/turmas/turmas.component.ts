import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { Turmas } from 'src/app/shared/turmas';

import { BuscarListaProfessoresService } from './../../professor/buscar-lista-professores.service';
import { DadosTurmasService } from './../dados-turmas.service';

@Component({
  selector: 'app-turmas',
  templateUrl: './turmas.component.html',
  styleUrls: ['./turmas.component.css']
})
export class TurmasComponent implements OnInit {
  formularioRegistro!: FormGroup;
  turmasProfessor: Turmas[] = []

  constructor(
    private formBuilder: FormBuilder,
    private dadosTurmas: DadosTurmasService,
    private dadosProfessor: BuscarListaProfessoresService
  ) { }

  ngOnInit(): void {
    this.formularioRegistro = this.formBuilder.group({
      registro: [null, Validators.required]
    })
  }

  onSubmit(){
    const formularioRegistroValido = this.verificaValidadeFormulario();
    if(formularioRegistroValido){
    var registro = this.formularioRegistro.value.registro;
    //aq eu vou chamar um metodo que vai pegar as turmas e fazer um filter com o registro do professor
    this.filtraTurmasPorRegistro(registro);
    this.resetarFormulario();
    }else{
      window.alert("Formulário Inválido");
      Object.keys(this.formularioRegistro.controls).forEach(campo => {
        const controle = this.formularioRegistro.get(campo);
        controle?.markAllAsTouched();
      })
    }
  }

  verificaValidadeFormulario(){
    if(this.formularioRegistro.valid){
      return true;
    }
    return false;
  }

  resetarFormulario(){
    this.formularioRegistro.reset();
  }

  verificarValidTouchedInput(campo: any){
    return !this.formularioRegistro.get(campo)?.valid && this.formularioRegistro.get(campo)?.touched
  }

  filtraTurmasPorRegistro(registro: any){
    var todasTurmas = this.dadosTurmas.buscaTurmas();
    var dadosProfessores = this.dadosProfessor.obterListaProfessores();
    var professorEncontrado: any;
    for(let i=0; i<dadosProfessores.length; i++){
      if(dadosProfessores[i].registro === registro){
        professorEncontrado = dadosProfessores[i];
      }
    }
    this.turmasProfessor = todasTurmas.filter((turma : any) => {
      if(turma.nomeProfessor === professorEncontrado.nome){
        return turma
      }
    })
  }

  verificaSeTurmasDoProfessorEstaVazia(){
    if(this.turmasProfessor.length==0){
      return true
    }else{
      return false;
    }
  }
}
