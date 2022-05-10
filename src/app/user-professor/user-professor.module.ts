import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LancarFaltasComponent } from './lancar-faltas/lancar-faltas.component';
import { UserProfessorComponent } from './user-professor.component';
import { UserProfessorRoutingModule } from './user-professor.routing.module';
import { TurmasComponent } from './turmas/turmas.component';
import { SelecionarDisciplinasComponent } from './selecionar-disciplinas/selecionar-disciplinas.component';
import { LancarNotasComponent } from './lancar-notas/lancar-notas.component';


@NgModule({
  declarations: [
    UserProfessorComponent,
    SelecionarDisciplinasComponent,
    TurmasComponent,
    LancarFaltasComponent,
    LancarNotasComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserProfessorRoutingModule
  ]
})
export class UserProfessorModule { }
