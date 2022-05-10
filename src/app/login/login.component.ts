import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { GuardaUsuariosCadastradosParaLoginService } from './cadastro-login/guarda-usuarios-cadastrados-para-login.service';
import { BuscaUsuariosService } from './busca-usuarios.service';
import { CadastroLogin } from '../shared/CadastroLogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formularioLogin!: FormGroup;
  tiposUsuarios = [{
    id: 1,
    tipoUsuario: "administrador"
  },
  {
    id: 2,
    tipoUsuario: "professor"
  },
  {
    id: 3,
    tipoUsuario: "aluno"
  }
  ]
  professoresComLoginCadastrado: CadastroLogin[] = [];
  alunosComLoginCadastrado: CadastroLogin[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private buscaUsuarios: BuscaUsuariosService,
    private router: Router,
    private buscaCadastroLoginProfessores : GuardaUsuariosCadastradosParaLoginService,
    private buscaCadastroLoginAlunos: GuardaUsuariosCadastradosParaLoginService
  ) { }

  ngOnInit(): void {
    this.formularioLogin = this.formBuilder.group({
      usuario: [null, Validators.required],
      tipoUsuario: [null, Validators.required],
      senha: [null, Validators.required]
    })
  }

  onSubmit(){
    const formularioValido = this.validaFormulario();
    if(formularioValido){
      if(this.formularioLogin.value.tipoUsuario == 'administrador'){
        const usuarioValido = this.buscaUsuarios.validaAdministrador(this.formularioLogin.value)
        if(usuarioValido == true){
          this.mudarRotaAdmin();
        }else{
          window.alert("Administrador não cadastrado!")
        }
      }else if(this.formularioLogin.value.tipoUsuario == 'professor'){
        const usuarioProfessorValido = this.verificaProfessorLoginCadastrado();
        if(usuarioProfessorValido){
          this.mudarRotaProfessor();
        }else{
          window.alert("Usuário não cadastrado!");
        }

      }else{
        const usuarioAlunoValido = this.verificaAlunosLoginCadastrado();
        if(usuarioAlunoValido){
          this.mudarRotaAluno();
        }else{
          window.alert("Usuário não cadastrado!");
        }
      }

      this.resetarFormulario();
    }else{
      window.alert("Formulário Inválido");
      Object.keys(this.formularioLogin.controls).forEach(campo => {
        const controle = this.formularioLogin.get(campo);
        controle?.markAllAsTouched();
      })
    }
  }

  validaFormulario(){
    if(this.formularioLogin.valid){
      return true;
    }
    return false;
  }

  verificarValidTouchedInput(campo: any){
    return !this.formularioLogin.get(campo)?.valid && this.formularioLogin.get(campo)?.touched;
  }

  verificaProfessorLoginCadastrado(){
    this.professoresComLoginCadastrado = this.buscaCadastroLoginProfessores.obterLoginUsuarioTipoProfessor();
    var cadastroProfessorEncontrado = false;
    for(let i=0; i<this.professoresComLoginCadastrado.length; i++){
      if(this.professoresComLoginCadastrado[i].usuario === this.formularioLogin.value.usuario && this.professoresComLoginCadastrado[i].senha === this.formularioLogin.value.senha){
        cadastroProfessorEncontrado = true;
      }
    }
    return cadastroProfessorEncontrado;
  }

  verificaAlunosLoginCadastrado(){
    this.alunosComLoginCadastrado = this.buscaCadastroLoginAlunos.obterLoginUsuarioTipoAluno();
    var cadastroAlunoEncontrado = false;
    for(let i=0; i<this.alunosComLoginCadastrado.length; i++){
      if(this.alunosComLoginCadastrado[i].usuario === this.formularioLogin.value.usuario && this.alunosComLoginCadastrado[i].senha === this.formularioLogin.value.senha){
        cadastroAlunoEncontrado = true;
      }
    }
    return cadastroAlunoEncontrado;
  }

  mudarRotaAdmin(){
    this.router.navigate(['/userAdmin'])
  }

  mudarRotaProfessor(){
    this.router.navigate(['/userProfessor'])
  }

  mudarRotaAluno(){
    this.router.navigate(['/userAluno'])
  }

  resetarFormulario(){
    this.formularioLogin.reset();
  }

}
