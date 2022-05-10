import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { BuscarListaProfessoresService } from './../buscar-lista-professores.service';
import { Professor } from './../../shared/professor';

@Component({
  selector: 'app-professor-cadastro',
  templateUrl: './professor-cadastro.component.html',
  styleUrls: ['./professor-cadastro.component.css']
})
export class ProfessorCadastroComponent implements OnInit {

  formularioProfessor!: FormGroup
  professores!: Professor[];

  constructor(
    private formBuilder: FormBuilder,
    private buscaListaProfessores: BuscarListaProfessoresService
  ) { }

  ngOnInit(): void {
    this.formularioProfessor = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      sobrenome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      graduacao: [null, Validators.required],
      registro: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]]
    })
  }

  onSubmit(){
    const formularioProfessorValido = this.verificaValidadeFormulario();

    if(formularioProfessorValido){
      this.buscarDados();

      const professor: Professor = this.formularioProfessor.value;
      this.professores.push(professor);

      this.buscaListaProfessores.salvarProfessores(this.professores)

      window.alert("Professor Cadastrado com Sucesso!!");

      this.resetar();

    }else{
      window.alert("Formulário Inválido");
      Object.keys(this.formularioProfessor.controls).forEach(campo => {
        const controle = this.formularioProfessor.get(campo);
        controle?.markAllAsTouched();
      })
    }
  }

  resetar(){
    this.formularioProfessor.reset();
  }

  verificarValidTouchedInput(campo: any){
    return !this.formularioProfessor.get(campo)?.valid && this.formularioProfessor.get(campo)?.touched
  }

  verificaEmailInvalido(){
    let campoEmail = this.formularioProfessor.get('email');
    if(campoEmail?.errors){
      return campoEmail.errors['email'] && campoEmail.touched;
    }
  }

  verificaValidadeFormulario(){
    if(this.formularioProfessor.valid){
      return true;
    }
    return false;
  }

  buscarDados(){
    var dados :[];
    dados = this.buscaListaProfessores.obterListaProfessores();
    if(dados.length == 0){
      this.professores = []
    }else{
      this.professores = dados
    }
  }

}
