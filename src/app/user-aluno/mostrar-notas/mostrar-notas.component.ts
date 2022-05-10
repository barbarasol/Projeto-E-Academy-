import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AlunosNotas } from 'src/app/shared/alunosNotas';

import { DadosALunosNotasService } from './../../user-professor/dados-alunos-notas.service';

@Component({
  selector: 'app-mostrar-notas',
  templateUrl: './mostrar-notas.component.html',
  styleUrls: ['./mostrar-notas.component.css']
})
export class MostrarNotasComponent implements OnInit {

  formularioMatricula!: FormGroup
  notasAluno: AlunosNotas[] = []
  notasAlunoNaDisciplina: AlunosNotas[] = []

  constructor(
    private formBuilder: FormBuilder,
    private dadosNotas: DadosALunosNotasService
  ) { }

  ngOnInit(): void {
    this.formularioMatricula = this.formBuilder.group({
      matricula: [null, Validators.required],
      disciplina: [null, Validators.required]
    })
  }

  onSubmit(){
    const formularioValido = this.verificarValidadeFormulario();
    if(formularioValido){
      this.verificaSeMatriculaTemNotaLancada();
      this.resetarFormulario();
    }else{
      window.alert("Formulário Inválido");
      Object.keys(this.formularioMatricula.controls).forEach(campo => {
        const controle = this.formularioMatricula.get(campo);
        controle?.markAllAsTouched();
      })
    }
  }

  resetarFormulario(){
    this.formularioMatricula.reset();
  }

  verificarValidadeFormulario(){
    if(this.formularioMatricula.valid){
      return true
    }
    return false;
  }

  verificaValidTouchedInput(campo: any){
    return !this.formularioMatricula.get(campo)?.valid && this.formularioMatricula.get(campo)?.touched
  }

  verificaSeMatriculaTemNotaLancada(){
    var todasNotas = this.dadosNotas.getNotasAlunos();
    var matriculaEncontrada = 0
    for(let i=0; i<todasNotas.length; i++){
      if(todasNotas[i].matricula == this.formularioMatricula.value.matricula){
        matriculaEncontrada++;
        this.notasAluno.push(todasNotas[i]);
      }
    }
    if(matriculaEncontrada==0){
      window.alert("Nenhuma nota lançada nessa matrícula");
    }
    this.verificaSeMatriculaTemNotaLancadaNaDisciplina();
  }

  verificaSeMatriculaTemNotaLancadaNaDisciplina(){
    var disciplinaEncontrada = 0
    for(let i=0; i<this.notasAluno.length; i++){
      if(this.notasAluno[i].disciplina == this.formularioMatricula.value.disciplina){
        disciplinaEncontrada++;
        this.notasAlunoNaDisciplina.push(this.notasAluno[i])
      }
    }
    if(disciplinaEncontrada==0){
      window.alert("Nenhuma nota lançada nessa disciplina");
    }
  }
}
