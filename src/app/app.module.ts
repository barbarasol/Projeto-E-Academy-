import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { UserAlunoModule } from './user-aluno/user-aluno.module';
import { DadosAlunosFaltososService } from './user-professor/dados-alunos-faltosos.service';
import { GuardaUsuariosCadastradosParaLoginService } from './login/cadastro-login/guarda-usuarios-cadastrados-para-login.service';
import { UserAdminModule } from './user-admin/user-admin.module';
import { BuscarDisciplinasService } from './user-admin/disciplina/buscar-disciplinas.service';
import { ProfessorModule } from './professor/professor.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlunoModule } from './aluno/aluno.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { BuscarListaProfessoresService } from './professor/buscar-lista-professores.service';
import { CadastroLoginComponent } from './login/cadastro-login/cadastro-login.component';
import { UserProfessorModule } from './user-professor/user-professor.module';
import { DadosTurmasService } from './user-professor/dados-turmas.service';
import { DadosSalasService } from './user-professor/dados-salas.service';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroLoginComponent,
    PaginaNaoEncontradaComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AlunoModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ProfessorModule,
    UserAdminModule,
    UserProfessorModule,
    UserAlunoModule
  ],
  providers: [
    BuscarDisciplinasService,
    BuscarListaProfessoresService,
    GuardaUsuariosCadastradosParaLoginService,
    DadosTurmasService,
    DadosSalasService,
    DadosAlunosFaltososService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
