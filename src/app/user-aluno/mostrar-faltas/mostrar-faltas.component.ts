import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { DadosAlunosFaltososService } from './../../user-professor/dados-alunos-faltosos.service';
import { AlunosFaltosos } from './../../shared/alunosFaltosos';

@Component({
  selector: 'app-mostrar-faltas',
  templateUrl: './mostrar-faltas.component.html',
  styleUrls: ['./mostrar-faltas.component.css']
})
export class MostrarFaltasComponent implements OnInit {

  formularioInformaMatricula!: FormGroup;
  faltasDoAluno: AlunosFaltosos[] = [];
  mostrarFaltas = 0;

  constructor(
    private formBuilder: FormBuilder,
    private obtemAlunosFaltosos: DadosAlunosFaltososService
  ) { }

  ngOnInit(): void {
    this.formularioInformaMatricula = this.formBuilder.group({
      matricula: [null, Validators.required]
    })
  }

  onSubmit(){
    const formularioValido = this.verificarValidadeFormulario();
    if(formularioValido){
      this.filtarFaltasDoAluno();
      if(this.faltasDoAluno.length == 0){
        window.alert("Não foi encontrada faltas lançadas nessa matricula")
      }
      this.resetarFormulario();
    }else{
      window.alert("Formulário Inválido");
      Object.keys(this.formularioInformaMatricula.controls).forEach(campo => {
        const controle = this.formularioInformaMatricula.get(campo);
        controle?.markAllAsTouched();
      })
    }
  }

  resetarFormulario(){
    this.formularioInformaMatricula.reset();
  }

  verificarValidadeFormulario(){
    if(this.formularioInformaMatricula.valid){
      return true;
    }
    return false;
  }

  verificarValidTouchedInput(campo: any){
    return !this.formularioInformaMatricula.get(campo)?.valid && this.formularioInformaMatricula.get(campo)?.touched
  }

  filtarFaltasDoAluno(){
    var todosAlunosFaltosos = this.obtemAlunosFaltosos.getAlunosFaltosos();
    this.faltasDoAluno = todosAlunosFaltosos.filter((aluno: any) => {
      if(aluno.matricula === this.formularioInformaMatricula.value.matricula){
        this.mostrarFaltas++;
        return aluno
      }
    })
    this.verificaSeAlunoTemFaltas();
  }

  verificaSeAlunoTemFaltas(){
    if(this.faltasDoAluno.length == 0 && this.mostrarFaltas>0){
      return true
    }
    return false;
  }

}
