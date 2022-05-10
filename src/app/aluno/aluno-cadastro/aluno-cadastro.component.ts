import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Aluno } from './../../shared/aluno';
import { AcompanharListaService } from '../acompanhar-lista.service';

@Component({
  selector: 'app-aluno-cadastro',
  templateUrl: './aluno-cadastro.component.html',
  styleUrls: ['./aluno-cadastro.component.css']
})
export class AlunoCadastroComponent implements OnInit {

  formulario!: FormGroup;
  alunos!: Aluno[];

  constructor(
    private formBuilder: FormBuilder,
    private acompanhaLista: AcompanharListaService
  ) {

  }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      sobrenome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      semestre: [null, Validators.required],
      matricula: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]]
    });

  }

  onSubmit(){
    const formularioValido = this.verificaValidadeFormulario();

    if(formularioValido){
      this.buscarDados();

      const aluno: Aluno = this.formulario.value;
      this.alunos.push(aluno);

      this.acompanhaLista.salvar(this.alunos)

      window.alert("Aluno Cadastrado com Sucesso!");

      this.resetar();
    }else{
      window.alert("Formulário Inválido");
      Object.keys(this.formulario.controls).forEach(campo => { //pego todos as chaves
        const controle = this.formulario.get(campo);
        controle?.markAllAsTouched(); //marco que o campo esta inválido
      })
    }
  }

  resetar(){
    this.formulario.reset();
  }

  buscarDados(){
    var dados :[];
    dados = this.acompanhaLista.obterDados();
    if(dados.length == 0){
      this.alunos = []
    }else{
      this.alunos = dados
    }
  }

  verificarValidTouchedInput(campo: any){
    return !this.formulario.get(campo)?.valid && this.formulario.get(campo)?.touched
  }

  verificaEmailInvalido(){
    let campoEmail = this.formulario.get('email');
    if(campoEmail?.errors){
      return campoEmail.errors['email'] && campoEmail.touched;
    }
  }

  verificaValidadeFormulario(){
    if(this.formulario.valid){
      return true;
    }
    return false;
  }

}
