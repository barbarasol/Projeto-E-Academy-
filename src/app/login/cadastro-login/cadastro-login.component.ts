import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { CadastroLogin } from 'src/app/shared/CadastroLogin';

import { GuardaUsuariosCadastradosParaLoginService } from './guarda-usuarios-cadastrados-para-login.service';

@Component({
  selector: 'app-cadastro-login',
  templateUrl: './cadastro-login.component.html',
  styleUrls: ['./cadastro-login.component.css']
})
export class CadastroLoginComponent implements OnInit {

  formularioCadastroLogin!: FormGroup;
  tiposUsuarios = [
  {
    id: 1,
    tipoUsuario: "professor"
  },
  {
    id: 2,
    tipoUsuario: "aluno"
  }
  ]

  loginProfessores!: CadastroLogin[];
  loginAlunos!: CadastroLogin[];

  constructor(
    private formBuilder: FormBuilder,
    private usuariosCadastradosLogin: GuardaUsuariosCadastradosParaLoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formularioCadastroLogin = this.formBuilder.group({
      nome: [null, Validators.required],
      sobrenome: [null, Validators.required],
      registro: [null, Validators.required],
      usuario: [null, Validators.required],
      senha: [null, Validators.required],
      tipoUsuario: [null, Validators.required]
    })
  }

  onSubmit(){
    const formularioValido = this.validarFormulario();
    if(formularioValido){
      if(this.formularioCadastroLogin.value.tipoUsuario == 'professor'){
        this.cadastrarLoginDeProfessor();
      }else if(this.formularioCadastroLogin.value.tipoUsuario == 'aluno'){
        this.cadastrarLoginDeAluno();
      }
      window.alert("Usuário Cadastrado com Sucesso!!");

      this.resetarFormulario();
      this.redirecionarParaLogin();
    }else{
      window.alert("Formulário Inválido");
      Object.keys(this.formularioCadastroLogin.controls).forEach(campo => {
        const controle = this.formularioCadastroLogin.get(campo);
        controle?.markAllAsTouched();
      })
    }
  }

  validarFormulario(){
    if(this.formularioCadastroLogin.valid){
      return true;
    }
    return false;
  }

  resetarFormulario(){
    this.formularioCadastroLogin.reset();
  }

  verificarValidTouchedInput(campo: any){
    return !this.formularioCadastroLogin.get(campo)?.valid && this.formularioCadastroLogin.get(campo)?.touched;
  }

  cadastrarLoginDeProfessor(){
    this.buscaLoginProfessores();

    const loginProfessor: CadastroLogin = this.formularioCadastroLogin.value;
    this.loginProfessores.push(loginProfessor);
    this.usuariosCadastradosLogin.salvarLoginUsuarioTipoProfessor(this.loginProfessores, loginProfessor);
    window.alert("Login de Professor Cadastrado com sucesso.");
  }

  buscaLoginProfessores(){
    var dados: [] = this.usuariosCadastradosLogin.obterLoginUsuarioTipoProfessor();
    if(dados == null){
      this.loginProfessores = [];
    }else{
      this.loginProfessores = dados;
    }
  }

  cadastrarLoginDeAluno(){
    this.buscaLoginAlunos();

    const loginAluno: CadastroLogin = this.formularioCadastroLogin.value;
    this.loginAlunos.push(loginAluno);
    this.usuariosCadastradosLogin.salvarLoginUsuarioTipoAluno(this.loginAlunos, loginAluno);
    window.alert("Login de Aluno Cadastrado com sucesso.");
  }

  buscaLoginAlunos(){
    var dados: [] = this.usuariosCadastradosLogin.obterLoginUsuarioTipoAluno();
    if(dados == null){
      this.loginAlunos = [];
    }else{
      this.loginAlunos = dados;
    }
  }

  redirecionarParaLogin(){
    this.router.navigate(['/login']);
  }
}
