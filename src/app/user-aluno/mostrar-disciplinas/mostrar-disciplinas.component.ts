import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { Disciplina } from 'src/app/shared/disciplina';

import { BuscarDisciplinasService } from './../../user-admin/disciplina/buscar-disciplinas.service';

@Component({
  selector: 'app-mostrar-disciplinas',
  templateUrl: './mostrar-disciplinas.component.html',
  styleUrls: ['./mostrar-disciplinas.component.css']
})
export class MostrarDisciplinasComponent implements OnInit {

  formularioInformaSemestre!: FormGroup;
  disciplinasDoSemestre: Disciplina[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private obterDisciplinas: BuscarDisciplinasService
  ) { }

  ngOnInit(): void {
    this.formularioInformaSemestre = this.formBuilder.group({
      semestre: [null, Validators.required]
    })
  }

  onSubmit(){
    const formularioValido = this.verificarValidaFormulario();
    if(formularioValido){
      this.filtraDisciplinasPorSemestre();
      this.resetarFormulario();
    }else{
      window.alert("Formulário Inválido");
      Object.keys(this.formularioInformaSemestre.controls).forEach(campo => {
        const controle = this.formularioInformaSemestre.get(campo);
        controle?.markAllAsTouched();
      })
    }
  }

  resetarFormulario(){
    this.formularioInformaSemestre.reset();
  }

  verificarValidaFormulario(){
    if(this.formularioInformaSemestre.valid){
      return true
    }
    return false;
  }

  verificaValidTouchedInput(campo: any){
    return !this.formularioInformaSemestre.get(campo)?.valid && this.formularioInformaSemestre.get(campo)?.touched
  }

  filtraDisciplinasPorSemestre(){
    var todasDisciplinas = this.obterDisciplinas.getDisciplinas();
    this.disciplinasDoSemestre = todasDisciplinas.filter((disciplina: any) => {
      if(disciplina.semestre === this.formularioInformaSemestre.value.semestre){
        return disciplina
      }
    })
  }
}
